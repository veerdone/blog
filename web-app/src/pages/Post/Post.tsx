import React, {useEffect, useState} from "react";
import {useParams} from "umi";
import ProCard from "@ant-design/pro-card";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {getPostById} from "@/api/post";

interface Param {
	id: string
}

const Post:React.FC = () => {
	const params: Param = useParams();
	const [post, setPost] = useState<Post>();

	const getPost = async () => {
		const {data} = await getPostById(params.id);
		setPost(data.data)
	};

	useEffect(() => {
		getPost();
	}, []);

	const isRender = () => {
		if (post) {
			getPost();
			return <ReactMarkdown children={post.postContent}/>
		}
		return <ReactMarkdown children={post.postContent}/>
	};

	return (
		<ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
			<ProCard>
				{isRender()}
			</ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
		</ProCard>
	)
};

export default Post;
