/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {
    FETCH_TOKENS_REQUEST,
    FETCH_TOKENS_SUCCESS,
    FETCH_TOKENS_APPEND_SUCCESS,
    FETCH_TOKENS_FAILURE
} from '@modules_redux_actions/tokensActions';

const initialState = {
    request_status: '',
    data: null,
    error: null
};

const tokensReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKENS_REQUEST:
            return {...state, request_status: 'REQUESTING'};
            
        case FETCH_TOKENS_APPEND_SUCCESS:
            const data = state.data;
            Array.prototype.push.apply(data,action.payload);
            // append tokens baru ke variabel data: action.payload
            append(data, action.payload);
            return { ...state, request_status: '', data: data };

        case FETCH_TOKENS_SUCCESS:
            return {...state, request_status: '', data: action.payload};

        case FETCH_TOKENS_FAILURE:
            return {...state, request_status: 'ERROR'};

        default:
            return state;
}
};

export default tokensReducer;