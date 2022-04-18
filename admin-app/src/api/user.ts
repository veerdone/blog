import service from "@/service";

export function loginByAccount(value: LoginParams) {
	return service({
		url: "/user/loginByAccount",
		method: "POST",
		data: {
			...value
		}
	})
}

export function loginByTelephone(value: LoginParams) {
	return service({
		url: "/user/loginByTelephone",
		method: "POST",
		data: {...value}
	})
}
