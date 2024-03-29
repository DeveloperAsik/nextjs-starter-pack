import React from 'react';
import Img from 'react-image';
import { connect } from 'react-redux';
import Router from 'next/router';
import BottomScrollListener from 'react-bottom-scroll-listener';

import contentActions from '../../redux/actions/contentActions';
import { contentGeneralEvent, homeGeneralClicked, homeProgramClicked } from '../../utils/appier';

class Pnl_3 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.contentId,
			contents: this.props.content,
			loading: false,
			page: 1,
			length: 7,
			endpage: false
		};

		this.swipe = {};
	}

	onTouchStart(e) {
		const touch = e.touches[0];
		this.swipe = { x: touch.clientX };
	}

	onTouchEnd(e) {
		const touch = e.changedTouches[0];
		const absX = Math.abs(touch.clientX - this.swipe.x);
		if (absX > 50) {
			homeGeneralClicked('mweb_homepage_scroll_horizontal');
		}
	}

	link(data) {
		console.log('PANEL 3', data);
		switch (data.content_type) {
			case 'special':
				contentGeneralEvent(this.props.title, data.content_type, data.content_id, data.content_title, data.program_title ? data.program_title : 'N/A', data.genre ? data.genre : 'N/A', this.props.imagePath + this.props.resolution + data.portrait_image, this.props.imagePath + this.props.resolution + data.landscape_image, 'mweb_homepage_special_event_clicked');

				window.open(data.link, '_blank');
				break;

			case 'live':
				contentGeneralEvent(this.props.title, data.content_type, data.content_id, data.content_title, data.program_title ? data.program_title : 'N/A', data.genre ? data.genre : 'N/A', this.props.imagePath + this.props.resolution + data.portrait_image, this.props.imagePath + this.props.resolution + data.landscape_image, 'mweb_homepage_live_event_clicked');

				Router.push(`/live-event/${data.content_id}/${data.content_title.replace(/ +/g, '-').replace(/#+/g, '').toLowerCase()}?ref=homepage&homepage_title=${this.props.title}`);
				break;

			case 'program':
				homeProgramClicked(this.props.title, data.program_id, data.program_title ? data.program_title : 'N/A', data.genre ? data.genre : 'N/A',  this.props.imagePath + this.props.resolution + data.portrait_image, this.props.imagePath + this.props.resolution + data.landscape_image, 'mweb_homepage_program_clicked');

				if (data.program_id) {
					Router.push(`/programs/${data.program_id}/${data.program_title.replace(/ +/g, '-').replace(/#+/g, '').toLowerCase()}?ref=homepage&homepage_title=${this.props.title}`);
				}
				else if (data.content_id) {
					Router.push(`/programs/${data.content_id}/${data.program_title.replace(/ +/g, '-').replace(/#+/g, '').toLowerCase()}?ref=homepage&homepage_title=${this.props.title}`);
				}
				break;

			default:
				contentGeneralEvent(this.props.title, data.content_type, data.content_id, data.content_title, data.program_title ? data.program_title : 'N/A', data.genre ? data.genre : 'N/A', this.props.imagePath + this.props.resolution + data.portrait_image, this.props.imagePath + this.props.resolution + data.landscape_image, 'mweb_homepage_content_clicked');

				Router.push(`/programs/${data.program_id}/${data.program_title.replace(/ +/g, '-').replace(/#+/g, '').toLowerCase()}/${data.content_type}/${data.content_id}/${data.content_title.replace(/ +/g, '-').toLowerCase()}?ref=homepage&homepage_title=${this.props.title}`);
				break;
		}
	}

	loadMore() {
		if (!this.state.loading && !this.state.endpage) {
			const page = this.state.page + 1;
			this.setState({ loading: true }, () => {
				this.props.loadingBar && this.props.loadingBar.continuousStart();
				this.props.getHomepageContents(this.state.id, 'mweb', page, this.state.length)
					.then(response => {
						if (response.status === 200 && response.data.status.code === 0) {
							const contents = this.state.contents;
							contents.push.apply(contents, response.data.data);
							this.setState({ loading: false, contents: contents, page: page, endpage: response.data.data.length < this.state.length });
						}
						else {
							this.setState({ loading: false });
						}
						this.props.loadingBar && this.props.loadingBar.complete();
					})
					.catch(error => {
						console.log(error);
						this.setState({ loading: false, endpage: true })
						this.props.loadingBar && this.props.loadingBar.complete();
					});
			});
		}
	}

	render() {
		return (
			<div onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)} className="homepage-content pnl_horizontal">
				<h2 className="content-title">{this.props.title}</h2>
				<BottomScrollListener offset={40} onBottom={this.loadMore.bind(this)}>
					{scrollRef => (
						<div ref={scrollRef} className="swiper-container">
							{this.props.content.map(c => (
								<div onClick={() => this.link(c)}  key={`${this.props.contentId}-${c.content_id}`} className="swiper-slide">
									<div>
										<Img 
											alt={c.program_title} 
											unloader={<img src="/static/placeholders/placeholder_potrait.png"/>}
											loader={<img src="/static/placeholders/placeholder_potrait.png"/>}
											src={[this.props.imagePath + this.props.resolution + c.portrait_image, '/static/placeholders/placeholder_potrait.png']} />
									</div>
								</div>
							))}
						</div>
					)}
				</BottomScrollListener>
				
			</div>
		);
	}

}

export default connect(state => state, contentActions)(Pnl_3);
