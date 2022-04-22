import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Calendar} from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import Views from "@/components/charts/views";
import ProCard from "@ant-design/pro-card";
import Likes from "@/components/charts/likes";


moment.locale("zh-cn");

const Welcome: React.FC = () => {

	return (
		<PageContainer title={"首页"}>
			<ProCard>
				<ProCard colSpan={"30%"}>
					<Calendar fullscreen={false}/>
				</ProCard>
				<Views />
			</ProCard>
			<Likes />
		</PageContainer>
	);
};

export default Welcome;
