import React from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Img from 'react-image';
import BottomScrollListener from 'react-bottom-scroll-listener';
import { Picker } from 'emoji-mart';
import TimeAgo from 'react-timeago';
import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';
import { isIOS } from 'react-device-detect';
import MuteChat from '../components/Includes/Common/MuteChat';


import initialize from '../utils/initialize';
import { getCookie } from '../utils/cookie';
import { showSignInAlert } from '../utils/helpers';
import { contentGeneralEvent } from '../utils/appier';

import liveAndChatActions from '../redux/actions/liveAndChatActions';
import pageActions from '../redux/actions/pageActions';
import chatsActions from '../redux/actions/chats';
import userActions from '../redux/actions/userActions';

import Layout from '../components/Layouts/Default_v2';
import Wrench from '../components/Includes/Common/Wrench';

import { Row, Col, Button, Input } from 'reactstrap';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import SentimenVerySatifiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SendIcon from '@material-ui/icons/Send';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import PauseIcon from '../components/Includes/Common/PauseIcon';

import { DEV_API, VISITOR_TOKEN } from '../config';

import '../assets/scss/components/live-event.scss';
import '../assets/scss/videojs.scss';
import 'emoji-mart/css/emoji-mart.css';

import { getUserId } from '../utils/appier';
import { convivaVideoJs } from '../utils/conviva';

import videojs from 'video.js';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'video.js/src/css/video-js.scss';
import 'videojs-hls-quality-selector';
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels';

const innerHeight = require('ios-inner-height');

class LiveEvent extends React.Component {

	static async getInitialProps(ctx) {
		initialize(ctx);
		const id = ctx.query.id;
		const accessToken = getCookie('ACCESS_TOKEN');
		const options = {
			method: 'GET',
			headers: {
				'Authorization': accessToken ? accessToken : VISITOR_TOKEN
			}
		};
		const res = await Promise.all([
			fetch(`${DEV_API}/api/v1/live-event/${id}`, options),
			fetch(`${DEV_API}/api/v1/live-event/${id}/url`, options)
		]);

		const error_code = res[0].status > 200 ? res[0].status : false;
		const error_code_2 = res[1].status > 200 ? res[1].status : false;

		if (error_code || error_code_2) {
			return {
				selected_event: false,
				selected_event_url: false
			};
		}

		let userAgent;
		if (ctx.req) {
			userAgent = ctx.req.headers['user-agent'];
		}
		else {
			userAgent = navigator.userAgent;
		}
		let isMobile = Boolean(userAgent.match(
			/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
		));

		const data = await Promise.all([
			res[0].json(),
			res[1].json()
		]);

		return {
			selected_event: data[0],
			selected_event_url: data[1],
			user_agent: userAgent,
			is_mobile: isMobile
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			error: false,
			emoji_picker_open: false,
			chat_open: false,
			chat: '',
			user_data: null,
			snapshots: [],
			sending_chat: false,
			block_user: {
				status: false,
				message: '',
			},
			chats: [],
			live_events: [],
			meta: {},
			resolution: 300,
			status: this.props.selected_event_url ? this.props.selected_event_url.status : false,
			screen_width: 320,
			quality_selector_shown: false,
			playing: false,
            user_active: false
		};

		const segments = this.props.router.asPath.split(/\?/);
		this.reference = null;
		this.homepageTitle = null;
		if (segments.length > 1) {
			const q = queryString.parse(segments[1]);
			if (q.ref) {
				this.reference = q.ref;
			}
			if (q.homepage_title) {
				this.homepageTitle = q.homepage_title;
			}
		}

		this.player = null;
		this.videoNode = null;
		this.convivaTracker = null;
		this.disconnectHandler = null;
		this.props.setPageLoader();
	}
	
