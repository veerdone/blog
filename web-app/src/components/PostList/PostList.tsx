import React, {Fragment} from "react";
import ProList from "@ant-design/pro-list";
import ProSkeleton from '@ant-design/pro-skeleton';
import {Button, TablePaginationConfig, Tag} from "antd";
import {EyeOutlined, LikeOutlined} from "@ant-design/icons";
import {PaginationConfig} from "antd/es/pagination";

const IconText = ({icon, text}: { icon: any; text: string | number | undefined }) => (
	<span>
    {React.createElement(icon, {style: {marginRight: 8}})}
		{text}
  </span>
);

type Props = {
	data: PostVo[],
	pagination: false | (false & PaginationConfig) | (TablePaginationConfig & false) | (TablePaginationConfig & PaginationConfig) | undefined,
	loading?: Boolean
}

const PostList = ({data, pagination, loading}: Props) => {

	const renderPicture = (record: PostVo): React.ReactNode => {
		if (record.titlePicture) {
			return <img src={record.titlePicture} alt={"picture"}/>
		}
		return <div style={{backgroundColor: "white"}}/>
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
				dataSource={data}
				itemLayout="vertical"
				rowKey="postId"
				pagination={pagination}
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
