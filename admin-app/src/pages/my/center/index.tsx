import React from "react";
import ProCard from "@ant-design/pro-card";
import {Avatar, Descriptions, message} from "antd";
import {useModel} from "@@/plugin-model/useModel";
import {ProForm, ProFormRadio, ProFormText} from "@ant-design/pro-form";
import {getCurrentUser, updateUserByQuery} from "@/api/user";
import Cookies from "js-cookie";


const Center: React.FC = () => {
	const {initialState, setInitialState} = useModel('@@initialState');

	const handleSubmit = async (value: any) => {
		value.userId = initialState?.currentUser?.userId
		const {status} = await updateUserByQuery(value);
		if (status === 200) {
			message.success("修改成功");
			const data = await getCurrentUser();
			Cookies.set("currentUser", JSON.stringify(data?.data), {expires: 5});
			await setInitialState(s => ({...s, currentUser: data?.data}))
		}
	}

	return (
		<ProCard split={"vertical"}>
			<ProCard colSpan={"25%"} title={"个人信息"} direction={"column"}>
				<Avatar src={initialState?.currentUser?.icon} alt={initialState?.currentUser?.username}
						size={100}/>
				<Descriptions column={1}>
					<Descriptions.Item label={"用户名"}>{initialState?.currentUser?.username}</Descriptions.Item>
					<Descriptions.Item label={"账号"}>{initialState?.currentUser?.account}</Descriptions.Item>
					<Descriptions.Item label={"手机号"}>{initialState?.currentUser?.telephone}</Descriptions.Item>
					<Descriptions.Item label={"性别"}>{initialState?.currentUser?.sex ? "男" : "女"}</Descriptions.Item>
					<Descriptions.Item label={"加入时间"}>{initialState?.currentUser?.createTime}</Descriptions.Item>
				</Descriptions>
			</ProCard>
			<ProCard>
				<ProForm initialValues={{...initialState?.currentUser}}
						 onFinish={async value => handleSubmit(value)}
				>
					<ProFormText name={"username"} label={"用户名"} placeholder={"请输入用户名"}
								 rules={[
									 {type: "string", max: 10, message: "用户名最长为10个字符"}
								 ]}
					/>
					<ProFormText.Password name={"password"} label={"旧密码"} rules={[
						{type: "string", max: 20, message: "密码最长为20个字符!"},
						({getFieldValue}) => ({
							validator(_, value) {
								if (!value && getFieldValue("newPassword")) {
									return Promise.reject("请输入旧密码!");
								}
								return Promise.resolve();
							}
						})
					]}/>
					<ProFormText.Password name={"newPassword"} label={"新密码"} rules={[
						{type: "string", max: 20, message: "密码最长为20个字符!"},
						({getFieldValue}) => ({
							validator(_, value) {
								if (!value && !getFieldValue("password")) {
									return Promise.resolve();
								} else if (!value && getFieldValue("password")) {
									return Promise.reject("请输入新密码!");
								}
								return Promise.resolve();
							}
						})
					]}/>
					<ProFormRadio.Group name={"sex"} label={"性别"} options={[
						{label: "女", value: false},
						{label: "男", value: true}
					]}/>
				</ProForm>
			</ProCard>
		</ProCard>
	)
};


export default Center;
