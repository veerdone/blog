declare interface User {
  userId: string,
  account: string,
  username: string,
  password: string,
  telephone: string,
  sex: boolean,
  fans: number,
  focus: number,
  likes: number,
  createTime: string,
  status: boolean,
  icon: string
}

declare interface LoginParams {
	username: string,
	account: string,
	password: string
}


declare interface PostReview {
	reviewId: string,
	reviewName: string,
	reviewPostId: string,
	reviewStatus: number,
	reviewFailReason: string,
	reviewCreateTime: string,
	reviewUpdateTime: string
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
	sortId: string,
	sortName: string
}
