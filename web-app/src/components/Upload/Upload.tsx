import React from "react";
import {Button, Upload} from "antd";
import {deleteImage as del} from "@/api/upload";
import {UploadChangeParam} from "antd/es/upload";

const {Dragger} = Upload;

const CustomUpload = ({filename}: { filename: string }) => {

	const uploadDone = (info: UploadChangeParam) => {
		if (info.file.status === "done") {
			filename = info.file.response?.data;
		}
	};

	const deleteImage = () => {
		if (filename) {
			del(filename);
		}
	};


	return (
		<Dragger name={"file"} action={"/file/upload/image"} method={"POST"} onChange={uploadDone}
				maxCount={1} onRemove={deleteImage}>
			<Button>上传</Button>
		</Dragger>
	)
};


export default CustomUpload;
