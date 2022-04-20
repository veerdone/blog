import React, {useEffect, useState} from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {Select, Space, Tag} from "antd";
import {listSort, pagePostVoByQuery} from "@/api/post";
import { Link } from "umi";

/**
 * 所有文章页
 * @constructor
 */
const PostList: React.FC = () => {
	const [sortList, setSortList] = useState<Sort[]>([]);

	const getSort = async () => {
		const data: any = await listSort();
		setSortList(data.list);
	};

	const getPost = async (param: any) => {
		const data: any = await pagePostVoByQuery({
			startPage: param.current,
			...param
		});
		return data;
	};

	useEffect(() => {
		getSort();
	}, []);

	const columns: ProColumns<PostVo>[] = [
		{
			title: "文章标题",
			dataIndex: "postTitle",
			copyable: true,
			ellipsis: true
		},
		{
			title: "浏览量",
			dataIndex: "postViews",
			valueType: "digit",
			width: 80,
			search: false
		},
		{
			title: "点赞量",
			dataIndex: "postLikes",
			valueType: "digit",
			width: 80,
			search: false
		},
		{
			"title": "创建时间",
			dataIndex: "createTime",
			valueType: "dateTime"
		},
		{
			title: "状态",
			dataIndex: "status",
			width: 100,
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
			hideInSearch: true,
			width: 80,
			render: (_, entity) => (
				<Space>
					{sortList.filter(sort => sort.sortId == entity.sortId)
						.map(sort => <Tag key={sort.sortId}>{sort.sortName}</Tag>)}
				</Space>
			)
		},
		{
			title: "分类",
			dataIndex: "sortId",
			hideInTable: true,
			renderFormItem: schema => {
				return (
					<Select allowClear>
						{sortList.map(sort => {
							return <Select.Option value={sort.sortId} key={sort.sortId}>{sort.sortName}</Select.Option>
						})}
					</Select>
				)
			}
		},
		{
			title: "标签",
			dataIndex: "tags",
			search: false,
			render: (_, entity) => (
				<Space>
					{entity.tags.map(tag => <Tag key={tag.tagId}>{tag.tagName}</Tag>)}
				</Space>
			)
		},
		{
			title: "操作",
			valueType: "option",
			render: (_, entity) => [
				<Link to={`/view/${entity.postId}`} key={"1"} target={"_black"}>查看</Link>
			]
		}
	];

	return (
		<ProTable columns={columns}
				  rowKey={"postId"}
				  pagination={{pageSize: 10}}
				  request={async (params) => {
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
