import React from "react";
import ProCard from "@ant-design/pro-card";
import {Avatar, Descriptions} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import "./center.css";


const Center: React.FC = () => {
	const { initialState } = useModel('@@initialState');

	return(
		<ProCard split={"vertical"}>
			<ProCard colSpan={"25%"} title={"个人信息"} direction={"column"}>
				<Avatar src={initialState?.currentUser?.icon} alt={initialState?.currentUser?.username}
						size={100}/>
				<Descriptions column={1}>
					<Descriptions.Item label={"用户名"}>{initialState?.currentUser?.username}</Descriptions.Item>
					<Descriptions.Item label={"账号"}>{initialState?.currentUser?.account}</Descriptions.Item>
					<Descriptions.Item label={"手机号"}>{initialState?.currentUser?.telephone}</Descriptions.Item>
					<Descriptions.Item label={"性别"}>{initialState?.currentUser?.sex? "男": "女"}</Descriptions.Item>
					<Descriptions.Item label={"加入时间"}>{initialState?.currentUser?.createTime}</Descriptions.Item>
				</Descriptions>
			</ProCard>
			<ProCard>

			</ProCard>
		</ProCard>
	)
};


export default Center;
