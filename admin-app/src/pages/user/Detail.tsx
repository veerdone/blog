import React, {useEffect, useState} from "react";
import {getUserById} from "@/api/user";
import ProCard from "@ant-design/pro-card";
import {Avatar, Descriptions} from "antd";

type Props = {
	userId: string
}

const Detail: React.FC<Props> = ({userId}) => {
	const [user, setUser] = useState<User>({
		account: "",
		createTime: "",
		fans: 0,
		focus: 0,
		icon: "",
		likes: 0,
		password: "",
		sex: false,
		status: false,
		telephone: "",
		userId: "",
		username: ""
	});
	const [loading, setLoading] = useState(false);

	const getUser = async () => {
		const data = await getUserById(userId);
		setUser(data?.data)
	};

	useEffect(() => {
		setLoading(true);
		getUser();
		setLoading(false);
	}, []);

	return (
		<ProCard title={"详细信息"} loading={loading}>
			<Avatar src={user?.icon || ""} alt={""}/>
			<Descriptions column={1}>
				<Descriptions.Item label={"账号"}>{user?.account}</Descriptions.Item>
				<Descriptions.Item label={"用户名"}>{user?.username}</Descriptions.Item>
				<Descriptions.Item label={"手机号"}>{user?.telephone}</Descriptions.Item>
				<Descriptions.Item label={"性别"}>{user?.sex ? "男" : "女"}</Descriptions.Item>
				<Descriptions.Item label={"粉丝数"}>{user?.fans}</Descriptions.Item>
				<Descriptions.Item label={"创建时间"}>{user?.createTime}</Descriptions.Item>
				<Descriptions.Item label={"状态"}>{user?.status ? "被禁用" : "正常"}</Descriptions.Item>
			</Descriptions>
		</ProCard>
	)
};

export default Detail;
