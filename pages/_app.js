/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import App from 'next/app';
import { Provider } from 'react-redux';
import React from 'react';
import withRedux from 'next-redux-wrapper';
//import store from '@modules_redux/store.js';

//load css libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//load global scss
import '~/public/assets/media/scss/global.min.scss';

class MyApp extends App {

    static async getStaticProps( { Component, ctx } ) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        //Anything returned here can be accessed by the client
        return {pageProps: pageProps};
    }
    
    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps, store} = this.props;

        return (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
        );
    }
}

//makeStore function that returns a new store for every request
//const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
//export default withRedux(makeStore, {debug: false})(MyApp);
export default MyApp;