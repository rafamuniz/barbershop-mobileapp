import axios from "react-native-axios";
import logger from "./logService";

const tokenKey = "token";
const AuthorizationKey = "Authorization";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        logger.log(error);
    }

    return Promise.reject(error);
});

function addContentTypeJSONApplication() {
    axios.defaults.headers.common["Content-Type"] = "application/json";
}

export default {
    request: axios.request,
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    patch: axios.patch,
    head: axios.head,

    addContentTypeJSONApplication,
};