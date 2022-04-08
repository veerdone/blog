import service from "@/request";


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
