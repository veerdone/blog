import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Tabs} from "antd";
import {listPostVoBySortId, listSort} from "@/api/post";
import PostList from "@/components/PostList/PostList";


const Sort = () => {
	const [sortList, setSortList] = useState<Sort[]>([]);
	const [postList, setPostList] = useState<PostVo[]>([]);
	const [loading, setLoading] = useState(false);

	const getSortList = async () => {
		const {data} = await listSort();
		setSortList(data.list);
	};

	const getPost = async (sortId:string  = "1") => {
		setLoading(true);
		const {data} = await listPostVoBySortId(sortId);
		setPostList(data?.list);
		setLoading(false);
	};

	useEffect(() => {
		getSortList();
		getPost();
	}, []);

	const handleClick = (key: string, _: any) => {
		getPost(key)
	};

	return (
		<ProCard>
			<ProCard colSpan={"10%"}>
				<Tabs tabPosition={"left"} defaultActiveKey={"1"} onTabClick={handleClick}>
					{sortList.map(sort => {
						return <Tabs.TabPane tab={sort.sortName} key={sort.sortId}/>
					})}
				</Tabs>
			</ProCard>
			<ProCard>
				<PostList  data={postList} pagination={false} loading={loading}/>
			</ProCard>
		</ProCard>
	)

};

export default Sort;
