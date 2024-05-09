import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
	request.url = import.meta.env.VITE_BASE_URL + request.url;

	request.headers['Authorization'] = "my token";

	return request;
});


export default axiosInstance;