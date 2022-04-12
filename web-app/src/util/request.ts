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
}, error => {
});

export default service;
