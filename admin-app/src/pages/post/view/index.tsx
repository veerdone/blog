import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {useParams} from "umi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {github} from "react-syntax-highlighter/dist/esm/styles/hljs";
import {getPostById} from "@/api/post";

const Code = {
	code({node, inline, className, children, ...props}: any) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			// @ts-ignore
			<SyntaxHighlighter
				style={github}
				language={match[1]}
				PreTag="div"
				{...props}
			>
				{String(children).replace(/\n$/, '')}
			</SyntaxHighlighter>
		) : (
			<code className={className} {...props}>
				{children}
			</code>
		)
	}
};

const View: React.FC = () => {
	const params: any = useParams();
	const [post, setPost] = useState<any>({});

	const getPost = async () => {
		const data: any = await getPostById(params?.id);
		if (data?.status === 200) {
			setPost(data?.data);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<ProCard>
			<ProCard colSpan={"10%"}/>
			<ProCard>
				<ReactMarkdown remarkPlugins={[remarkGfm]} components={Code}>
					{post?.postContent}
				</ReactMarkdown>
			</ProCard>
			<ProCard/>
		</ProCard>
	)
};


export default View;
