import {getCookie} from "@/util/cookie";
import service from "@/util/request";

export function getCurrentUser() {
	const account = getCookie("account");
	return service({
		url: "/user/getByAccount",
		params: {
			account: account
		},
		method: "GET"
	})
}

export function loginByAccount(user: any) {
	return service({
		url: "/user/loginByAccount",
		method: "POST",
		data: user
	})
}

export function loginByTelephone(user: any) {
	return service({
		url: "/user/loginByTelephone",
		method: "POST",
		data: user
	})
}

export function getUserByUsername(username: string) {
	return service({
		url: "/user/getByName",
		method: "GET",
		params: {
			username: username
		}
	})
}

export function insertUser(user: any) {
	return service({
		url: "/user/insert",
		method: "POST",
		data: user
	})
}
