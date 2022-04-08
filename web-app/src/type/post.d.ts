declare interface Post {
	postId?: string,
	postTitle: string,
	postContent: string,
	userId: string,
	postViews?: string,
	postLikes?: string,
	createTime?: string,
	updateTIme?: string,
	status?: string,
	sortId: string,
	titlePicture?: string,
	postTags: string[]
}

declare interface PostVo {
	postId?: string,
	postTitle: string,
	postContent: string,
	userId: string,
	postViews?: string,
	postLikes?: string,
	createTime?: string,
	updateTIme?: string,
	status?: string,
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
