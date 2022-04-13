import Cookies from "js-cookie";

export function setCookie(key: string, value: any) {
	Cookies.set(key, value)
}

export function getCookie(key: string): any | undefined{
	return Cookies.get(key)
}

export function isLogin(): boolean {
	return Cookies.get("account") !== undefined;
}

export function setCookieExpire(key: string, value: any) {
	Cookies.set(key, value, {expires: 1})
}
