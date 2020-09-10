import React from 'react';
import Head from 'next/head';
import Router, { withRouter } from 'next/router';

//import configuration variable
import { CONFIG } from '@config/config';

//import dependencies libaries
import $ from "jquery";
import { Container, Row, Col } from 'react-bootstrap';

//import scss module parts
import Styles from '@includes_sass_module/frontend/stories/index.module.scss';

class Index extends React.Component {
    static getStaticProps() {
        return {CONFIG};
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ Styles.row_stories }>
                <h3>Stories</h3>
                <p>stories.js is load successfully</p><hr/>
            </div>
        )
    }
}
export default withRouter(Index);