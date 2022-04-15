import React from "react";
import MyHomeNav from "@/components/MyHomeNav/MyHomeNav";
import ProCard from "@ant-design/pro-card";

const MyHome = (props: any) => {
	return(
		<ProCard>
			<ProCard colSpan={"15%"}>
				<MyHomeNav/>
			</ProCard>
			<ProCard>
				{props.children}
			</ProCard>
		</ProCard>
	)
};

export default MyHome;
