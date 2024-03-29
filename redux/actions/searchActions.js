import ax from 'axios';
import { DEV_API } from '../../config';
import { getCookie, getVisitorToken, checkToken } from '../../utils/cookie';

const axios = ax.create({ baseURL: DEV_API + '/api' });

axios.interceptors.request.use(async (request) => {
    await checkToken();
    const accessToken = getCookie('ACCESS_TOKEN');
    request.headers['Authorization'] = accessToken == undefined ? getVisitorToken() : accessToken;
    return request;
});

const setShowMoreAllowed = allowed => {
    return dispatch => dispatch({
        type: 'SET_SHOW_MORE_ALLOWED',
        allowed: allowed
    });
};

const setActiveTab = tab => {
    return dispatch => dispatch({
        type: 'SET_ACTIVE_TAB',
        tab: tab
    });
};

const search = index => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/v1/search/${index}`);
            if (response.data.status.code === 0) {
                dispatch({
                    type: 'SEARCH',
                    data: response.data.data, 
                    meta: response.data.meta, 
                    status: response.data.status
                });
                resolve(response);
            }
            else {
                reject(response);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

const searchCategory = (q, category, page = 1, length = 9) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/v1/search/${category}?q=${q}&page=${page}&length=${length}`)
            if (response.status === 200 && response.data.status.code === 0) {
                dispatch({
                    type: 'SEARCH_RESULTS_CATEGORY',
                    show_more_allowed: response.data.data.length >= length,
                    category: category,
                    results: response.data.data
                });
                resolve(response);
            }
            else {
                reject(response);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

const searchAllCategory = (q, page = 1, length = 9) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const responses = await Promise.all([
                axios.get(`/v1/search/program?q=${q}&page=${page}&length=${length}`),
                axios.get(`/v1/search/episode?q=${q}&page=${page}&length=${length}`),
                axios.get(`/v1/search/extra?q=${q}&page=${page}&length=${length}`),
                axios.get(`/v1/search/clip?q=${q}&page=${page}&length=${length}`),
                axios.get(`/v1/search/photo?q=${q}&page=${page}&length=${length}`)
            ]);

            let show_more_allowed = {
                program: false,
                episode: false,
                extra: false,
                clip: false,
                photo: false
            };
            if (responses[0].status === 200 && responses[0].data.status.code === 0) {
                show_more_allowed['program'] = responses[0].data.data.length >= length;
            }
            if (responses[1].status === 200 && responses[1].data.status.code === 0) {
                show_more_allowed['episode'] = responses[1].data.data.length >= length;
            }
            if (responses[2].status === 200 && responses[2].data.status.code === 0) {
                show_more_allowed['extra'] = responses[2].data.data.length >= length;
            }
            if (responses[3].status === 200 && responses[3].data.status.code === 0) {
                show_more_allowed['clip'] = responses[3].data.data.length >= length;
            }
            if (responses[4].status === 200 && responses[4].data.status.code === 0) {
                show_more_allowed['photo'] = responses[4].data.data.length >= length;
            }

            dispatch({
                type: 'SEARCH_RESULTS',
                results: responses,
                meta: responses[0].data ? responses[0].data.meta : {},
                query: q,
                search_show_more_allowed: show_more_allowed
            });
            resolve(responses);
        }
        catch (error) {
            reject(error);
        }
    });
};

const searchByGenre = (genreId, category, page = 1, length = 10) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/v1/search/${genreId}/${category}?page=${page}&length=${length}`);
            if (response.data.status.code === 0) {
                dispatch({
                    type: 'SEARCH_BY_GENRE',
                    data: response.data.data, 
                    meta: response.data.meta, 
                    status: response.data.status
                });
                resolve(response);
            }
            else {
                reject(response);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

const getRecommendation = (page = 1, length = 10) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`/v1/recommendation?page=${page}&length=${length}`);
            if (response.status === 200 && response.data.status.code === 0) {
                dispatch({
                    type: 'GET_RECOMMENDATION',
                    data: response.data.data, 
                    meta: response.data.meta, 
                    status: response.data.status
                });
                resolve(response);
            }
            else {
                reject(response);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

const getRelatedProgram = (id = null, page = 1, length = 10) => {
    return dispatch => new Promise(async (resolve, reject) => {
        try {
            let queryString = `page=${page}&length=${length}`;
            if (id !== null) {
                queryString += `&id=${id}`;
            }
            const response = await axios.get(`/v1/related?${queryString}`);
            if (response.data.status.code === 0) {
                dispatch({
                    type: 'GET_RELATED_PROGRAM',
                    data: response.data.data, 
                    meta: response.data.meta, 
                    status: response.data.status
                });
                resolve(response);
            }
            else {
                reject(response);
            }
        }
        catch (error) {
            reject(error);
        }
    });
};

export default {
    search,
    searchByGenre,
    getRecommendation,
    getRelatedProgram,
    searchAllCategory,
    searchCategory,
    setActiveTab
    // setShowMoreAllowed
};