import React, {useEffect, useState} from "react";
import {currentUserInfo} from "@/pages";
import {Avatar, List} from "antd";
import {UserFocusVo} from "@/type/user";
import {listUserFocusVo} from "@/api/userFocus";


const MyFocus: React.FC = () => {
	const user = currentUserInfo();
	const [focusList, setFocusList] = useState<UserFocusVo[]>([]);

	const getFocusList = async () => {
		const data: any = await listUserFocusVo(user?.userId);
		if (data?.status === 200) setFocusList(data?.list)
	};

	useEffect(() => {
		getFocusList();
	}, []);

	return (
		<>
			<List itemLayout={"horizontal"} dataSource={focusList}
				  renderItem={item => (
					  <List.Item>
						  <List.Item.Meta avatar={<Avatar src={item?.focusUser?.icon}/>}
										  title={<span>{item?.focusUser?.username}</span>}
						  />
					  </List.Item>
				  )}
			/>
		</>
	)
};

export default MyFocus;