	componentWillUnmount() {
		for (let key in this.state.snapshots) {
			this.state.snapshots[key]();
		}

		if (this.player) {
			this.player.dispose();
		}
	}
	componentDidMount() {
		this.props.getLiveEvent('non on air')
			.then(response => {
				this.setState({ live_events: response.data.data, meta: response.data.meta }, () => {
					// this.initVOD();
					this.initPlayer();
					this.props.unsetPageLoader();
				});
			})
			.catch(error => {
				console.log(error);
				this.props.unsetPageLoader();
			});

		this.props.getUserData()
			.then(response => {
				console.log(response);
				if (response.status === 200 && response.data.status.code === 0) {
					this.setState({ user_data: response.data.data });
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
	statusChatBlock(id) {
		// UNCOMMENT LAGI KALO UDAH
		this.props.getLiveChatBlock(id)
			.then(res => {
				console.log(res);
				this.setState({
					block_user: {
						status: res.data.status.code === 0 ? false : true,
						message: res.data.status.message_client,
					},
				});

				console.log('state:', this.state.block_user);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	checkLogin() {
		if (!this.state.user_data) {
			showSignInAlert(`Please <b>Sign In</b><br/>
				Woops! Gonna sign in first!<br/>
				Only a click away and you<br/>
				can continue to enjoy<br/>
				<b>RCTI+</b>`, '', () => { }, true, 'Sign Up', 'Sign In', true, true);
			return false;
		}
		return true;
	}

	loadChatMessages(id) {
		this.props.setPageLoader();
		this.setState({ chats: [] }, () => {
			const chatBox = document.getElementById('chat-messages');
			chatBox.scrollTop = chatBox.scrollHeight;
			this.props.unsetPageLoader();
			if (true) {
				let firstLoadChat = true;
				this.props.listenChatMessages(id)
					.then(collection => {
						let snapshots = this.state.snapshots;
						let snapshot = collection.orderBy('ts', 'desc').limit(10).onSnapshot(querySnapshot => {
							querySnapshot.docChanges()
								.map(change => {
									let chats = this.state.chats;
									if (change.type === 'added') {
										if (!this.state.sending_chat) {
											if (chats.length > 0) {
												let lastChat = chats[chats.length - 1];
												let newChat = change.doc.data();
												if ((lastChat && newChat) && (lastChat.u != newChat.u || lastChat.m != newChat.m || lastChat.i != newChat.i)) {
													if (firstLoadChat) {
														chats.unshift(newChat);
													}
													else {
														chats.push(newChat);
													}
												}
											}
											else {
												if (firstLoadChat) {
													chats.unshift(change.doc.data());
												}
												else {
													chats.push(change.doc.data());
												}
											}

											const chatBox = document.getElementById('chat-messages');
											chatBox.scrollTop = chatBox.scrollHeight;

											const chatInput = document.getElementById('chat-input');
											chatInput.style.height = `24px`;
											this.setState({ chats: chats });
										}
									}

									// if (change.type === 'removed') {
									// 	let removed = change.doc.data();
									// 	for (let i = 0; i < chats.length; i++) {
									// 		if (chats[i].ts === removed.ts) {
									// 			chats.splice(i, 1);
									// 		}
									// 	}
									// 	this.setState({ chats: chats });
									// }
								});
						});
						snapshots[id] = snapshot;
						this.setState({ snapshots: snapshots });
					});
			}

		});
	}

	changeQualityIconButton() {
        const self = this;
        setTimeout(() => {
            const qualitySelectorElement = document.getElementsByClassName('vjs-quality-selector');
            if (qualitySelectorElement.length > 0) {
                const childs = qualitySelectorElement[0].childNodes;
                for (let i = 0; i < childs.length; i++) {
                    if (childs[i].className == 'vjs-menu-button vjs-menu-button-popup vjs-button') {
                        childs[i].addEventListener('touchstart', function() {
                            console.log('touch');
                            self.setState({ quality_selector_shown: !self.state.quality_selector_shown });
                        });
                        const qualityItems = document.querySelectorAll('li[role=menuitemradio]');
                        for (let j = 0; j < qualityItems.length; j++) {
                            qualityItems[j].addEventListener('touchstart', function() {
                                console.log('touch');
                                self.setState({ quality_selector_shown: false });
                            });
                        }
                        childs[i].addEventListener('click', function() {
                            console.log('click');
                            self.setState({ quality_selector_shown: !self.state.quality_selector_shown });
                        });
                        
                        const grandChilds = childs[i].childNodes;
                        for (let j = 0; j < grandChilds.length; j++) {
                            if (grandChilds[j].className == 'vjs-icon-placeholder' || grandChilds[j].className == 'vjs-icon-placeholder vjs-icon-hd' ) {
                                grandChilds[j].classList.remove('vjs-icon-hd');
                                grandChilds[j].innerHTML = '<i style="transform: scale(1.5)" class="fas fa-cog"></i>';
                                break;
                            }
                        }
                        break;
                    }
                }
            }
        }, 1000);
    }

    triggerQualityButtonClick(type = '') {
        const qualitySelectorElement = document.getElementsByClassName('vjs-quality-selector');
        if (qualitySelectorElement.length > 0) {
            const childs = qualitySelectorElement[0].childNodes;
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].className == 'vjs-menu-button vjs-menu-button-popup vjs-button' && type == 'inactive') {
                    childs[i].click();
                    break;
                }
            }
        }
    }

	initPlayer() {
		if (this.videoNode) {
			let url = '';
			let vmap = '';
			let id = '';
			let name = '';
			let type = '';
			let portrait_image = '';
			if (this.props.selected_event && this.props.selected_event_url && this.props.selected_event.data && this.props.selected_event_url.data) {
				url = this.props.selected_event_url.data.url;
				vmap = this.props.selected_event_url.data[process.env.VMAP_KEY];
				id = this.props.selected_event.data.id;
				name = this.props.selected_event.data.name;
				type = this.props.selected_event.data.type;
				portrait_image = this.props.selected_event.data.portrait_image;
				this.loadChatMessages(id);
				this.statusChatBlock(id);
			}
			const self = this;
			videojs.registerPlugin('hlsQualitySelector', qualitySelector);
			this.player = videojs(this.videoNode, {
				autoplay: true,
				controls: true,
				fluid: true,
				muted: isIOS,
				aspectratio: '16:9',
				fill: true,
				html5: {
					hls: {
						overrideNative: true,
					},
				},
				sources: [{
					src: url,
					type: 'application/x-mpegURL'
				}]
			}, function onPlayerReady() {
				console.log('onPlayerReady', this);
				const vm = this;
				if(isIOS) {
                    vm.muted(true)
                    const wrapElement = document.getElementsByClassName('video-js');
                    const elementCreateWrapper = document.createElement('btn');
                    const elementMuteIcon = document.createElement('span');
                    elementCreateWrapper.classList.add('jwplayer-vol-off');
                    elementCreateWrapper.innerText = 'Tap to unmute ';
                    wrapElement[0].appendChild(elementCreateWrapper);
                    elementCreateWrapper.appendChild(elementMuteIcon);
                    elementCreateWrapper.addEventListener('click', function() {
                        console.log('mute video')
                        if (elementCreateWrapper === null) {
                            vm.muted(false);
                            elementCreateWrapper.classList.add('jwplayer-mute');
                            elementCreateWrapper.classList.remove('jwplayer-full');
                        } 
                        else {
                            vm.muted(false);
                            elementCreateWrapper.classList.add('jwplayer-full');
                            elementCreateWrapper.classList.remove('jwplayer-mute');
                        }
                    });
                }

				const player = this;
				const assetName = self.props.selected_event && self.props.selected_event.data ? self.props.selected_event.data.name : 'Live Streaming';
				this.convivaTracker = convivaVideoJs(assetName, player, true, url, 'Live Event ' + assetName.toUpperCase(), {
					asset_name: assetName.toUpperCase(),
					application_name: 'RCTI+ MWEB',
					player_type: 'VideoJS',
					content_type: type,
					content_id: id.toString(),
					program_name: name,
					asset_cdn: 'Conversant',
					version: process.env.VERSION,
					playerVersion: process.env.PLAYER_VERSION,
					content_name: assetName.toUpperCase()
				});
				this.convivaTracker.createSession();

			});
			this.player.ready(function () {
				const vm = this
				const promise = vm.play();
				if (promise !== undefined) {
					promise.then(() => console.log('play'))
						.catch((err) => console.log('err'))
				}

				setTimeout(() => {
                    self.changeQualityIconButton();
                }, 100);
			});

			window.onorientationchange = () => {
                if (!isIOS) {
                    this.player.userActive(false);
                    setTimeout(() => {
                        this.setState({ screen_width: window.outerWidth });
                    }, 1000);
                }
            };

			this.player.on('useractive', () => {
                if (!this.player.paused()) {
                    const seekButtons = document.getElementsByClassName('vjs-seek-button');
                    for (let i = 0; i < seekButtons.length; i++) {
                        seekButtons[i].style.display = 'block';
                    }

                    this.setState({ user_active: true });
                }
            });

            this.player.on('userinactive', () => {
                if (!this.player.paused()) {
                    const seekButtons = document.getElementsByClassName('vjs-seek-button');
                    for (let i = 0; i < seekButtons.length; i++) {
                        seekButtons[i].style.display = 'none';
                    }
                    
                    this.setState({ user_active: false });
                }

                if (this.state.quality_selector_shown) {
                    this.triggerQualityButtonClick('inactive');
                }
            });

			this.player.on('fullscreenchange', () => {
				if (screen.orientation.type === 'portrait-primary') {
					screen.orientation.lock("landscape-primary");
				}
				if (screen.orientation.type === 'landscape-primary') {
					screen.orientation.lock("portrait-primary");
				}
			});
			this.player.on('error', () => {
				console.log('err')
				this.setState({
					error: true,
				});
			});
			this.player.hlsQualitySelector({
				displayCurrentQuality: true,
			});

			this.disconnectHandler = null;
			this.player.on('waiting', (e) => {
				const playButton = document.getElementsByClassName('vjs-big-play-button');
                if (playButton.length > 0) {
                    playButton[0].style.display = 'none';
				}
				if (this.disconnectHandler) {
                    clearTimeout(this.disconnectHandler);
                    this.disconnectHandler = null;
                }
				
				this.disconnectHandler = setTimeout(() => {
					this.setState({
						error: true,
					});
				}, 40000);
			})

			this.player.on('playing', () => {
				if (this.disconnectHandler) {
					clearTimeout(this.disconnectHandler);
				}

				this.setState({ playing: true });
			});

			this.player.on('ads-ad-started', () => {
                const playButton = document.getElementsByClassName('vjs-big-play-button');
                if (playButton.length > 0) {
                    playButton[0].style.display = 'none';
                }
            });

            this.player.on('play', () => {
                const seekButtons = document.getElementsByClassName('vjs-seek-button');
                for (let i = 0; i < seekButtons.length; i++) {
                    seekButtons[i].style.display = 'none';
                }

                const playButton = document.getElementsByClassName('vjs-big-play-button');
                if (playButton.length > 0) {
                    playButton[0].style.display = 'none';
                }

                this.setState({ playing: true });
            });

			let pauseCounter = 0; // avoid trigger first pause
            this.player.on('pause', () => {
                const seekButtons = document.getElementsByClassName('vjs-seek-button');
                for (let i = 0; i < seekButtons.length; i++) {
                    seekButtons[i].style.display = 'none';
                }

                if (pauseCounter++ > 0) {
                    const playButton = document.getElementsByClassName('vjs-big-play-button');
                    if (playButton.length > 0) {
                        playButton[0].style.display = 'block';
                    }
                }

                this.setState({ playing: false });
            });

			// this.player.ima({
			// 	adTagUrl: vmap,
			// 	preventLateAdStart: true
			// });
			// this.player.ima.initializeAdDisplayContainer();

			this.setState({ screen_width: window.outerWidth });
		}
	}

	initVOD() {
		let url = '';
		let vmap = '';
		let id = '';
		let name = '';
		let type = '';
		let portrait_image = '';
		if (this.props.selected_event && this.props.selected_event_url && this.props.selected_event.data && this.props.selected_event_url.data) {
			url = this.props.selected_event_url.data.url;
			vmap = this.props.selected_event_url.data[process.env.VMAP_KEY];
			id = this.props.selected_event.data.id;
			name = this.props.selected_event.data.name;
			type = this.props.selected_event.data.type;
			portrait_image = this.props.selected_event.data.portrait_image;
			this.loadChatMessages(id);
			this.statusChatBlock(id);
		}

		const playerId = 'live-event-player';
		this.player = window.jwplayer(playerId);
		this.player.setup({
			autostart: true,
			floating: false,
			file: url,
			primary: 'html5',
			width: '100%',
			aspectratio: '16:9',
			displaytitle: true,
			setFullscreen: true,
			stretching: 'exactfit',
			advertising: {
				client: process.env.ADVERTISING_CLIENT,
				tag: vmap
			},
			logo: {
				hide: true
			}
		});

		const self = this;
		this.player.on('ready', function () {
			conviva.startMonitoring(this);
			const assetMetadata = {
				viewer_id: getUserId(),
				playerType: 'JWPlayer',
				content_type: type,
				content_id: id,
				program_name: name,
				application_name: 'RCTI+ MWEB',
				asset_cdn: 'Conversant',
				version: process.env.VERSION,
				playerVersion: process.env.PLAYER_VERSION,
				asset_name: self.props.selected_event && self.props.selected_event.data ? self.props.selected_event.data.name : 'Live Streaming',
				content_name: self.props.selected_event && self.props.selected_event.data ? self.props.selected_event.data.name : 'Live Streaming'
			};
			console.log(assetMetadata);
			conviva.updatePlayerAssetMetadata(this, assetMetadata);

			if (isIOS) {
				let elementJwplayerInit = document.querySelector(`#${playerId} > .jw-wrapper`);
				let elementCreateWrapper = document.createElement('btn');
				let elementMuteIcon = document.createElement('span');
				elementCreateWrapper.classList.add('jwplayer-vol-off');
				elementCreateWrapper.innerText = 'Tap to unmute ';

				jwplayer().setMute(true);
				elementJwplayerInit.appendChild(elementCreateWrapper);
				elementCreateWrapper.appendChild(elementMuteIcon);
				elementCreateWrapper.addEventListener('click', () => {
					if (elementCreateWrapper === null) {
						jwplayer().setMute(true);
						elementJwplayer[0].classList.add('jwplayer-mute');
						elementJwplayer[0].classList.remove('jwplayer-full');
					}
					else {
						jwplayer().setMute(false);
						elementCreateWrapper.classList.add('jwplayer-full');
						elementCreateWrapper.classList.remove('jwplayer-mute');
					}
				});
			}
		});

		this.player.on('mute', function () {
			let elementJwplayer = document.getElementsByClassName('jwplayer-vol-off');
			if (elementJwplayer[0] !== undefined) {
				if (jwplayer().getMute()) {
					elementJwplayer[0].classList.add('jwplayer-mute');
					elementJwplayer[0].classList.remove('jwplayer-full');
				} else {
					elementJwplayer[0].classList.add('jwplayer-full');
					elementJwplayer[0].classList.remove('jwplayer-mute');
				}
			}
		});

		this.player.on('setupError', error => {
			console.log(error);
			this.player.remove();
			this.setState({
				error: true,
				error_data: error
			});
		});

		this.player.on('error', error => {
			console.log(error);
			this.player.remove();
			this.setState({
				error: true,
				error_data: error
			});
		});

		this.player.on('fullscreen', () => {
			if (screen.orientation.type === 'portrait-primary') {
				document.querySelector("#live-event-player").requestFullscreen();
				screen.orientation.lock("landscape-primary")
			}
			if (screen.orientation.type === 'landscape-primary') {
				document.querySelector("#live-event-player").requestFullscreen();
				screen.orientation.lock("portrait-primary")
			}
		});


		this.player.on('firstFrame', () => {
			if (this.reference && this.homepageTitle && this.reference == 'homepage') {
				contentGeneralEvent(this.homepageTitle, type, id, name, 'N/A', 'N/A', this.state.meta.image_path + this.state.resolution + portrait_image, 'N/A', 'mweb_homepage_live_event_play');
			}
		});
	}

	loadMore() {
		// TODO
	}

	toggleChat() {
		if (this.checkLogin()) {
			this.setState({ chat_open: !this.state.chat_open }, () => {
				this.props.toggleFooter(this.state.chat_open);
				const chatBox = document.getElementById('chat-messages');
				chatBox.scrollTop = chatBox.scrollHeight;
			});
		}
	}

	toggleEmoji() {
		this.setState({ emoji_picker_open: !this.state.emoji_picker_open });
	}

	handleChatEnter(e) {
		const chatInput = document.getElementById('chat-input');
		const scrollHeight = chatInput.scrollHeight - 30;
		chatInput.style.height = `${24 + (24 * (scrollHeight / 24))}px`;

		if (e.key === 'Enter' && !e.shiftKey && this.state.chat && this.state.chat != '\n') {
			this.sendChat();
		}
	}

	onChangeChatInput(e) {
		if (e.target.value != '\n') {
			this.setState({ chat: e.target.value });
		}
	}

	resendChat(index) {
		let chats = this.state.chats;
		let lastChat = chats[index];
		lastChat.sent = false;
		lastChat.failed = false;
		chats[index] = lastChat;
		this.setState({ chats: chats, sending_chat: true }, () => {
			const { id } = this.props.selected_event.data;
			const userData = this.state.user_data;
			let user = userData.nickname ? userData.nickname :
				userData.display_name ? userData.display_name :
					userData.email ? userData.email.replace(/\d{4}$/, '****') :
						userData.phone_number ? userData.phone_number.substring(0, userData.phone_number.lastIndexOf("@")) : 'anonymous';

			this.props.setChat(id, lastChat.m, user, this.state.user_data.photo_url)
				.then(response => {
					lastChat.sent = true;
					if (response.status !== 200 || response.data.status.code !== 0) {
						lastChat.failed = true;
					}
					chats[index] = lastChat;
					this.setState({ chats: chats, sending_chat: false });
				})
				.catch(() => {
					lastChat.sent = true;
					lastChat.failed = true;
					chats[index] = lastChat;
					this.setState({ chats: chats, sending_chat: false });
				});
		});
	}

	sendChat() {
		if (this.state.user_data) {
			if (this.state.chat != '') {
				const { id } = this.props.selected_event.data;
				this.statusChatBlock(id);

				const userData = this.state.user_data;
				let user = userData.nickname ? userData.nickname :
					userData.display_name ? userData.display_name :
						userData.email ? userData.email.replace(/\d{4}$/, '****') :
							userData.phone_number ? userData.phone_number.substring(0, userData.phone_number.lastIndexOf("@")) : 'anonymous';
				let newChat = {
					ts: Date.now(),
					m: this.state.chat,
					u: user,
					i: this.state.user_data.photo_url,
					sent: false,
					failed: false
				};
				let chats = this.state.chats;
				chats.push(newChat);
				this.setState({ chats: chats, chat: '', sending_chat: true }, () => {
					const chatBox = document.getElementById('chat-messages');
					chatBox.scrollTop = chatBox.scrollHeight;

					const chatInput = document.getElementById('chat-input');
					chatInput.style.height = `24px`;

					this.props.setChat(id, newChat.m, user, this.state.user_data.photo_url)
						.then(response => {
							newChat.sent = true;
							if (response.status !== 200 || response.data.status.code !== 0) {
								newChat.failed = true;
							}
							chats[chats.length - 1] = newChat;
							this.setState({ chats: chats, sending_chat: false });
						})
						.catch(() => {
							newChat.sent = true;
							newChat.failed = true;
							chats[chats.length - 1] = newChat;
							this.setState({ chats: chats, sending_chat: false });
						});
				});
			}
		}
		else {
			showSignInAlert(`Please <b>Sign In</b><br/>
			Woops! Gonna sign in first!<br/>
			Only a click away and you<br/>
			can continue to enjoy<br/>
			<b>RCTI+</b>`, '', () => { }, true, 'Sign Up', 'Sign In', true, true);
		}
	}

	onSelectEmoji() {

	}

	renderPlayer() {
		let playerRef = (<div></div>);
		let errorRef = (<div></div>);

		if (this.state.error) {
			errorRef = (
				<div>
					<span></span>
					<div style={{
						textAlign: 'center',
						padding: 30,
						minHeight: 180
					}}>
						<Wrench />
						<h5 style={{ color: '#8f8f8f' }}>
							{this.state.status && this.state.status.code === 12 ? (
								<div>
									<span style={{ fontSize: 12 }}>{this.state.status.message_client}</span>
								</div>
							) : (
								<div>
									<strong style={{ fontSize: 14 }}>Cannot load the video</strong><br />
									<span style={{ fontSize: 12 }}>Please try again later,</span><br />
									<span style={{ fontSize: 12 }}>we're working to fix the problem</span>
								</div>
							)}
						</h5>
					</div>
				</div>
			);
			// this.player.remove();
		}
		else {
			playerRef = (
				<div className="player-liveevent-container">
					<div data-vjs-player>
						<div
							onClick={() => {
								if (this.player) {
									this.player.pause();
								}
							}}
							style={{
								position: 'absolute',
								top: '50%',
								left: this.state.screen_width / 2,
								marginTop: '-0.81666em',
								display: this.state.playing && this.state.user_active ? 'block' : 'none',
								transform: 'scale(1.5) translateX(-30%) translateY(-30%)',
								padding: 0
							}}>
							<PauseIcon/>
						</div>
						<video
							autoPlay
							playsInline
							style={{
								width: '100%',
							}}
							ref={node => this.videoNode = node}
							className="video-js vjs-default-skin vjs-big-play-centered"
						></video>
					</div>
				</div>
			);
		}

		return this.state.error ? errorRef : playerRef;
	}

	render() {
		return (
			<Layout title="Live Event - RCTI+">
				<Head>
					<meta name="description" content={`description`} />
					<meta name="keywords" content={`keywords`} />
				</Head>
				<div className="wrapper-content" style={{ padding: 0, margin: 0 }}>
					{/* { this.state.error ? errorRef : playerRef } */}
					{/* {(this.state.error) ? errorRef : playerRef} */}
					{this.renderPlayer()}
					<div className="title-wrap">
						{this.props.selected_event && this.props.selected_event.data ? this.props.selected_event.data.name : 'Live Streaming'}
						{/* Live Chat Plus {this.props.selected_event && this.props.selected_event.data ? formatDateWord(new Date(this.props.selected_event.data.start_date.replace(' ', 'T'))) : ''} */}
					</div>
					<div className="content-wrap">
						<div className="live-event-menu">
							<BottomScrollListener offset={40} onBottom={this.loadMore.bind(this)}>
								{scrollRef => (
									<div>
										<p className="live-event-title"><strong>Live Event</strong></p>
										<div ref={scrollRef} className="live-event-slider">
											{this.state.live_events.map((le, i) => (
												<div onClick={() => Router.push(`/live-event/${le.id}/${le.name.toLowerCase().replace(/ +/g, '-')}`)} key={i} className="live-event-slide">
													<Img alt={'alt'} src={[this.state.meta.image_path + this.state.resolution + le.portrait_image, '/static/placeholders/placeholder_potrait.png']} className="live-event-thumbnail" />
													<div className="ribbon">Live</div>
												</div>
											))}
										</div>
									</div>
								)}
							</BottomScrollListener>
						</div>
					</div>
					<div className={'live-event-chat-wrap ' + (this.state.chat_open ? 'live-event-chat-wrap-open' : '')} style={this.state.chat_open ?
						(isIOS ?
							{ height: `calc(100vh - (${innerHeight()}px - 342px))` } :
							{ height: `calc(100vh - (${document.documentElement.clientHeight}px - 342px))` })
						: null}>
						<Button onClick={this.toggleChat.bind(this)} color="link"><ExpandLessIcon className="expand-icon" /> Live Chat <FiberManualRecordIcon className="indicator-dot" /></Button>
						<div className="box-chat" style={{ height: 300 }}>
							<div className="wrap-live-chat__block" style={this.state.block_user.status ? { display: 'flex' } : { display: 'none' }}>
								<div className="block_chat" style={this.state.chat_open ? { display: 'block' } : { display: 'none' }}>
									<div>
										<MuteChat className="icon-block__chat" />
										<p>Sorry, you cannot send the message</p>
										<span>{this.state.block_user.message}</span>
									</div>
								</div>
							</div>
							<div className="chat-messages" id="chat-messages">
								{this.state.chats.map((chat, i) => (
									<Row key={i} className="chat-line">
										<Col xs={2}>
											<Img
												loader={<PersonOutlineIcon className="chat-avatar" />}
												unloader={<PersonOutlineIcon className="chat-avatar" />}
												className="chat-avatar" src={[chat.i, '/static/icons/person-outline.png']} />
										</Col>
										<Col className="chat-message" xs={10}>
											{chat.sent != undefined && chat.failed != undefined ? (chat.sent == true && chat.failed == true ? (<span onClick={() => this.resendChat(i)}><RefreshIcon className="message" /> <small style={{ marginRight: 10, fontSize: 8, color: 'red' }}>failed</small></span>) : (<TimeAgo className="timeago" minPeriod={60} date={Date.now() - (Date.now() - chat.ts)} />)) : (<TimeAgo className="timeago" minPeriod={60} date={Date.now() - (Date.now() - chat.ts)} />)} <span className="username">{chat.u}</span> <span className="message">{chat.m}</span>
										</Col>
									</Row>
								))}
							</div>
							<div className="chat-input-box">
								<div className="chat-box">
									<Row>
										<Col xs={1}>
											<Button className="emoji-button">
												{this.state.emoji_picker_open ? (<KeyboardIcon onClick={this.toggleEmoji.bind(this)} />) : (<SentimenVerySatifiedIcon onClick={this.toggleEmoji.bind(this)} />)}
											</Button>
										</Col>
										<Col xs={9}>
											<Input
												onKeyDown={this.handleChatEnter.bind(this)}
												onChange={this.onChangeChatInput.bind(this)}
												onClick={this.checkLogin.bind(this)}
												value={this.state.chat}
												type="textarea"
												id="chat-input"
												placeholder="Start Chatting"
												className="chat-input"
												maxLength={250}
												rows={1} />
										</Col>
										<Col xs={1}>
											<Button className="send-button" onClick={this.sendChat.bind(this)}>
												<SendIcon />
											</Button>
										</Col>
									</Row>
								</div>
								<Picker
									onSelect={emoji => {
										this.onSelectEmoji();
									}}
									showPreview={false}
									darkMode
									style={{ height: this.state.emoji_picker_open ? 200 : 0 }} />
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default connect(state => state, {
	...liveAndChatActions,
	...pageActions,
	...chatsActions,
	...userActions
})(withRouter(LiveEvent));