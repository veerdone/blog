import React, {useEffect, useState} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Space, Tag} from "antd";
import {listSort, pagePostVoByQuery} from "@/api/post";


const PostList: React.FC = () => {
	const [sortList, setSortList] = useState<Sort[]>([]);

	const getSort = async () => {
		const data: any = await listSort();
		setSortList(data.list);
	};

	const getPost = async (param: any) => {
		const data: any = await pagePostVoByQuery({
			startPage: param.current,
			pageSize: param.pageSize,
			...param
		});
		return data;
	};

	useEffect(() => {
		getSort();
	}, []);

	const columns: ProColumns<PostVo>[] = [
		{
			dataIndex: "postId",
			valueType: "index",
			width: 80
		},
		{
			title: "文章标题",
			dataIndex: "postTitle",
			copyable: true,
			ellipsis: true
		},
		{
			title: "浏览量",
			dataIndex: "postViews",
			valueType: "digit"
		},
		{
			title: "点赞量",
			dataIndex: "postLikes",
			valueType: "digit"
		},
		{
			"title": "创建时间",
			dataIndex: "createTime",
			valueType: "dateTime"
		},
		{
			title: "状态",
			dataIndex: "status",
			valueEnum: {
				0: {text: "公开", status: "Success"},
				1: {text: "仅自己可见", status: "Default"},
				2: {text: "审核中", status: "Processing"},
				3: {text: "审核失败", status: "Error"},
				4: {text: "全部", status: "Default"},
			}
		},
		{
			title: "分类",
			dataIndex: "sortId",
			render: (_, entity) => (
				<Space>
					{sortList.filter(sort => sort.sortId == entity.sortId)
						.map(sort => <Tag key={sort.sortId}>{sort.sortName}</Tag>)}
				</Space>
			)
		},
		{
			title: "标签",
			dataIndex: "tags",
			render: (_, entity) => (
				<Space>
					{entity.tags.map(tag => <Tag key={tag.tagId}>{tag.tagName}</Tag>)}
				</Space>
			)
		}
	];

	return (
		<ProTable columns={columns}
				  rowKey={"postId"}
				  pagination={{pageSize: 10}}
				  request={async (params, sort, filter) => {
					  const data: any = await getPost(params);
					  return {
						  data: data?.list,
						  success: data?.status === 200,
						  total: data?.total
					  }
				  }}
		/>
	)
};

export default PostList
