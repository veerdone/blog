import ProCard from "@ant-design/pro-card";
import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {likesCharts} from "@/api/post";
import {Bar, BarConfig} from "@ant-design/plots";

const Likes: React.FC = () => {
	const [postList, setPostList] = useState<Post[]>([]);
	const [type, setType] = useState("all");

	const getPost = async () => {
	  const data: any = await likesCharts(type);
	  setPostList(data?.list);
	}

	useEffect(() => {
		getPost();
	}, [type])

	const config: BarConfig = {
		data: postList,
		xField: "postLikes",
		yField: "postTitle",
		seriesField: 'postTitle',
		legend: {
			position: "top-left"
		}
	}

	const select = (
		<Select onChange={value => setType(value)} defaultValue={type} style={{width: 100}}>
			<Select.Option value={"all"}>全部</Select.Option>
			<Select.Option value={"year"}>年</Select.Option>
			<Select.Option value={"month"}>月</Select.Option>
			<Select.Option value={"week"}>日</Select.Option>
		</Select>
	)

	return (
		<ProCard title={"文章点赞数前5"} subTitle={select}>
			<Bar {...config}/>
		</ProCard>
	)
}

export default Likes;
