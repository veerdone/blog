import service from "@/service";

export function pageLoginHistoryByQuery(query: any) {
	return service({
		url: "/loginHistory/pageByQuery",
		method: "POST",
		data: {...query}
	})
}
