import service from "@/service";


export function listSort() {
	return service({
		url: "/postSort/list",
		method: "GET"
	})
}

export function pagePostVoByQuery(query: any) {
	return service({
		url: "/post/pagePostVoByQuery",
		method: "POST",
		data: {...query}
	})
}

export function getPostById(postId: string) {
	return service({
		url: `/post/getById/${postId}`,
		method: "GET",
	})
}
