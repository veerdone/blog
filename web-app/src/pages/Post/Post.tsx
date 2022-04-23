import React, {useEffect, useState} from "react";
import {useParams, Helmet} from "umi";
import ProCard from "@ant-design/pro-card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {getPostById} from "@/api/post";
import Comment from "@/components/comment/Comment";
import {Avatar, BackTop, Button, Card} from "antd";
import {getUserById} from "@/api/user";


const Code = {
	code({ node, inline, className, children, ...props }: any) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			// @ts-ignore
			<SyntaxHighlighter style={github} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
		) : (
			<code className={className} {...props} />
		)
	},
	img(props: any) {
		return <img {...props} style={{maxWidth: "100%", maxHeight: 400}}  alt={""}/>
	}
};

type Param = {
	id: string
}

const Post = () => {
	const params = useParams<Param>();
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
		updateTime: "",
		userId: ""
	});
	const [author, setAuthor] = useState<any>({});
	const [loading, setLoading] = useState(false);

	const getPost = async () => {
		setLoading(true);
		const {data} = await getPostById(params.id);
		setPost(data.data);
		getAuthor(data?.data?.userId);
		setLoading(false);
	};

	const getAuthor = async (userId: string) => {
		const {data} = await getUserById(userId)
		setAuthor(data?.data);
	}

	useEffect(() => {
		getPost();
	}, []);

	return (
		<ProCard>
			<BackTop visibilityHeight={1000}>
				<div style={{width: 40, height: 40, backgroundColor: "#1088e9", color: "white", lineHeight: "40px", textAlign: "center", fontSize: "14px", borderRadius: 20}}>
					UP
				</div>
			</BackTop>
			<Helmet>
				<title>{post.postTitle}</title>
			</Helmet>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}>
				<Card actions={[
					<Button type={"primary"}>关注</Button>
				]}>
					<Card.Meta avatar={<Avatar src={author?.icon} />} title={author?.username}
								description={post?.createTime + "    " + post?.postViews + "阅读"}
					/>
				</Card>
			</ProCard>
			<ProCard loading={loading}>
				<ReactMarkdown components={Code}
				children={post.postContent} remarkPlugins={[remarkGfm]}/>


				<Comment postId={params.id}/>
			</ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
		</ProCard>
	)
};

export default Post;
