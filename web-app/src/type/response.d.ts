declare interface BaseResult {
	status: number,
	message: string
}

declare interface ObjectResult {
	status: number,
	message: string,
	data: object
}

declare interface ListResult<T> {
	status: number,
	message: string,
	total: number,
	list: Array<T>
}
