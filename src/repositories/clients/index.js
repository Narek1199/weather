import axios from 'axios';

/** Default config for axios instance */
let config = {
	baseURL: process.env.REACT_APP_OPEN_WEATHER_URL,
};

/** Creating the instance for axios */
const axiosClient = axios.create(config);

/** Auth token interceptors */
const authInterceptor = (config) => {
	/** TODO: Add auth token */

	return config;
};

/** logger interceptors */
const loggerInterceptor = (config) => {
	/** TODO */

	return config;
};

/** Adding the request interceptors */
axiosClient.interceptors.request.use(authInterceptor);
axiosClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
axiosClient.interceptors.response.use(
	(response) => {
		/** TODO: Add any response interceptors */
		return response;
	},
	async (error) => {
		/** TODO: Do something with response error */
	},
);

export default axiosClient;