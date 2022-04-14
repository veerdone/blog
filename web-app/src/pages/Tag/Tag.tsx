import React, {useEffect, useState} from "react";
import {listPostVoByTagId, listTag} from "@/api/post";
import ProCard from "@ant-design/pro-card";
import {Tabs} from "antd";
import PostList from "@/components/PostList/PostList";
import {Ref} from "@/pages/Sort/Sort";

const Tag = () => {
	const [tagList, setTagList] = useState<Tag[]>([]);
	const getTagList = async () => {
		const {data} = await listTag();
		setTagList(data.data);
	};

	useEffect(() => {
		getTagList();
	});

	const ref = React.createRef<Ref>();

	const getPost = async (tagId: string) => {
		ref.current?.setLoading(true);
		const {data} = await listPostVoByTagId(tagId);
		ref.current?.setList(data.list);
		ref.current?.setLoading(false);
	};

	const handleClick = (key: string, _: any) => {
		getPost(key);
	};

	return(
		<ProCard>
			<ProCard>
				<Tabs tabPosition={"left"} defaultActiveKey={"1"} onTabClick={handleClick}>
					{tagList.map(tag => {
						return <Tabs.TabPane key={tag.tagId} tab={tag.tagName} />
					})}
				</Tabs>
			</ProCard>
			<ProCard>
				<PostList onRef={ref}/>
			</ProCard>
		</ProCard>
	)
};

export default Tag;
