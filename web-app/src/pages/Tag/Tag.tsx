import React, {useEffect, useState} from "react";
import {listPostVoByTagId, listTag} from "@/api/post";
import ProCard from "@ant-design/pro-card";
import {Tabs} from "antd";
import PostList from "@/components/PostList/PostList";

const Tag = () => {
	const [tagList, setTagList] = useState<Tag[]>([]);
	const [loading, setLoading] = useState(false);
	const [postList, setPostList] = useState<PostVo[]>([]);

	const getTagList = async () => {
		const {data} = await listTag();
		setTagList(data.list);
	};

	useEffect(() => {
		getTagList();
		getPost();
	}, []);


	const getPost = async (tagId: string = "1") => {
		setLoading(true);
		const {data} = await listPostVoByTagId(tagId);
		setPostList(data?.list);
		setLoading(false);
	};

	const handleClick = (key: string, _: any) => {
		getPost(key);
	};

	return(
		<ProCard>
			<ProCard colSpan={"10%"}>
				<Tabs tabPosition={"left"} defaultActiveKey={"1"} onTabClick={handleClick}>
					{tagList.map(tag => {
						return <Tabs.TabPane key={tag.tagId} tab={tag.tagName} />
					})}
				</Tabs>
			</ProCard>
			<ProCard>
				<PostList  data={postList} pagination={false} loading={loading}/>
			</ProCard>
		</ProCard>
	)
};

export default Tag;
