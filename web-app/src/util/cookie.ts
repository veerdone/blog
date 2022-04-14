import Cookies, {CookieAttributes} from "js-cookie";

export function setCookie(key: string, value: any, options? :CookieAttributes) {
	Cookies.set(key, value, options)
}

export function getCookie(key: string): any | undefined{
	return Cookies.get(key)
}

export function isLogin(): boolean {
	return Cookies.get("currentUser") !== undefined;
}

export function setCookieExpire(key: string, value: any) {
	Cookies.set(key, value, {expires: 1})
}

export function removeCookie(key: string) {
	Cookies.remove(key);
}
