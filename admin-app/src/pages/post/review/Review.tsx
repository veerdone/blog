import React, {useRef, useState} from "react";
import ProTable from "@ant-design/pro-table";
import type {ProColumns} from "@ant-design/pro-table";
import {pagePostReviewByQuery, updatePostReview} from "@/api/postReview";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons/lib";
import {Link} from "umi";
import {Button, message, Modal, Input} from "antd";

/**
 * 文章审核页面
 * @constructor
 */
const Review: React.FC = () => {
	const ref = useRef<any>();

	const getPostReview = async (param: any) => {
		return pagePostReviewByQuery({
			startPage: param.current,
			...param
		});
	};

	const update = async (postReview: any) => {
		const data = await updatePostReview(postReview);
		if (data?.status === 200) {
			message.success("操作成功", 2);
			ref?.current?.reload?.();
		}
	};

	const handleSuccess = (postReview: PostReview) => {
		update({
			reviewId: postReview.reviewId,
			reviewStatus: 0,
			reviewPostId: postReview.reviewPostId
		})
	};

	const [temp, setTemp] = useState({
		reviewStatus: 3,
		reviewFailReason: "",
		reviewId: "",
		reviewPostId: ""
	});
	const [showInput, setShowInput] = useState(false);

	const handleClickReject = (postReview: PostReview) => {
		setShowInput(true);
		setTemp({...temp, reviewId: postReview.reviewId, reviewPostId: postReview.reviewPostId});
	};

	const handleCancel = () => {
		setShowInput(false);
		setTemp({
			...temp,
			reviewFailReason: "",
			reviewId: "",
			reviewPostId: ""
		});
	};

	const handleReject = () => {
		update(temp);
		setTemp({
			...temp,
			reviewFailReason: "",
			reviewId: "",
			reviewPostId: ""
		});
		setShowInput(false);
	};

	const columns: ProColumns<PostReview>[] = [
		{
			dataIndex: "index",
			valueType: "index",
			width: 40,
			key: "index"
		},
		{
			title: "文章标题",
			dataIndex: "reviewPostTitle",
			key: "reviewPostTitle",
			copyable: true,
			ellipsis: true
		},
		{
			title: "状态",
			dataIndex: "reviewStatus",
			key: "reviewStatus",
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
			key: "reviewFailReason",
			ellipsis: true,
			search: false
		},
		{
			title: "创建时间",
			dataIndex: "reviewCreateTime",
			key: "reviewCreateTime",
			valueType: "dateTime"
		},
		{
			title: "最近审核一次时间",
			dataIndex: "reviewUpdateTime",
			key: "reviewUpdateTime",
			valueType: "dateTime"
		},
		{
			title: "操作",
			valueType: "option",
			key: "postId",
			render: (dom, entity) => [
				<Link to={`/view/${entity.reviewPostId}`} key={"1"} target={"_black"}>
					查看
				</Link>,
				<Button icon={<CheckOutlined/>} shape="circle" key={"2"}
						style={{backgroundColor: "#52c41a", color: "white"}}
						onClick={() => handleSuccess(entity)}
				/>,
				<Button icon={<CloseOutlined/>} shape="circle" danger key={"3"}
					onClick={() => handleClickReject(entity)}
						disabled={entity.reviewStatus === 3}
				/>
			]
		}
	];

	return (
		<>
			<ProTable columns={columns}
					  pagination={{pageSize: 10}}
					  rowKey={"reviewId"}
					  search={{labelWidth: "auto"}}
					  actionRef={ref}
					  request={async (param) => {
						  const data: any = await getPostReview(param);
						  return {
							  data: data.list,
							  total: data.total,
							  success: data.status === 200
						  }
					  }}/>
			<Modal visible={showInput} onCancel={handleCancel} onOk={handleReject} title={"审核失败原因"}>
				<Input.TextArea allowClear autoSize placeholder="请输入审核失败原因!"
					onChange={value => setTemp({...temp,reviewFailReason: value.target.value})}
					value={temp.reviewFailReason}
				/>
			</Modal>
		</>
	)
};

export default Review;
