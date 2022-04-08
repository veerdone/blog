import React, {useEffect, useState} from "react";
import {useParams} from "umi";
import ProCard from "@ant-design/pro-card";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {getPostById} from "@/api/post";


const Post = () => {
	const params = useParams();
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

	const getPost = async () => {
		const {data} = await getPostById(params.id);
		setPost(data.data)
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
			<ProCard>
				{<ReactMarkdown children={post.postContent}/>}
			</ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
		</ProCard>
	)
};

export default Post;
