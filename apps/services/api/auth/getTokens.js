/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//import axios from '@services/index';
import axios from '../../index';
import { API } from '@config/config';

export const getTokens = (successCallback = (response) => {}, errorCallback = (error) => {}) => {
    const base_api_url = 'https://api.dasawisma.local/generate-token-access';
    return axios({
        method: 'get',
        url: base_api_url
    }).then(response => {
        successCallback(response.data[0].data.category);
    }).catch(error => {
        errorCallback(error);
    });
};