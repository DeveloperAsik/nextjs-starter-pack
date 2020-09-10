/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
                <Html lang="en">
                    <Head></Head>
                    <body>
                        <Main />
                        <NextScript />  
                        <script src="/static/assets/packages/dependencies/jquery/jquery-1.12.4.js"></script>
                        <script src="/static/assets/packages/dependencies/jquery/ui/jquery-ui.js"></script>
                        <script type="text/javascript" src="/public/assets/media/js/global.js"></script>
                    </body>
                </Html>
                )
    }
}

export default MyDocument
