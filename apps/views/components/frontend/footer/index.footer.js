/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';

//import configuration variable
import { CONFIG } from '@config/config';

//import dependencies libaries
import $ from "jquery";
import { Container, Row, Col } from 'reactstrap';

//import scss module parts
import Styles from '@includes_sass_module/frontend/footer/footer.module.scss';

class Index extends React.Component {
    static getStaticProps() {
        return {CONFIG};
    }

    render() {
        const isOpen = false;
        const setIsOpen = false;
        const toggle = () => setIsOpen(!isOpen);
        return (
            <Container className={ Styles.container_footer } fluid={true}>
                    <Col xs="6"></Col>
                    <Col xs="3">
                        <div className={ Styles.our_links }><a href="/about">About</a></div>
                        <div className={ Styles.our_links }><a href="/contact">Contact</a></div>
                        <div className={ Styles.our_links }><a href="/sitemap">Sitemap</a></div>
                        <div className={ Styles.our_links }><a href="/gallery">Gallery</a></div>
                    </Col>
                    <Col xs="3">
                        <div className={ Styles.our_links }><a href="/about">Facebook</a></div>
                        <div className={ Styles.our_links }><a href="/contact">Twitter</a></div>
                        <div className={ Styles.our_links }><a href="/sitemap">Youtube</a></div>
                        <div className={ Styles.our_links }><a href="/gallery">Linkedin</a></div>
                    </Col>
            </Container> 
        )
    }
}
export default withRouter(Index);