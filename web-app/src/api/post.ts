import service from "../util/request";


export function listPostVo()  {
	return service({
		url: "/post/listVo",
		method: "GET"
	})
}

export function getPostById(id: string | undefined) {
	return service({
		url: `/post/getById/${id}`,
		method: "GET"
	})
}

export function insertPost(post: Post) {
	return service({
		url: "/post/insert",
		method: "POST",
		data: post
	})
}

export function listTag() {
	return service({
		url: "/postTag/list",
		method: "GET"
	})
}

export function listSort() {
	return service({
		url: "/postSort/list",
		method: "GET"
	})
}
