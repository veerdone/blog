import React, {Fragment, useEffect, useImperativeHandle, useState} from "react";
import ProList from "@ant-design/pro-list";
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, Tag} from "antd";
import {EyeOutlined, LikeOutlined} from "@ant-design/icons";
import {listPostVo} from "@/api/post";

const IconText = ({ icon, text }: { icon: any; text: string | number | undefined }) => (
	<span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
		{text}
  </span>
);

type Props = {
	onRef?: any
}

const PostList = (props: Props) => {
	const [list, setList] = useState<PostVo[]>([]);
	const [loading, setLoading] = useState(false);

	const requestList = async () => {
		setLoading(true);
		const {data} = await listPostVo();
		setList(data.list);
		setLoading(false);
	};

	useEffect(() => {
		requestList();
	}, []);

	useImperativeHandle(props.onRef, () => {
		return{
			setList: setList,
			setLoading: setLoading
		}
	});

	const renderPicture = (record: PostVo): React.ReactNode => {
		if (record.titlePicture) {
			return <img src={record.titlePicture} alt={"picture"}/>
		}
		return <div style={{backgroundColor: "white"}} />
	};

	const showPost = (record: PostVo, index: number) => {
		return {
			onClick: () => {
				window.open(`http://localhost:8000/post/${record.postId}`);
			}
		}
	};

	const loadingData = () => {
		if (loading) {
			return <ProSkeleton type={"list"} />
		}
		return (
			<ProList
				dataSource={list}
				itemLayout="vertical"
				rowKey="postId"
				metas={{
					title: {dataIndex: "postTitle"},
					description: {
						render: (text, record: PostVo, index: number) => (
							<>
								{record.tags.map(tag => {
									return <Tag key={tag.tagId}>{tag.tagName}</Tag>
								})}
							</>
						)
					},
					actions: {
						render: (text, record: PostVo, index) => [
							<IconText icon={EyeOutlined} text={record.postViews} key={"1"}/>,
							<Button type={"text"} size={"small"} key={"2"}><IconText icon={LikeOutlined} text={record.postLikes} /></Button>
						],
					},
					extra: {
						render: (text: any, record: PostVo, index: number) => (
							<>
								{renderPicture(record)}
							</>
						)
					}
				}}
				onItem={showPost}
			/>
		)
	};

	return (
        <Fragment>
			{loadingData()}
        </Fragment>
    )
};

export default PostList;
