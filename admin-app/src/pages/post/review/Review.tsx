import React from "react";
import ProTable, {ProColumns} from "@ant-design/pro-table";
import {pagePostReviewByQuery} from "@/api/postReview";
import { Link } from "umi";

/**
 * 文章审核页面
 * @constructor
 */
const Review: React.FC = () => {

	const getPostReview = async (param: any) => {
		return pagePostReviewByQuery({
			startPage: param.current,
			...param
		});
	};

	const columns: ProColumns<PostReview>[] = [
		{
			dataIndex: "index",
			valueType: "index",
			width: 40
		},
		{
			title: "文章标题",
			dataIndex: "reviewPostTitle",
			copyable: true,
			ellipsis: true
		},
		{
			title: "状态",
			dataIndex: "reviewStatus",
			valueEnum: {
				0: {text: "公开", status: "Success"},
				2: {text: "审核中", status: "Processing"},
				3: {text: "审核失败", status: "Error"},
				4: {text: "全部", status: "Default"}
			}
		},
		{
			title: "审核失败原因",
			dataIndex: "reviewFailReason",
			ellipsis: true,
			search: false
		},
		{
			title: "创建时间",
			dataIndex: "reviewCreateTime",
			valueType: "dateTime"
		},
		{
			title: "最近审核一次时间",
			dataIndex: "reviewUpdateTime",
			valueType: "dateTime"
		},
		{
			title: "操作",
			valueType: "option",
			key: "postId",
			render: (dom, entity, index, action) =>  [
				<Link to={`/view/${entity.reviewPostId}`} key={"1"} target={"_black"}>
					查看
				</Link>
			]
		}
	];

	return (
		<ProTable columns={columns}
				  pagination={{pageSize: 10}}
				  rowKey={"reviewId"}
				  search={{labelWidth: "auto"}}
				  request={async (param, sort, filter) => {
					  const data: any = await getPostReview(param);
					  return {
						  data: data.list,
						  total: data.total,
						  success: data.status === 200
					  }
				  }}/>
	)
};

export default Review;
