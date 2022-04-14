import React from "react";
import {Link, useLocation, history} from "umi"
import {Avatar, Button, Dropdown, Menu, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {currentUserInfo} from "@/pages";
import {removeCookie} from "@/util/cookie";



const HeaderRight = () => {
	const location = useLocation();
	if (location.pathname === "/login") {
		return null;
	}
	const user = currentUserInfo();

	const logout = () => {
		removeCookie("currentUser");
		history.push("/login");
	};

	const menu = (
		<Menu>
			<Menu.Item key="my-center">
				<Link to="/my-center">个人中心</Link>
			</Menu.Item>
			<Menu.Item key="logout" onClick={logout}>
				退出登录
			</Menu.Item>
		</Menu>
	);


	return (
		<Space size={"large"}>
			<Link to={"/post/write"}>
				<Button type={"primary"}>写文章</Button>
			</Link>
			<Dropdown overlay={menu} arrow>
				{user === undefined ?
					(<Link to={"/login"}>
						<span>
							<Avatar icon={<UserOutlined/>} size={30}/>
							<span>未登录!</span>
						</span>
					</Link>) :
					(<span>
						<Avatar src={user.icon}/>
						<span>{user.username}</span>
					</span>)}
			</Dropdown>
		</Space>
	)
};


export default HeaderRight;
