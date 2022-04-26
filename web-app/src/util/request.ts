import axios from "axios";
import {message} from "antd";
import Cookies from "js-cookie";

const service = axios.create({
	baseURL: "/api",
	timeout: 10000
});

service.interceptors.request.use(res => {
	const account = Cookies.get("account");
	if (res.headers && account) {
		res.headers["account"] = account;
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
