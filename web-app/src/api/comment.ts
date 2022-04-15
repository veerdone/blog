import service from "@/util/request";

export function getCommentList(postId: string) {
	return service({
		url: "/postComment/listByPostId",
		method: "GET",
		params: {
			postId: postId
		}
	})
}

export function insertComment(comment: any) {
	return service({
		url: "/postComment/insert",
		method: "POST",
		data: comment
	})
}

export function deleteCommentById(commentId: string) {
	return service({
		url: `/postComment/deleteById/${commentId}`,
		method: "DELETE"
	})
}
