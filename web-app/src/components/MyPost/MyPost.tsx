import React, {useEffect, useState} from "react";
import {Skeleton, Table, Pagination} from 'antd';
import {pageListVoByCurrentUserId} from "@/api/post";
import {currentUserInfo} from "@/pages";

const {Column} = Table;

const MyPost = () => {
	const [loading, setLoading] = useState(false);
	const [postList, setPostList] = useState<PostVo[]>([]);
	const [total, setTotal] = useState(0);
	const user = currentUserInfo();

	const getPost = async (page: number = 1, pageSize: number = 10) => {
		setLoading(true);
		const {data} = await pageListVoByCurrentUserId(user?.userId, page, pageSize);
		setPostList(data.list);
		setTotal(data.total);
		setLoading(false);
	};

	useEffect(() => {
		getPost();
	}, []);


	return (
		<>
			{loading && (
				<Skeleton active/>
			)}
			{!loading && (
				<>
					<Table dataSource={postList}
						   pagination={{pageSize: 2}}
						   rowKey={"postId"}>
						<Column title={"标题"} dataIndex={"postTitle"} key={"postTitle"}/>
						<Column title={"浏览量"} dataIndex={"postViews"} key={"postViews"}/>
						<Column title={"点赞数"} dataIndex={"postLikes"} key={"postLikes"}/>
						<Column title={"创建时间"} dataIndex={"createTime"} key={"createTime"}/>
					</Table>
				</>
			)}
		</>
	)
};

export default MyPost;
