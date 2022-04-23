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
