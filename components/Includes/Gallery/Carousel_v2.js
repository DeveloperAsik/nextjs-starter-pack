import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import contentActions from '../../../redux/actions/contentActions';
import { Carousel } from 'react-responsive-carousel';
import Img from 'react-image';

import { homeBannerEvent } from '../../../utils/appier';

import '../../../assets/scss/plugins/carousel/carousel.scss';

class Crs_v2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banner: [],
            meta: null,
            resolution: 420
        };
    }

    componentDidMount() {
        this.props.getBanner().then(response => {
            const contents = this.props.contents;
            console.log(contents.banner);
            this.setState({
                banner: contents.banner,
                meta: contents.meta,
            });
        });
    }

    goToProgram(program) {
        homeBannerEvent(program.id, program.type, program.title, this.state.meta.image_path + this.state.resolution + program.portrait_image, this.state.meta.image_path + this.state.resolution + program.landscape_image, 'mweb_homepage_banner_clicked');
        switch (program.type) {
            case 'url':
                window.open(program.type_value, '_blank');
                break;
            case 'episode':
                if (program.type_value) {
                    this.props.getContentShareLink(program.type_value, program.type)
                        .then(response => {
                            window.location.href = response.data.data.share_link;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
                break;
            case 'live_event':
                if (program.type_value) {
                    Router.push(`/live-event/${program.type_value}/${program.title.replace(/ +/g, '-')}`);
                }
                break;
            case 'program':
                Router.push(`/programs/${program.type_value}/${program.title.replace(/ +/g, '-')}`);
                break;
        }        
    }

    render() {
        return (
                <div style={{ 
                    position: 'relative', 
                    paddingTop: this.props.showStickyInstall ? 60 : 0 
                }}>
                    <Carousel 
                        className="banner-carousel"
                        statusFormatter={(current, total) => `${current}/${total}`} 
                        autoPlay 
                        showThumbs={false} 
                        showIndicators 
                        stopOnHover 
                        showArrows={false} 
                        showStatus={false} 
                        swipeScrollTolerance={1} 
                        infiniteLoop
                        swipeable 
                        onSwipeEnd={(e) => {
                            const swipedIndex = e.target.getAttribute('data-index');
                            if (this.state.banner[swipedIndex]) {
                                const program = this.state.banner[swipedIndex];
                                homeBannerEvent(program.id, program.type, program.title, this.state.meta.image_path + this.state.resolution + program.portrait_image, this.state.meta.image_path + this.state.resolution + program.landscape_image, 'mweb_homepage_banner_swipe');
                            }
                    }}>
                        {this.state.banner.map((b, i) => (
                            <div data-index={i} onClick={this.goToProgram.bind(this, b)} key={b.id} style={{ 
                                width: '100%', 
                                minHeight: 320
                            }}>
                                <Img 
                                    alt={b.title}
                                    src={[`${this.state.meta.image_path + this.state.resolution + b.square_image}`, '/static/placeholders/placeholder_landscape.png']}
                                    unloader={<img alt={b.title} src="/static/placeholders/placeholder_landscape.png"/>}
									loader={<img alt={b.title} src="/static/placeholders/placeholder_landscape.png"/>}/>
                            </div>
                            ))}
                    </Carousel>
                    {this.props.children}
                    <div style={{ position: 'absolute', bottom: 0, backgroundImage: 'linear-gradient(180deg,rgba(40,40,40,0) 0,rgba(40,40,40,0) 0%,#282828)', width: '100%', height: 100 }}></div>
                </div>
                );
    }
}
export default connect(state => state, contentActions)(Crs_v2);
