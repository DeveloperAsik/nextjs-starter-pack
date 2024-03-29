import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import storiesActions from '../../../redux/actions/storiesActions';

import { homeStoryEvent } from '../../../utils/appier';

import '../../../assets/scss/components/stories.scss';

class Stories extends React.Component {
    constructor(props) {
        super(props);
        this.storiesElement = null;
        this.storiesApi = null;

        this.state = {
            stories: [],
            resolution: 375
        }
    }

    componentDidMount() {
        const Zuck = require('../../../assets/js/zuck');
        this.props.getStories().then(response => {
            const stories = this.props.stories.data;
            let timelines = [];
            for (let i = 0; i < stories.length; i++) {
                const story = stories[i];
                let items = [];
                for (let j = 0; j < story.story.length; j++) {
                    items.push([
                        story.story[j].id,
                        story.story[j].link_video != null ? 'video' : 'photo',
                        10,
                        story.story[j].link_video != null ? (story.story[j].link_video) : (this.props.stories.image_path + this.state.resolution + story.story[j].story_img),
                        story.story[j].link_video != null ? (story.story[j].link_video) : (this.props.stories.image_path + this.state.resolution + story.story[j].story_img),
                        story.story[j].swipe_type == 'link' ? (story.story[j].swipe_value) : false, 'Click Here',
                        false,
                        story.story[j].release_date,
                        story.story[j].title
                    ]);

                }
                let programImg = '';
                if (story.program_img != null) {
                    programImg = this.props.stories.image_path + this.state.resolution  + story.program_img;
                }
                else {
                    programImg = 'static/placeholders/placeholder_potrait.png';
                }

                timelines.push(Zuck.buildTimelineItem(
                    story.program_id,
                    programImg,
                    story.program_title,
                    '',
                    false,
                    items
                ));
            }

            this.setState({
                stories: timelines
            }, () => {
                let currentSkin = this.getCurrentSkin(); // from demo
                this.storiesApi = new Zuck(this.storiesElement, {
                    backNative: true,
                    previousTap: true,
                    skin: currentSkin['name'],
                    autoFullScreen: currentSkin['params']['autoFullScreen'],
                    avatars: currentSkin['params']['avatars'],
                    paginationArrows: currentSkin['params']['paginationArrows'],
                    list: currentSkin['params']['list'],
                    cubeEffect: currentSkin['params']['cubeEffect'],
                    localStorage: true,
                    stories: this.state.stories,
                    reactive: true,
                    callbacks: {
                        onDataUpdate: function (currentState, callback) {
                            this.setState(state => {
                                state.stories = currentState;
                                return state;
                            }, () => {
                                callback();
                            });
                        }.bind(this),
                        onOpen: function (storyId, callback) {
                            console.log('OPEN');
                            document.body.style.overflow = 'hidden'; // disable scroll when opening a story
                            callback();
                        },
                        onClose: function (storyId, callback) {
                            console.log('CLOSED');
                            document.body.style.overflow = 'unset'; // enable scroll after closing the story
                            callback();
                        }
                    },
                    language: { // if you need to translate :)
                        unmute: 'Touch to unmute',
                        keyboardTip: 'Press space to see next',
                        visitLink: 'Visit link',
                        time: {
                            ago: 'ago',
                            hour: 'hour',
                            hours: 'hours',
                            minute: 'minute',
                            minutes: 'minutes',
                            fromnow: 'from now',
                            seconds: 'seconds',
                            yesterday: 'yesterday',
                            tomorrow: 'tomorrow',
                            days: 'days'
                        }
                    }
                });
            });
        });
    }

    getCurrentSkin() {
        let header = document.getElementById('header');
        let skin = location.href.split('skin=')[1];

        if (!skin) {
            skin = 'Snapgram';
        }

        if (skin.indexOf('#') !== -1) {
            skin = skin.split('#')[0];
        }

        let skins = {
            Snapgram: {
                avatars: true,
                list: false,
                autoFullScreen: false,
                cubeEffect: true,
                paginationArrows: false
            },

            VemDeZAP: {
                avatars: false,
                list: true,
                autoFullScreen: false,
                cubeEffect: false,
                paginationArrows: true
            },

            FaceSnap: {
                avatars: true,
                list: false,
                autoFullScreen: true,
                cubeEffect: false,
                paginationArrows: true
            },

            Snapssenger: {
                avatars: false,
                list: false,
                autoFullScreen: false,
                cubeEffect: false,
                paginationArrows: false
            }
        };

        let el = document.querySelectorAll('#skin option');
        let total = el.length;
        for (let i = 0; i < total; i++) {
            let what = skin == el[i].value ? true : false;

            if (what) {
                el[i].setAttribute('selected', 'selected');

                header.innerHTML = skin;
                header.className = skin;
            } else {
                el[i].removeAttribute('selected');
            }
        }

        return {
            name: skin,
            params: skins[skin]
        };
    }

    render() {
        const timelineItems = []
        this.state.stories.forEach((story, storyId) => {
            const storyItems = [];
            story.items.forEach((storyItem) => {
                storyItems.push(
                    <li key={storyItem.id} data-id={storyItem.id} data-time={storyItem.time} className={(storyItem.seen ? 'seen' : '')}>
                        <a href={storyItem.src} data-type={storyItem.type} data-length={storyItem.length} data-link={storyItem.link} data-linktext={storyItem.linkText} data-title={'hh3'}>
                            <img src={storyItem.preview} />
                        </a>
                    </li>
                );
            });

            let arrayFunc = story.seen ? 'push' : 'unshift';
            timelineItems[arrayFunc](
                <div className={(story.seen ? 'story seen' : 'story')} key={storyId} data-id={storyId} data-last-updated={story.lastUpdated} data-photo={story.photo}>
                    <a className="item-link" href={story.link}>
                        <span className="item-preview">
                            <img src={story.photo} />
                        </span>
                        <span className="info" itemProp="author" itemScope="" itemType="http://schema.org/Person">
                            <strong className="name" itemProp="name">{story.name}</strong>
                            <span className="time">{story.lastUpdated}</span>
                        </span>
                    </a>

                    <ul className="items">
                        {storyItems}
                    </ul>
                </div>
            );
        });
        return (
            <div className="stories-wrapper">
                <Head>
                    <link rel="stylesheet" href="static/css/zuck.css?v=2" />
                    <link rel="stylesheet" href="static/css/snapgram.css?v=2" />
                </Head>
                <div ref={node => this.storiesElement = node} id="stories-react" className="storiesWrapper">
                    {timelineItems}
                </div>
            </div>
        );
    }
}

export default connect(state => state, storiesActions)(Stories);