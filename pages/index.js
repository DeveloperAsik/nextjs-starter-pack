import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import BottomScrollListener from 'react-bottom-scroll-listener';
import LoadingBar from 'react-top-loading-bar';
import { StickyContainer, Sticky } from 'react-sticky';

import contentActions from '../redux/actions/contentActions';
import pageActions from '../redux/actions/pageActions';
import adsActions from '../redux/actions/adsActions';

import initialize from '../utils/initialize';
import { homeGeneralClicked } from '../utils/appier';

import Layout from '../components/Layouts/Default_v2';
import Nav from '../components/Includes/Navbar/NavDefault_v2';
import Carousel from '../components/Includes/Gallery/Carousel_v2';
import Stories from '../components/Includes/Gallery/Stories';
import Panel1 from '../components/Panels/Pnl_1';
import Panel2 from '../components/Panels/Pnl_2';
import Panel3 from '../components/Panels/Pnl_3';
import Panel4 from '../components/Panels/Pnl_4';
import StickyAds from '../components/Includes/Banner/StickyAds';
import GridMenu from '../components/Includes/Common/GridMenu';

import { SITEMAP } from '../config';
import { setCookie, getCookie } from '../utils/cookie';

class Index_v2 extends React.Component {
    static async getInitialProps(ctx) {
        initialize(ctx);
    }

    constructor(props) {
        super(props);
        this.state = {
            contents: [],
            page: 1,
            fetchAllowed: true,
            meta: null,
            resolution: 320,
            is_loading: false,
            length: 5,
            show_sticky_install: false,
            sticky_ads_closed: false
        };

        this.props.setPageLoader();
        this.swipe = {};
    }

    onTouchStart(e) {
		const touch = e.touches[0];
		this.swipe = { y: touch.clientY };
	}

	onTouchEnd(e) {
		const touch = e.changedTouches[0];
		const absY = Math.abs(touch.clientY - this.swipe.y);
		if (absY > 50) {
			homeGeneralClicked('mweb_homepage_scroll_vertical');
		}
	}

    componentDidMount() {
        window.onbeforeunload = e => {
            homeGeneralClicked('mweb_homepage_refresh');
        };

        this.props.getContents(this.state.page, this.state.length)
            .then(response => {
                console.log(response);
                this.setState({ contents: this.props.contents.homepage_content, meta: this.props.contents.meta }, () => this.props.unsetPageLoader());
            })
            .catch(error => {
                console.log(error);
                this.props.unsetPageLoader();
            });
        
        if (getCookie('STICKY_INSTALL_CLOSED')) {
            this.setState({ show_sticky_install: !getCookie('STICKY_INSTALL_CLOSED') });
        }
        else {
            this.setState({ show_sticky_install: true });
        }
    }

    bottomScrollFetch() {
        const page = this.state.page + 1;
        if (this.state.fetchAllowed && !this.state.is_loading) {
            this.setState({ is_loading: true }, () => {
                this.LoadingBar.continuousStart();
                this.props.getContents(page, this.state.length)
                    .then(response => {
                        const homepageContents = this.state.contents;
                        if (this.props.contents.homepage_content.length > 0) {
                            homepageContents.push.apply(homepageContents, this.props.contents.homepage_content);
                            this.setState({
                                contents: homepageContents,
                                page: page,
                                fetchAllowed: page != this.state.meta.pagination.total_page,
                                is_loading: false
                            });
                        }
                        else {
                            this.setState({ fetchAllowed: false, is_loading: false });
                        }
                        this.LoadingBar.complete();
                    })
                    .catch(error => {
                        this.LoadingBar.complete();
                        console.log(error);
                        this.setState({ is_loading: false });
                    });
            });
        }
    }

    closeStickyInstall(self) {
        setCookie('STICKY_INSTALL_CLOSED', 1);
        self.setState({ show_sticky_install: false });
    }

