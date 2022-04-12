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

export function loginByAccount(account: string, password: string) {
	const user = {
		account: account,
		password: password
	};
	return service({
		url: "/user/loginByAccount",
		method: "POST",
		data: user
	})
}

export function loginByTelephone(telephone: string, password : string) {
	const user = {
		telephone: telephone,
		password: password
	};
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

export function isUsernameExist(username: string) {
	return service({
		url: "/user/check/username",
		method: "GET",
		params: {
			username: username
		}
	})
}

export function isAccountExist(account: string) {
	return service({
		url: "/user/check/account",
		method: "GET",
		params: {
			account: account
		}
	})
}

export function isTelephoneExist(telephone: string) {
	return service({
		url: "/user/check/telephone",
		method: "GET",
		params: {
			telephone: telephone
		}
	})
}
