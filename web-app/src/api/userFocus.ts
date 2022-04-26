import service from "@/util/request";

export  function listUserFocusVo(userId: string) {
	return service({
		url: "/userFocus/listVoByEntity",
		method: "POST",
		data: {
			userId: userId
		}
	});
}

export function deleteById(focusId: string) {
	return service({
		url: `/userFocus/deleteById/${focusId}`,
		method: "DELETE"
	})
}

export function insert(userFocus: any) {
	return service({
		url: "/userFocus/insert",
		method: "POST",
		data: userFocus
	})
}

export function getByEntity(userFocus: any) {
	return service({
		url: "/userFocus/getByEntity",
		method: "POST",
		data: userFocus
	})
}
