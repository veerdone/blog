import React from "react";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {pageLoginHistoryByQuery} from "@/api/system";

const LoginHistory: React.FC = () => {
	const getLoginHistory = async (param: any) => {
		return pageLoginHistoryByQuery({
			startPage: param?.current,
			...param
		});
	};

	const columns: ProColumns<LoginHistory>[] = [
		{
			title: "账号",
			dataIndex: "userAccount",
			valueType: "text"
		},
		{
			title: "用户名",
			dataIndex: "username",
			valueType: "text"
		},
		{
			title: "登录地点",
			dataIndex: "loginSite",
			valueType: "text"
		},
		{
			title: "登录Ip",
			dataIndex: "loginIp",
			valueType: "text"
		},
		{
			title: "登录时间",
			dataIndex: "loginTime",
			valueType: "dateTime",
			hideInSearch: true,
		},
		{
			title: "登录时间",
			dataIndex: "loginTime",
			valueType: "dateTimeRange",
			colSize: 1.5,
			hideInTable: true
		},
		{
			title: "浏览器",
			dataIndex: "browserName",
			valueType: "text"
		}
	];

	return(
		<>
			<ProTable columns={columns}
					  pagination={{pageSize: 10}}
					  rowKey={"id"}
						request={async (param) => {
							const data: any = await getLoginHistory(param);
							return {
								data: data?.list || [],
								total: data?.total || 0,
								success: data?.status === 200
							}
						}}
			/>
		</>
	)
};

export default LoginHistory;
