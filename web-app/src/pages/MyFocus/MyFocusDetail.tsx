import ProCard from "@ant-design/pro-card";
import React, {useEffect, useState} from "react";
import {Avatar, Descriptions, List, Space} from "antd";
import {LikeOutlined, EyeOutlined} from "@ant-design/icons";
import {useParams} from "umi";
import {getUserById} from "@/api/user";

const IconText = ({ icon, text }: any) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

const MyFocusDetail: React.FC = () => {
	const [user, setUser] = useState<any>({});
	const [postList, setPostList] = useState<PostVo[]>([]);

	const params: any = useParams();

	const getUserInfo = async () => {
		const {data} = await getUserById(params?.id);
		if (data?.status == 200) setUser(data?.data)
	}

	useEffect(() => {
		getUserInfo();
	}, []);
	return (
		<ProCard>
			<ProCard split={"vertical"}>
				<ProCard colSpan={"30%"}>
					<Descriptions title={"用户信息"} column={1}>
						<Descriptions.Item label={""}><Avatar src={user?.icon} size={"large"}/></Descriptions.Item>
						<Descriptions.Item label={"用户名"}>{user?.username}</Descriptions.Item>
						<Descriptions.Item label={"性别"}>{user?.sex ? "男" : "女"}</Descriptions.Item>
						<Descriptions.Item label={"加入时间"}>{user?.createTime}</Descriptions.Item>
					</Descriptions>
				</ProCard>
				<ProCard title={"所有文章"}>
					<List dataSource={postList} itemLayout={"vertical"}
							renderItem={item => (
								<List.Item
									key={item.postId}
									actions={[
										<IconText icon={LikeOutlined} text={item.postLikes} key={"1"}/>,
										<IconText icon={EyeOutlined} text={item.postViews} key={"2"}/>
									]}
									extra={item.titlePicture ? <img src={item.titlePicture} alt={"picture"}/> : <div></div>}
								>
									<List.Item.Meta
										title={item.postTitle}
									/>
								</List.Item>
							)}/>
				</ProCard>
			</ProCard>
		</ProCard>
	)
}


export default MyFocusDetail;
