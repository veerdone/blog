import React from "react";
import ProCard from "@ant-design/pro-card";
import {Avatar} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import "./center.css";


const Center: React.FC = () => {
	const { initialState } = useModel('@@initialState');

	return(
		<ProCard split={"vertical"}>
			<ProCard colSpan={"25%"} title={"个人信息"} direction={"column"}>
				<Avatar src={initialState?.currentUser?.icon} alt={initialState?.currentUser?.username}
						size={100}/>
			</ProCard>
			<ProCard>

			</ProCard>
		</ProCard>
	)
};


export default Center;
