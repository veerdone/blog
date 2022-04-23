import service from "@/util/request";

export function getCurrentUser() {
	return service({
		url: "/user/getCurrentUser",
		method: "GET"
	})
}

export function updateUserById(user: any) {
	return service({
		url: "/user/updateById",
		method: "PUT",
		data: user
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

export function updateUserByQuery(user: any) {
	return service({
		url: "/user/updateByQuery",
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
