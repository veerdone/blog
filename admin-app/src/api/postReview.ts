import service from "@/service";

export function pagePostReviewByQuery(query: any) {
	return service({
		url: "/postReview/pageByQuery",
		method: "POST",
		data: {...query}
	})
}
