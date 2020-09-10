/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { getTokens } from '@services/api/auth/getTokens';

/*
 *----------------------------------------------------------------------------
 * fetching data tokens start here
 *----------------------------------------------------------------------------
 */
const fetchTokensRequest = () => {
    return {
        type: FETCH_TOKENS_REQUEST
    };
};

const fetchTokensSuccess = tokens => {
    return {
        type: FETCH_TOKENS_SUCCESS,
        payload: tokens
    };
};

const fetchTokensAppendSuccess = tokens => {
    return {
        type: FETCH_TOKENS_APPEND_SUCCESS,
        payload: tokens
    };
};

const fetchTokensFailure = error => {
    return {
        type: FETCH_TOKENS_FAILURE,
        payload: error
    };
};

export const fetchTokens = () => {
    return dispatch => {
        dispatch(fetchTokensRequest());
        setTimeout(() => {
            getTokens(
            response => {
                dispatch(fetchTokensSuccess(response.data));
            },
            error => {
                dispatch(fetchTokensFailure(error));
            });
        }, 1000);
    };
};

export const fetchAppendTokens = () => {
    // dispatch data FETCH_APPEND_TOKENS
    return dispatch => {
        dispatch(fetchTokensRequest());
        setTimeout(() => {
            getTokens(
            response => {
                dispatch(fetchTokensAppendSuccess(response.data));
            },
            error => {
                dispatch(fetchTokensFailure(error));
            });
        }, 1000);
    };
};

export const FETCH_TOKENS_REQUEST = 'FETCH_TOKENS_REQUEST';
export const FETCH_TOKENS_SUCCESS = 'FETCH_TOKENS_SUCCESS';
export const FETCH_TOKENS_FAILURE = 'FETCH_TOKENS_FAILURE';
export const FETCH_TOKENS_APPEND_SUCCESS = 'FETCH_TOKENS_APPEND_SUCCESS';

/*
 *----------------------------------------------------------------------------
 * fetching data tokens end here
 *----------------------------------------------------------------------------
 */
