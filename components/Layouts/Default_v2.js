import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

import actions from '../../redux/actions';
import pageActions from '../../redux/actions/pageActions';
import userActions from '../../redux/actions/userActions';

import Footer from '../../components/Includes/Footer/Default';
import Footer_v2 from '../../components/Includes/Footer/Default_v2';

import { AUTHOR, VIEWPORT, MAIN_DESCRIPTION, OPEN_GRAPH } from '../../config';
import { Spinner } from 'reactstrap';

import queryString from 'query-string';

import '../../node_modules/video.js/dist/video-js.min.css';
import '../../node_modules/videojs-contrib-ads/dist/videojs.ads.css';
import '../../node_modules/videojs-ima/dist/videojs.ima.css';

import '../../assets/scss/videojs.scss';

class Default_v2 extends React.Component {

    constructor(props) {
        super(props);
        this.platform = null;
        const segments = this.props.router.asPath.split(/\?/);
        if (segments.length > 1) {
            const q = queryString.parse(segments[1]);
            if (q.platform) {
                this.platform = q.platform;
            }
        }
    }

    componentDidMount() {
        console.log('User added to home screen');
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeinstallprompt', async e => {
                // beforeinstallprompt Event fired
                try {
                    // e.userChoice will return a Promise.
                    const choiceResult = await e.userChoice;
                    if (choiceResult.outcome === 'dismissed') {
                        /* eslint-disable no-console */
                        console.log('User cancelled home screen install');
                        /* eslint-enable no-console */
                    } else {
                        /* eslint-disable no-console */
                        /* eslint-enable no-console */
                    }
                } catch (error) {
                    /* eslint-disable no-console */
                    console.error(
                        'user choice prompt promise failed to resolve, error: ',
                        error,
                    );
                    /* eslint-enable no-console */
                }
            });
        }
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <Head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#171717" />
                    <meta name="msapplication-TileColor" content="#171717" />
                    <meta name="msapplication-navbutton-color" content="#171717" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#171717" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />

                    <meta name="author" content={AUTHOR} />
                    <meta name="viewport" content={VIEWPORT} />
                    <meta name="description" content={MAIN_DESCRIPTION} />
                    {Object.keys(OPEN_GRAPH).map(og => (<meta key={og} name={'og:' + og} content={OPEN_GRAPH[og]} />))}
                    <link rel="icon" href="/static/logo/rcti.png?v=1.0" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="canonical" href={`http://www.rctiplus.com${this.props.router.asPath}`}></link>
                    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;lang=en" />

                    {/* Google Tag Manager */}
                    <script dangerouslySetInnerHTML={{ __html: `
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
                        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);}
                        )(window,document,'script','dataLayer','GTM-WJNRTJP');
                    ` }}></script>
                    {/* End Google Tag Manager */}

                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                    <script dangerouslySetInnerHTML={{ __html: `
                        (adsbygoogle = window.adsbygoogle || []).push({
                            google_ad_client: "ca-pub-8248966892082355",
                            enable_page_level_ads: true
                        });
                    ` }}></script>
                    {/* <script data-ad-client="ca-pub-7595624984434758" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}


                    <script src="/static/js/fontawesome.js" crossOrigin="anonymous"></script>

                    <script src="https://cdn.jwplayer.com/libraries/Vp85L1U1.js"></script>
                    <script dangerouslySetInnerHTML={{ __html: `jwplayer.key = "Mh/98M9sROX0uXhFlJwXZYeCxbJD5E1+e2goFcRZ07cI/FTu";` }}></script>
                    {/* <script type="text/javascript" src="/statics/js/jwplayer-cstm-btn.min.js" async></script> */}
                    <script src="https://cdn.qgraph.io/dist/aiqua-wp.js"></script>
                    <script dangerouslySetInnerHTML={{ __html: `
                        AIQUA.init({
                            appId: 'c63c2960bf562e9ec2de',
                            timeout: 5000
                        });
                    `}}>
                    </script>
                    <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
                    <script dangerouslySetInnerHTML={{ __html: `
                        window.googletag = window.googletag || {cmd: []};
                        googletag.cmd.push(function() {
                        // googletag.defineSlot('/21865661642/PRO_MIDDLE_MOBILE', [320, 50], 'div-gpt-ad-1572507979836-0').addService(googletag.pubads());
                        // googletag.pubads().enableSingleRequest();
                        // googletag.pubads().collapseEmptyDivs();
                        // googletag.enableServices();
                        });
                    ` }}></script>
                    
                    {/* Comscore */}
                    <script dangerouslySetInnerHTML={{ __html: `
                        var _comscore=_comscore||[];_comscore.push({c1:"2",c2:"9013027"}),function(){var c=document.createElement("script"),e=document.getElementsByTagName("script")[0];c.async=!0,c.src=("https:"==document.location.protocol?"https://sb":"http://b")+".scorecardresearch.com/beacon.js",e.parentNode.insertBefore(c,e)}();
                    ` }}></script>
                    <noscript><img alt="Share" src="https://b.scorecardresearch.com/p?c1=2&amp;c2=9013027&amp;cv=2.0&amp;cj=1" /></noscript>
                    {/* End Comscore */}

                    {/* <!-- Google Tag Manager (noscript) --> */}
                    <noscript key="gtm-noscript"><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5F9P7H3"
                    height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
                    {/* <!-- End Google Tag Manager (noscript) --> */}

                    {/* <!-- Start Alexa Certify Javascript --> */}
                    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
                        _atrk_opts = { atrk_acct:"8oNJt1FYxz20cv", domain:"m.rctiplus.com",dynamic: true};
                        (function() { var as = document.createElement('script'); as.type = 'text/javascript'; as.async = true; as.src = "https://certify-js.alexametrics.com/atrk.js"; var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(as, s); })();
                    ` }}></script>
                    <noscript><img src="https://certify.alexametrics.com/atrk.gif?account=8oNJt1FYxz20cv" style={{ display: 'none' }} height="1" width="1" alt="" /></noscript>
                    {/* <!-- End Alexa Certify Javascript --> */}
                </Head>
                <script async type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
                {/* <script src="//dl.conviva.com/mnc-test/jwplayer/stable/conviva.js"></script> */}

                {/* <!-- DO NOT touch the following DIV --> */}
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `
                    !function(q,g,r,a,p,h,js) {
                        if(q.qg)return;
                        js = q.qg = function() {
                        js.callmethod ? js.callmethod.call(js, arguments) : js.queue.push(arguments);
                        };
                        js.queue = [];
                        p=g.createElement(r);p.async=!0;p.src=a;h=g.getElementsByTagName(r)[0];
                        h.parentNode.insertBefore(p,h);
                    } (window,document,'script','//cdn.qgr.ph/qgraph.c63c2960bf562e9ec2de.js');
                ` }}></script>  

                {this.props.pages.loading ? (
                    <div className={'default-loader ' + (this.props.pages.fade ? 'loader-fade' : '')}>
                        <div className={'loader'}>
                            <Spinner color="danger" />
                        </div>
                    </div>
                ) : <div></div>}

                <div style={{ overflowX: 'hidden', height: '100%', marginTop: 0, paddingBottom: (this.platform && (this.platform == 'android' || this.platform == 'ios')) ? '0 !important' : '' }} id="wr" className="wrapper has-text-centered">{this.props.children}</div>
                {this.platform && (this.platform == 'android' || this.platform == 'ios') ? (<script src="/static/js/fontawesome.js" crossOrigin="anonymous"></script>) : (process.env.UI_VERSION == '2.0' ? (this.props.hideFooter || this.props.pages.hide_footer ? null : <Footer_v2 />) : (<Footer />))}
            </div>
        )
    }

}

export default connect(state => state, {
    ...actions,
    ...pageActions,
    ...userActions
})(withRouter(Default_v2));
