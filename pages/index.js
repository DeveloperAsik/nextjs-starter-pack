import React from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';

//import configuration variable
import { CONFIG } from '@config/config';

//import dependencies libaries
import $ from "jquery";
import { Tabs, Tab, Nav, Container, Row, Col } from 'react-bootstrap';

//load layout
import Layout from "@layouts/home.layout.js";

//import scss module parts
import Styles from '@includes_sass_module/frontend/homepage/index.module.scss';

class Index extends React.Component {
    static getStaticProps() {
        return {CONFIG};
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout title={CONFIG.__APP_TITLE}>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="theme-color" content="#171717" />
                    <meta name="msapplication-TileColor" content="#171717" />
                    <meta name="msapplication-navbutton-color" content="#171717" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#171717" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                </Head>
                <div className={ Styles.row_all }>
                    <h3>All Videos</h3>
                    <p>Index.js is load successfully</p>
                    <hr/>
                </div>
            </Layout>
        )
    }
}
export default withRouter(Index);