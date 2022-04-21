import service from "@/service";

export function loginByAccount(value: LoginParams) {
	return service({
		url: "/admin/loginByAccount",
		method: "POST",
		data: {
			...value
		}
	})
}

export function loginByTelephone(value: LoginParams) {
	return service({
		url: "/admin/loginByTelephone",
		method: "POST",
		data: {...value}
	})
}

export function listAdminUser() {
	return service({
		url: "/admin/list",
		method: "GET"
	})
}

export function insertAdmin(user: any) {
	return service({
		url: "/admin/insert",
		method: "POST",
		data: user
	})
}

export function pageUserByQuery(query: any) {
	return service({
		url: "/user/pageByQuery",
		method: "POST",
		data: {...query}
	})
}

export function updateUserById(user: any) {
	return service({
		url: "/user/updateById",
		method: "PUT",
		data: user
	})
}

export function getUserById(userId: string) {
	return service({
		url: `/user/getById/${userId}`,
		method: "GET"
	})
}
