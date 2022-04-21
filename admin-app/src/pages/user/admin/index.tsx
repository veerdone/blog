import React, {useRef, useState} from "react";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {listAdminUser} from "@/api/user";
import {Button, Modal} from "antd";
import UserList from "@/pages/user/admin/List";

const Admin: React.FC = () => {
	const ref = useRef<any>();
	const [showList, setShowList] = useState(false);

	const columns: ProColumns<AdminUser>[] = [
		{
			title: "用户名",
			dataIndex: "username",
			valueType: "text",
			copyable: true

		},
		{
			title: "账号",
			dataIndex: "account",
			valueType: "text",
			copyable: true
		},
		{
			title: "手机号",
			dataIndex: "telephone",
			valueType: "text",
			copyable: true
		}
	];

	return (
		<>
			<ProTable columns={columns}
					  rowKey={"userId"}
					  actionRef={ref}
					  toolBarRender={() => [
					  	<Button type={"primary"} onClick={() => setShowList(true)}>添加</Button>
					  ]}
					  search={false}
					  request={async (param) => {
						  const data: any = await listAdminUser();
						  return {
							  data: data?.list || [],
							  total: data?.total || 0,
							  success: data?.status === 200
						  }
					  }}
			/>


			<Modal visible={showList} footer={null} onCancel={() => setShowList(false)}
				   width={"80%"}
			>
				<UserList tableRef={ref} setShowList={setShowList}/>
			</Modal>
		</>
	)
};

export default Admin;
