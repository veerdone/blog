import React, {useEffect, useState} from "react";
import {Link, useLocation} from "umi"
import {Avatar, Button, Dropdown, Menu, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {isLogin} from "@/util/cookie";
import {getCurrentUser} from "@/api/user";

const menu = (
	<Menu>
		<Menu.Item key="my-center">
			<Link to="/my-center">个人中心</Link>
		</Menu.Item>
		<Menu.Item key="logout">
			退出登录
		</Menu.Item>
	</Menu>
);

const HeaderRight: React.FC = () => {
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
		userId: 0,
		username: ""
	});

	const getUser = async () => {
		const {data} = await getCurrentUser();
		setUser(data.data)
	};

	useEffect(() => {
		if (isLogin()) {
			getUser();
		}
	}, []);

	const showUserIcon = () => {
		if (user.icon && user.username) {
			return <span>
				<Avatar src={user.icon}/>
				<span>{user.username}</span>
			</span>
		}
		return <span>
			<Avatar icon={<UserOutlined />} size={30}/>
			<span>未登录!</span>
		</span>
	};

	const location = useLocation();
	console.log(location.pathname);

	return (
		<Space size={"large"}>
			{location.pathname !== "/login" && (
				<>
					<Link to={"/post/write"}>
						<Button type={"primary"}>写文章</Button>
					</Link>
				</>
			)}
			<Dropdown overlay={menu}>
				{showUserIcon()}
			</Dropdown>
		</Space>
	)
};

export default HeaderRight;
