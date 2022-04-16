import React, {useEffect, useState} from "react";
import {Button, message, Modal, Popconfirm, Skeleton, Space, Table, Tag} from 'antd';
import {deletePostById, listSort, pageListVoByCurrentUserId} from "@/api/post";
import {currentUserInfo} from "@/pages";
import Write from "@/pages/Post/Write";

const {Column} = Table;

const MyPost = () => {
	const [loading, setLoading] = useState(false);
	const [postList, setPostList] = useState<PostVo[]>([]);
	const [pagination, setPagination] = useState({total: 0, current: 1, pageSize: 10});
	const [sortList, setSortList] = useState<Sort[]>([]);
	const user = currentUserInfo();

	const getPost = async (page: number = pagination.current, pageSize: number = pagination.pageSize) => {
		setLoading(true);
		const {data} = await pageListVoByCurrentUserId(user?.userId, page, pageSize);
		setPostList(data.list);
		setPagination({total: data.total, current: page, pageSize: pageSize});
		setLoading(false);
	};

	const getSort = async () => {
		const {data} = await listSort();
		setSortList(data.list);
	};

	useEffect(() => {
		getSort();
		getPost();
	}, []);

	const [isShowChange, setIsShowChange] = useState(false);
	const [postVo, setPostVo] = useState<PostVo>({
		createTime: "",
		postContent: "",
		postId: "",
		postLikes: "",
		postTags: [],
		postTitle: "",
		postViews: "",
		sortId: "",
		status: "",
		tags: [],
		titlePicture: "",
		updateTime: "",
		userId: ""
	});

	const clickChange = (value :any) => {
		setPostVo(value);
		setIsShowChange(true);
	};

	const handleDelete = async (postId: string) => {
		const {data} = await deletePostById(postId);
		if (data.status === 200) {
			message.success("删除成功");
			getPost();
		}
	};

	return (
		<>
			{loading && (
				<Skeleton active/>
			)}
			{!loading && (
				<>
					<Table dataSource={postList}
						   pagination={{...pagination, onChange: getPost}}
						   rowKey={"postId"}>
						<Column title={"标题"} dataIndex={"postTitle"} key={"postTitle"}/>
						<Column title={"浏览量"} dataIndex={"postViews"} key={"postViews"}/>
						<Column title={"点赞数"} dataIndex={"postLikes"} key={"postLikes"}/>
						<Column title={"创建时间"} dataIndex={"createTime"} key={"createTime"}/>
						<Column title={"状态"} dataIndex={"status"} key={"status"} render={status => (
							<>
								{status === 0 && <Tag color={"green"}>公开</Tag>}
								{status === 1 && <Tag color={"blue"} >仅自己可见</Tag>}
								{status === 2 && <Tag color={"red"} >审核中</Tag>}
							</>
						)} />
						<Column title={"分类"} dataIndex={"sortId"} key={"sortId"} render={sortId => (
							<>
								{sortList.filter(sort=> {return sort.sortId === sortId})
									.map(sort => {
										return <Tag color={"default"}>{sort.sortName}</Tag>
									})}
							</>
						)}/>
						<Column title={"标签"} dataIndex={"tags"} key={"tags"} render={tags => (
							<>
								{tags.map((tag : Tag) => {
									return <Tag color={"default"} key={tag.tagId}>{tag.tagName}</Tag>
								})}
							</>
						)} />
						<Column title={"选项"} key={"postId"} render={(_: any, value: any) => (
							<Space size={"middle"}>
								<Button type={"primary"} size={"small"} onClick={() => clickChange(value)}>修改</Button>
								<Popconfirm title={"是否确认删除?"} okText={"删除"} cancelText={"取消"}
									onConfirm={() => handleDelete(value.postId)}>
									<Button danger size={"small"}>删除</Button>
								</Popconfirm>
							</Space>
						)}/>
					</Table>
				</>
			)}
			<Modal visible={isShowChange} onCancel={() => setIsShowChange(false)}
						   width={1200} footer={null} destroyOnClose={true} style={{height: 1000}}>
			<Write postVo={postVo} closeChange={setIsShowChange} reFlush={getPost}/>
		</Modal>
		</>
	)
};

export default MyPost;
