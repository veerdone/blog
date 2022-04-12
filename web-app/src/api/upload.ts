import service from "@/util/request";

export function uploadImage(image: any) {
	const formData = new FormData();
	formData.append("file", image);
	return service({
		url: "/file/upload/image",
		method: "POST",
		data: formData
	})
}

export function deleteImage(filename: string | undefined) {
	if (filename === undefined) {
		return
	}
	return service({
		url: "/file/delete/image",
		method: "GET",
		params: {
			filename: filename
		}
	})
}
