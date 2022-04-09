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
