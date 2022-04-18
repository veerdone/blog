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
	return res;
});

service.interceptors.response.use(res => {
	if (res.data) {
		return res.data;
	}
	return res;
}, error => {
	const response = error.response;
	if (response?.data?.status !== 200) {
		message.error(response?.data?.message);
	}
	return response;
});


export default service;
