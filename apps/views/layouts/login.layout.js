/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';

//import custom components
import { CONFIG, PATH } from '@config/config';

//load reactstrap
import { Container, Row, Col } from 'react-bootstrap';

//load other components
//import Footer from '@components/backend/footer/login.footer';

//import scss module parts
import Styles from '@includes_sass_module/components/layouts/login.module.scss';

class Default extends React.Component {
    static getStaticProps() {
        return {CONFIG, PATH};
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <Head>
                        <title>{this.props.title}</title>
                        <meta charSet="utf-8" />
                        <meta name="theme-color" content="#171717" />
                        <meta name="msapplication-TileColor" content="#171717" />
                        <meta name="msapplication-navbutton-color" content="#171717" />
                        <meta name="apple-mobile-web-app-status-bar-style" content="#171717" />
                        <meta name="mobile-web-app-capable" content="yes" />
                        <meta name="apple-mobile-web-app-capable" content="yes" />
                        <link rel="icon" href="/static/favicon.ico" />
                    </Head>
                    <div className={ 'wrapper has-text-centered ' + Styles.wrapper_login }>{this.props.children}</div>
                </div>
        );
    }
}

export default withRouter(Default);