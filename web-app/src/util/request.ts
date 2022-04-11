import axios from "axios";
import {message} from "antd";

const service = axios.create({
	baseURL: "/api",
	timeout: 10000
});

service.interceptors.request.use(res => {
	res.headers["account"] = "1595557109";
	return res
}, error => {

});

service.interceptors.response.use(res => {
	return res;
}, error => {
	if (error && error.response) {
		switch (error.response.status) {
			case 401:
				message.error("未登录!");
		}
	}
	return Promise.reject(error)
});

export default service;
