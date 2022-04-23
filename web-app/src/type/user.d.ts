declare interface User {
	userId: string,
	account: string,
	username: string,
	password: string,
	telephone: string,
	sex: boolean,
	fans?: number,
	focus?: number,
	likes?: number,
	createTime?: string,
	status?: boolean,
	icon?: string
}


export interface UserFocusVo {
	focusId: string,
	userId: string,
	userFocusId: string,
	focusTime: string,
	focusUser: User
}
