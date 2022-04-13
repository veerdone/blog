import axios from "axios";
import {message} from "antd";

const service = axios.create({
	baseURL: "/api",
	timeout: 10000
});

service.interceptors.request.use(res => {
	if (res.headers) {
		res.headers["account"] = "1595557109";
	}
	return res
});

service.interceptors.response.use(res => {
	return res;
}, error => {
	if (error) {
		const {data} = error.response;
		message.error(data.message);
	}
	return error.response
});

export default service;
