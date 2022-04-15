import React from "react";
import {Menu} from "antd";
import {useLocation, history} from "umi";
import {UserOutlined, BookOutlined} from "@ant-design/icons/lib";

const MyHomeNav = () => {
	const location = useLocation();

	const menuClick = ({key}:any) => {
		history.push(key);
	};
	return(
		<Menu mode={"inline"} defaultSelectedKeys={[location.pathname]} onClick={menuClick}>
			<Menu.Item key={"/myHome/MyInfo"} icon={<UserOutlined />}>
				我的信息
			</Menu.Item>
			<Menu.Item key={"/myHome/myPost"} icon={<BookOutlined />}>
				我的文章
			</Menu.Item>
		</Menu>
	)
};

export default MyHomeNav;
