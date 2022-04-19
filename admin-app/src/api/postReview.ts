import service from "@/service";

export function pagePostReviewByQuery(query: any) {
	return service({
		url: "/postReview/pageByQuery",
		method: "POST",
		data: {...query}
	})
}

export function updatePostReview(postReview: any) {
	return service({
		url: "/postReview/updateById",
		method: "PUT",
		data: {...postReview}
	})
}
