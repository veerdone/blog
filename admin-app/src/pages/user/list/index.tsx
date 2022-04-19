import React from "react";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {pageUserByQuery} from "@/api/user";

const UserList: React.FC = () => {
	const Columns: ProColumns<User>[] = [
		{
			title: "账号",
			dataIndex: "account",
			copyable: true
		},
		{
			title: "用户名",
			dataIndex: "username",
			copyable: true,
			ellipsis: true
		},
		{
			title: "手机号",
			dataIndex: "telephone",
			copyable: true
		},
		{
			title: "性别",
			dataIndex: "sex",
			render: (dom, entity) => {
				return <span>{entity.sex ? "女" : "男"}</span>
			}
		},
		{
			title: "粉丝数",
			dataIndex: "fans",
			valueType: "digit"
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTime"
		},
		{
			title: "状态",
			dataIndex: "status",
			valueEnum: {
				0: {text: "正常", status: "Success"},
				1: {text: "禁用", status: "Error"}
			}
		}
	];

	const getUser = async (query: any) => {
		return pageUserByQuery({
			startPage: query?.current,
			...query
		})
	};

	return (
		<>
			<ProTable columns={Columns}
					  request={async (params) => {
						  const data: any = await getUser(params);
						  return {
							  data: data?.list,
							  total: data?.total,
							  success: data?.status === 200
						  }
					  }}
					  rowKey={"userId"}
			/>
		</>
	)
};

export default UserList;
