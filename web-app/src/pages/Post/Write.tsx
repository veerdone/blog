import React, {useState} from "react";
import Editor from "md-editor-rt";
import {Input} from "antd";
import "md-editor-rt/lib/style.css";

const Write = () => {
	const [post, setPost] = useState<Post>({
		createTime: "",
		postContent: "",
		postId: "",
		postLikes: "",
		postTags: [],
		postTitle: "",
		postViews: "",
		sortId: "",
		status: "",
		titlePicture: "",
		updateTIme: "",
		userId: ""
	});

	return (
		<div>
			<Input placeholder={"请输入标题"}
				   onChange={(e) => setPost({...post, postTitle: e.target.value})}/>
		</div>
	)
};

export default Write;
