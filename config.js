/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var system_env = process.env.APP_ENV;

var base_url = '';
if (system_env === 'prod') {
    base_url = process.env.APP_API_URL_PROD;
} else if (system_env === 'rc') {
    base_url = process.env.APP_API_URL_RC;
} else if (system_env === 'dev') {
    base_url = process.env.APP_API_URL_DEV;
}

var api_url = {};
if (system_env === 'prod') {
    api_url = process.env.APP_API_URL_PROD;
} else if (system_env === 'rc') {
    api_url = process.env.APP_API_URL_RC;
} else if (system_env === 'dev') {
    api_url = process.env.APP_API_URL_DEV;
}

var social_media_login = {
    fb: process.env.FB_LOGIN_ID,
    g: process.env.G_ID
};

export const DATABASE = {
    _HOST: 'localhost',
    _USER: 'pmauser',
    _PASS: 'P@ssw0rd',
    _DB: 'dasawisma'
};

export const API = {
    __BASE_API_URL: api_url
};

export const CONFIG = {
    __APP_URL: base_url,
    __APP_ENV: system_env,
    __APP_NAME: process.env.APP_NAME,
    __APP_PLATFORM: process.env.APP_PLATFORM,
    __APP_TITLE: process.env.APP_DEFAULT_TITLE,
    __APP_SOCIAL_MEDIA_LOGIN: social_media_login 
};

export const PATH = {
    __static_img_logo: '/public/assets/images/logo/rctiplus/',
    __static_btn_img: '/public/assets/images/btn-img/'
};
