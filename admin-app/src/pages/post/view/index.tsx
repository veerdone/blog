import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import { useParams } from "umi";
import {getPostById} from "@/api/post";
import "md-editor-rt/lib/style.css";


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
	},[]);

	return(
		<ProCard>
			<ProCard></ProCard>
			<ProCard>
				<p>{params?.id}</p>
			</ProCard>
			<ProCard></ProCard>
		</ProCard>
	)
};


export default View;
