import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import registerActions from '../../../redux/actions/registerActions';
import notificationActions from '../../../redux/actions/notificationActions';
import { showConfirmAlert } from '../../../utils/helpers';



//load default layout
import Layout from '../../../components/Layouts/Default';

//load navbar default
import NavBack from '../../../components/Includes/Navbar/NavBack';

//load reactstrap components
import { Button, Form, FormGroup } from 'reactstrap';

import ReactCodeInput from 'react-verification-code-input';
import '../../../assets/scss/components/otp_steps.scss';

import Countdown, { zeroPad } from 'react-countdown-now';

class Step2 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			otp: '',
			username: '',
			alert_message: 'Carefully check your Email for verification code. You only have 3 attempts',
			interval: 60,
			countdown_key: 0,
			current_time: Date.now(),
			submit_message: '',
			is_submitting: false,
			req_otp_status: 0
		};

	}

	componentDidMount() {
		console.log(this.props.registration);
		this.setState({ username: this.props.registration.username }, () => {
			let username = this.state.username;
			if (this.props.registration.username_type === 'PHONE_NUMBER') {
				username = '62' + username;
			}
			this.props.getOtp(username)
				.then(response => {
					if (response.status === 200) {
						this.setState({ 
							alert_message: response.data.status.code !== 0 ? response.data.status.message_client : this.generateAlertMessage(response.data.status.message_client),
							req_otp_status: response.data.status.code 
						});
					}
				})
				.catch(error => console.log(error));
		});
	}

	onChangeOtp(otp) {
		this.setState({ otp: otp }, () => {
			if (this.state.otp.length >= 4) {
				this.submitOtp();
			}
		});
	}

	submitOtp() {
		this.setState({ is_submitting: true }, () => {
			let username = this.state.username;
			if (this.props.registration.username_type === 'PHONE_NUMBER') {
				username = '62' + username;
			}

			this.props.verifyOtp(username, this.state.otp)
				.then(response => {
					if (response.data.status.code != 0) {
						this.setState({ submit_message: 'Invalid verification code', is_submitting: false });
					}
					else {
						this.props.register({
							username: username,
							password: this.props.registration.password,
							fullname: this.props.registration.fullname,
							gender: this.props.registration.gender,
							dob: this.props.registration.dob,
							otp: this.state.otp,
							device_id: '1'
						})
						.then(response => {
							Router.push('/register/phone/step3');
						})
						.catch(error => {
							if (error.status == 200) {
								this.setState({ submit_message: error.data.status.message_client, is_submitting: false }, () => {
									if (error.data.status.code === 0) {
										Router.push('/register/phone/step3');
									}
								});
								
							}
							
							console.log(error);
						});
						
					}
				})
				.catch(error => {
					console.log(error);
				});
		});
		
	}

	generateAlertMessage(message) {
		let attempts = '';
		let index = -1;
		if ((index = message.indexOf('You have')) != -1) {
			if (message.indexOf('You have 1') != -1) {
				attempts = 'This is your last attempts';
			}
			else {
				attempts = message.substring(index);
			}
			
			if (this.props.registration.username_type === 'PHONE_NUMBER') {
				attempts = 'Carefully check your sms for verification code. ' + attempts;
			}
			else {
				attempts = 'Carefully check your email for verification code. ' + attempts;
			}

			if (message.indexOf('You have 0') != -1) {
				attempts = 'You have reached maximum attempts. please, try again later after 1 hours';
				this.setState({ req_otp_status: 1 });
			}
		}
		else {
			attempts = message;
		}
		return attempts;
	}

	showAlert() {
		let username = this.state.username;
		if (this.props.registration.username_type === 'PHONE_NUMBER') {
			username = '62' + username;
		}

		showConfirmAlert(this.state.alert_message, 'OTP Limits', () => {
			// code = 1 (please try again later (after 1 minute))
			this.props.getOtp(username)
				.then(response => {
					let newState = {};
					if (response.status === 200 && response.data.status.message_client != 'You have reached maximum attempts. please, try again later after 1 hours') {
						newState = {
							current_time: Date.now(),
							countdown_key: this.state.countdown_key + 1
						};
					}

					newState['alert_message'] = response.data.status.code !== 0 ? response.data.status.message_client : this.generateAlertMessage(response.data.status.message_client);
					this.setState(newState);
				})
				.catch(error => {
					console.log(error);
				});
		}, true, this.state.req_otp_status == 0 ? 'Not Now' : 'OK', this.state.req_otp_status == 0 ? 'Request New OTP' : '');

		if (this.state.alert_message.indexOf('reached maximum') == -1) {
			this.setState({ req_otp_status: 0 });
		}
		else if ((this.state.alert_message.indexOf('Carefully check') != -1 && this.state.alert_message.indexOf('You have 0') != -1) || this.state.alert_message.indexOf('reached maximum') != -1) {
			this.setState({ req_otp_status: 1 });
		}
	}

	render() {
		let text = 'Please enter verification code, <br>sent via email:';
		let username = this.state.username || '';

		let actionElement = null;
		if (this.state.is_submitting) {
			actionElement = <p className="text-default-rcti" style={{ textAlign: 'center', color: '#6dd400' }}>verifying...</p>;
		}
		else {
			actionElement = (
				<div>
					<p className="text-default-rcti" style={{ textAlign: 'center' }}>{this.state.submit_message}</p>
	
					<FormGroup>
						<label className="lbl_rsndcode">
							<Countdown
								key={this.state.countdown_key}
								date={this.state.current_time + (this.state.interval * 1000)}
								renderer={({ hours, minutes, seconds, completed }) => {
									if (completed) {
										return (<p className="text-default-rcti" style={{ textAlign: 'center' }}>did not receive any code<br/><span onClick={this.showAlert.bind(this)} className="el-red">send me code</span></p>);
									}
	
									return (<span>Resend code <span className="time-resendcode">{zeroPad(minutes)}:<span>{zeroPad(seconds)}</span></span></span>);
								}}></Countdown>
						</label>
					</FormGroup>
				</div>
			);
		}
		

		if (this.props.registration.username_type === 'PHONE_NUMBER') {
			text = 'Please enter verification code, <br>sent via SMS:';
			let newUsername = '';
			for (let i = 0; i < username.length; i++) {
				newUsername += username[i];
				if (i == 2 || i == 6) {
					newUsername += ' ';
				}
			}

			// username = '+62 ' + newUsername;
			username = '';
		}

		return (
			<Layout title="Register Step 2">
				<NavBack title="Verification"/>
				<div className="wrapper-content" style={{ width: '100%', marginTop: 50 }}>
					<div className="login-box" style={{ width: '100%' }}>
						<p style={{ fontSize: 14 }} className="text-default-rcti" dangerouslySetInnerHTML={{__html: text}}></p>
						<Form onSubmit={this.submitOtp.bind(this)}>{/*<span style={{ color: 'white' }}>{username}</span>*/}
							<FormGroup>
								<ReactCodeInput
									fields={4}
									onChange={this.onChangeOtp.bind(this)}
									className="otp-input" />
							</FormGroup>
							
							{actionElement}
						</Form>
					</div>
				</div>
			</Layout>
		);
	}
}

export default connect(state => state, {
	...registerActions,
	...notificationActions
})(Step2);