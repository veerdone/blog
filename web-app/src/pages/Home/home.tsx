import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import PostList from "@/components/PostList/PostList";
import {BackTop} from "antd";
import {pagePostVo} from "@/api/post";

const Home = () => {
	const [postList, setPostList] = useState<PostVo[]>([]);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0
	})

	const getList = async (current = 1, pageSize = 10) => {
		setLoading(true);
		const {data} = await pagePostVo(current, pageSize);
		setPostList(data?.list);
		setPagination(s => ({...s, total: data?.total, current: current}));
		setLoading(false);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
			<ProCard>
				<BackTop>
					<div style={{
						width: 40,
						height: 40,
						backgroundColor: "#1088e9",
						color: "white",
						lineHeight: "40px",
						textAlign: "center",
						fontSize: "14px",
						borderRadius: 20
					}}>
						UP
					</div>
				</BackTop>
				<PostList data={postList} pagination={{
					...pagination,
					onChange: (current, pageSize) => getList(current, pageSize)
				}}
						  loading={loading}/>
			</ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
		</ProCard>
	)
};

export default Home;