    render() {
        const contents = this.state.contents;
        const meta = this.state.meta || {};
        return (
            <Layout title={SITEMAP.home.title}>
                <Head>
                    <meta name="description" content={SITEMAP.home.description} />
                    <meta name="keywords" content={SITEMAP.home.keywords} />
                </Head>
                <BottomScrollListener offset={150} onBottom={this.bottomScrollFetch.bind(this)} />
                <LoadingBar progress={0} height={3} color={this.state.show_sticky_install ? '#000' : '#fff'} onRef={ref => (this.LoadingBar = ref)} />
                <Nav parent={this} closeStickyInstallFunction={this.closeStickyInstall} showStickyInstall={this.state.show_sticky_install}/>
                <Carousel showStickyInstall={this.state.show_sticky_install}>
                    <GridMenu />
                </Carousel>
                <Stories/>
                <StickyContainer>
                    <Sticky>
                        { ({ distanceFromTop }) => {
                            if (distanceFromTop < 0) {
                                if (!this.props.ads.ads_displayed) {
                                    return (<StickyAds/>);
                                }
                                const adsContents = document.getElementById(process.env.MODE === 'PRODUCTION' ? 'div-gpt-ad-1584677487159-0' : 'div-gpt-ad-1584677577539-0').childNodes;
                                if (adsContents.length > 0) {
                                    if (adsContents[0].tagName == 'SCRIPT') {
                                        const stickyAds = document.getElementById('sticky-ads-container');
                                        if (stickyAds) {
                                            stickyAds.style.display = 'none'
                                        }
                                    }
                                }
                                return (<StickyAds sticky/>);
                            }
                            return (<StickyAds/>);
                        } }
                    </Sticky>
                </StickyContainer>
                {/* <native-home></native-home> */}
                <div onTouchStart={this.onTouchStart.bind(this)} onTouchEnd={this.onTouchEnd.bind(this)}>
                    {contents.map((content, i) => {
                        switch (content.display_type) {
                            case 'horizontal_landscape_large':
                                return <Panel1 type={content.type} loadingBar={this.LoadingBar} key={content.id} contentId={content.id} title={content.title} content={content.content} imagePath={meta.image_path} resolution={this.state.resolution - 100} displayType={content.display_type}/>;

                            case 'horizontal_landscape':
                                return <Panel2 loadingBar={this.LoadingBar} key={content.id} contentId={content.id} title={content.title} content={content.content} imagePath={meta.image_path} resolution={this.state.resolution - 100} displayType={content.display_type}/>;

                            case 'horizontal':
                                return <Panel3 loadingBar={this.LoadingBar} key={content.id} contentId={content.id} title={content.title} content={content.content} imagePath={meta.image_path} resolution={this.state.resolution - 100} displayType={content.display_type}/>;

                            case 'vertical':
                                return <Panel4 loadingBar={this.LoadingBar} key={content.id} contentId={content.id} title={content.title} content={content.content} imagePath={meta.image_path} resolution={this.state.resolution - 100} displayType={content.display_type}/>;
                        }
                    })}
                </div>
                {/* <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
                <script dangerouslySetInnerHTML={{ __html: `
                    window.googletag = window.googletag || {cmd: []};
                    googletag.cmd.push(function() {
                        googletag.defineSlot('/21865661642/RC_NATIVE-AD_MOBILE', ['fluid'], 'div-gpt-ad-1584419593176-0').addService(googletag.pubads());
                        googletag.pubads().enableSingleRequest();
                        googletag.pubads().collapseEmptyDivs();
                        googletag.enableServices();
                    });
                ` }}></script> */}
                {/* <!-- /21865661642/RC_NATIVE-AD_MOBILE --> */}
                {/* <div id='div-gpt-ad-1584419593176-0'>
                    <script dangerouslySetInnerHTML={{ __html: `googletag.cmd.push(function() { googletag.display('div-gpt-ad-1584419593176-0'); });` }}></script>
                </div> */}
        </Layout>
        );
    }

}

export default connect(state => state, {
    ...contentActions,
    ...pageActions,
    ...adsActions
})(Index_v2);
