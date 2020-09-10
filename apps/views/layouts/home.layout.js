/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

//import custom components
import { CONFIG, PATH } from '@config/config';

//load reactstrap
import { Container, Row, Col } from 'react-bootstrap';

//load other components
import Navbar from '@components/frontend/navbar/index.navbar';
import Footer from '@components/frontend/footer/index.footer';

//import scss module parts
import Styles from '@includes_sass_module/components/layouts/home.module.scss';

//import api redux
import { fetchTokens } from '@modules_redux_actions/tokensActions';

class Home extends React.Component {
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
                    <Navbar />
                    <Container className={ 'themed-container ' + Styles.container } fluid={true}>
                        <Col xs="12">
                        <div className={ 'wrapper has-text-centered ' + Styles.wrapper_content }>
                            <div className="contents">{this.props.children}</div>
                        </div>
                        </Col>
                    </Container>
                    <Footer />
                </div>
                );
    }
}

export default withRouter();
//const mapStateToProps = state => ({
//        tokens: state.tokens
//    });
//const mapDispatchToProps = dispatch => {
//    return {dispatch};
//};
//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));