import {message, Tabs} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {ProFormText, LoginFormPage, ProFormInstance, ProFormCheckbox} from '@ant-design/pro-form';
import {useModel, history} from 'umi';
import {
	LockOutlined,
	MobileOutlined,
	UserOutlined,
} from "@ant-design/icons/lib";
import {loginByAccount, loginByTelephone} from "@/api/user";
import Cookies from "js-cookie";

import styles from './index.less';


const Login: React.FC = () => {
	const [loginType, setLoginType] = useState<string>('account');
	const {initialState, setInitialState} = useModel('@@initialState');

	const formRef = useRef<ProFormInstance<{ account?: string, telephone?: string, password: string }>>();

	useEffect(() => {
		const current = initialState?.fetchUserInfo?.();
		if (current) {
			history.push("/");
		}
	}, []);

	const handleSubmit = async (value: LoginParams) => {
		let data: any = undefined;
		if (loginType === "account") {
			data = await loginByAccount(value);
		}else if (loginType === "telephone") {
			data = await loginByTelephone(value);
		}
		if (data?.status === 200) {
			message.success("登录成功!");
			Cookies.set("account", data?.data?.account);
			Cookies.set("currentUser", JSON.stringify(data?.data));
			await setInitialState(s => ({...s, currentUser: data?.data}));
			history.push("/");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<LoginFormPage
					backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
					title="blog_yu"
					formRef={formRef}
					onFinish={async (value) => await handleSubmit(value as LoginParams)}
				>
					<Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
						<Tabs.TabPane key={'account'} tab={'账号密码登录'}/>
						<Tabs.TabPane key={'telephone'} tab={'手机号登录'}/>
					</Tabs>
					{loginType === 'account' && (
						<>
							<ProFormText
								name="account"
								fieldProps={{
									size: 'large',
									prefix: <UserOutlined className={'prefixIcon'}/>,
								}}
								placeholder="账号"
								rules={[
									{
										required: true,
										message: '请输入账号!',
									},
									{
										type: "string",
										max: 11,
										message: "账号最长为11个字符!"
									}
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: 'large',
									prefix: <LockOutlined className={'prefixIcon'}/>,
								}}
								placeholder={"密码"}
								rules={[
									{
										required: true,
										message: '请输入密码！',
									},
									{
										type: "string",
										max: 20,
										message: "密码最长为20个字符!"
									}
								]}
							/>
						</>
					)}
					{loginType === 'telephone' && (
						<>
							<ProFormText
								fieldProps={{
									size: 'large',
									prefix: <MobileOutlined className={'prefixIcon'}/>,
								}}
								name="telephone"
								placeholder={'手机号'}
								rules={[
									{
										required: true,
										message: '请输入手机号！',
									},
									{
										pattern: /^1\d{10}$/,
										message: '手机号格式错误！',
									},
								]}
							/>
							<ProFormText.Password
								name="password"
								fieldProps={{
									size: 'large',
									prefix: <LockOutlined className={'prefixIcon'}/>,
								}}
								placeholder={"密码"}
								rules={[
									{
										required: true,
										message: '请输入密码！',
									},
									{
										type: "string",
										max: 20,
										message: "密码最长为20个字符!"
									}
								]}
							/>
						</>
					)}
					<div
						style={{
							marginBottom: 24,
						}}
					>
						<ProFormCheckbox noStyle name="autoLogin">
							自动登录
						</ProFormCheckbox>
						<a
							style={{
								float: 'right',
							}}
						>
							忘记密码
						</a>
					</div>
				</LoginFormPage>
			</div>
		</div>
	);
};

export default Login;
