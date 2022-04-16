declare interface Post {
	postId?: string,
	postTitle: string,
	postContent: string,
	userId: string,
	postViews?: string,
	postLikes?: string,
	createTime?: string,
	updateTime?: string,
	status: string,
	sortId: string,
	titlePicture?: string,
	postTags: string[]
}

declare interface PostVo {
	postId: string,
	postTitle: string,
	postContent: string,
	userId: string,
	postViews?: string,
	postLikes?: string,
	createTime?: string,
	updateTime?: string,
	status: string,
	sortId: string,
	titlePicture?: string,
	postTags: string[],
	tags: Tag[]
}

declare interface Tag {
	tagId?: string,
	tagName: string,
	sortId: string
}

declare interface Sort {
	sortId?: string,
	sortName: string
}

declare interface IComment {
	commentId: string,
	commentContent: string,
	postId: string,
	commentCreateTime: string,
	commentType: number,
	fromUserId: string,
	fromUsername: string,
	fromUserIcon: string,
	toUserId: string,
	toUsername: string,
	toUserIcon: string,
	toCommentId: string
}
