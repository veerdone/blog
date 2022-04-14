import React, {useEffect, useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Tabs} from "antd";
import {listPostVoBySortId, listSort} from "@/api/post";
import PostList from "@/components/PostList/PostList";

export type Ref = {
	setList: Function
	setLoading: Function
}

const Sort = () => {
	const [sortList, setSortList] = useState<Sort[]>([]);
	const ref = React.createRef<Ref>();

	const getSortList = async () => {
		const {data} = await listSort();
		setSortList(data.list);
	};

	const getPost = async (sortId:string  = "1") => {
		ref.current?.setLoading(true);
		const {data} = await listPostVoBySortId(sortId);
		ref.current?.setList(data.list);
		ref.current?.setLoading(false);
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
				<PostList onRef={ref} />
			</ProCard>
		</ProCard>
	)

};

export default Sort;
