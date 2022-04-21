import React from "react";
import type {ProColumns} from "@ant-design/pro-table";
import {ManOutlined, WomanOutlined} from "@ant-design/icons";
import {Button, message} from "antd";
import {insertAdmin, pageUserByQuery} from "@/api/user";
import ProTable from "@ant-design/pro-table";

type Props = {
	setShowList: Function,
	tableRef: any
}

const UserList: React.FC<Props> = ({setShowList, tableRef}: Props) => {
	const userList = (param: any) => {
		return pageUserByQuery({
			startPage: param.current,
			...param
		})
	};


	const addAdmin = async (user: any) => {
		const {status} = await insertAdmin(user);
		if (status === 200) {
			message.success("添加成功");
			setShowList(false);
			tableRef?.current?.reload?.();
		}
	};

	const columns: ProColumns<User>[] = [
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
				if (entity.status) {
					return <span>女<WomanOutlined/></span>
				}
				return <span>男<ManOutlined/></span>
			}
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTime",
			hideInSearch: true
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTimeRange",
			hideInTable: true,
			colSize: 1.5,
			search: {
				transform: value => {
					return {
						startTime: value[0],
						endTime: value[1]
					}
				}
			}
		},
		{
			title: "状态",
			dataIndex: "status",
			valueEnum: {
				0: {text: "正常", status: "Success"},
				1: {text: "禁用", status: "Error"}
			}
		},
		{
			title: "操作",
			valueType: "option",
			key: "userId",
			render: (dom, entity) => {
				return <Button type={"primary"} onClick={() => addAdmin(entity)}>添加</Button>
			}
		}
	];

	return (
		<ProTable columns={columns}
				  rowKey={"userId"}
				  request={async (param) => {
					  const data: any = await userList(param);
					  return {
						  data: data?.list || [],
						  total: data?.total || 0,
						  success: data?.status === 200
					  }
				  }}
		/>
	)
};

export default UserList;
