import {message, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import {ProFormText, LoginFormPage} from '@ant-design/pro-form';
import {useModel, history} from 'umi';

import styles from './index.less';
import {LockOutlined, MobileOutlined, UserOutlined} from "@ant-design/icons/lib";


const Login: React.FC = () => {
	const [loginType, setLoginType] = useState<string>('account');
	const {initialState, setInitialState} = useModel('@@initialState');

	useEffect(() => {
		if (initialState?.currentUser) {
			history.push("/");
		}
	}, []);


	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<LoginFormPage title="Blog_Yu"
				actions={
					<div style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}>
						<Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey)}>
							<Tabs.TabPane key={'account'} tab={'账号密码登录'} />
							<Tabs.TabPane key={'phone'} tab={'手机号登录'} />
						</Tabs>
						{loginType === 'account' && (
							<>
								<ProFormText
									name="username"
									fieldProps={{
										size: 'large',
										prefix: <UserOutlined className={'prefixIcon'} />,
									}}
									placeholder={'账号'}
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
										prefix: <LockOutlined className={'prefixIcon'} />,
									}}
									placeholder={'密码'}
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
						{loginType === 'phone' && (
							<>
								<ProFormText
									fieldProps={{
										size: 'large',
										prefix: <MobileOutlined className={'prefixIcon'} />,
									}}
									name="mobile"
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
							</>
						)}
					</div>
				}>
				</LoginFormPage>
			</div>
		</div>
	);
};

export default Login;
