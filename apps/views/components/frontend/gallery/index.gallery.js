/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';

//import configuration variable
import { CONFIG } from '@config/config';

//import dependencies libaries
import $ from "jquery";
import { InputGroup, InputGroupAddon, Button, Input, Nav, NavItem, NavLink } from 'reactstrap';
import Slider from "react-slick";

//import scss module parts
import Styles from '@includes_sass_module/frontend/gallery/gallery.module.scss';

//import api redux
import { fetchCategories } from '@modules_redux_actions/categoriesActions';

class Index extends React.Component {
    static getStaticProps() {
        return {CONFIG};
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.dispatch(fetchCategories());
    }
    
    render() {
        //if(this.props.categories) console.log(this.props.categories);
        const settings = {
            arrows: true,
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            pauseOnDotsHover: true,
            pauseOnHover: true,
            slide: 'div',
            slidesPerRow: 1,
            swipeToSlide: true,
            swipe: true,
            dotsClass: 'slick-dots'
        };
        return (
                <div className={ Styles.gallery_container }>
                    <div className={ Styles.gallery_rows }></div>
                    <div className={ Styles.gallery_rows }></div>
                    <div className={ Styles.gallery_rows }></div>
                    <div className={ Styles.gallery_rows }></div>
                    <div className={ Styles.gallery_rows }></div>
                    <div className={ Styles.gallery_rows }></div>
                </div>
        )
    }
}
const mapStateToProps = state => ({
   categories: state.categories
});
const mapDispatchToProps = dispatch => {
    return {dispatch};
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));