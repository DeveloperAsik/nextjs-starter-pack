import ax from 'axios';
import { API } from '@config/config';

const axios = ax.create({ baseURL: API.__BASE_API_URL });
axios.interceptors.request.use(request => {
    return request;
});

export default axios;