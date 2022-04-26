import React, {useState} from "react";
import {Button, Upload} from "antd";
import {uploadImage, deleteImage as del} from "@/api/upload";
import {RcFile} from "antd/es/upload";
import { User } from "@/type/user";

const {Dragger} = Upload;

const CustomUpload = () => {
	const [user, setUser] = useState<User>({
		account: "",
		createTime: "",
		fans: 0,
		focus: 0,
		icon: "",
		likes: 0,
		password: "",
		sex: false,
		status: false,
		telephone: "",
		userId: "",
		username: ""
	});
	const upload = async (file: RcFile) => {
		const {data} = await uploadImage(file);
		setUser({...user, icon: data.data});
		return "";
	};

	const deleteImage = () => {
		del(user.icon);
	};

	return(
		<div>
			<Upload name={"image"} action={file => upload(file)} method={"POST"}
					maxCount={1} onRemove={deleteImage}>
				<Button>上传</Button>
			</Upload>
			<Button onClick={() => console.log(user)}>test</Button>
		</div>
	)
};


export default CustomUpload;
