import React, {useEffect, useState} from "react";
import {Bar, BarConfig} from "@ant-design/plots";
import ProCard from "@ant-design/pro-card";
import {Select} from "antd";
import {viewCharts} from "@/api/post";


const Views :React.FC = () => {
	const [postList, setPostList] = useState<Post[]>([]);
	const [type, setType] = useState("all");
	const getPost = async () => {
		const data: any = await viewCharts(type);
		setPostList(data?.list);
	};

	useEffect(() => {
		getPost();
	}, [type]);


	const config: BarConfig = {
		data: postList,
		xField: 'postViews',
		yField: 'postTitle',
		seriesField: 'postTitle',
		legend: {
			position: "top-left"
		},
	};

	const select = (
		<Select style={{width: 100}} defaultValue={type} onChange={value => setType(value)}>
			<Select.Option value={"all"}>全部</Select.Option>
			<Select.Option value={"year"}>年</Select.Option>
			<Select.Option value={"month"}>月</Select.Option>
			<Select.Option value={"week"}>星期</Select.Option>
		</Select>
	);

	return (
		<ProCard title={"文章浏览量前5"}
				 colSpan={"60%"}
				 subTitle={select}
		>
			<Bar {...config} style={{width: "100%"}}/>
		</ProCard>
)
};

export default Views;
