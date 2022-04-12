import React, {useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Button, Form, Input, message, Modal, Tabs, Upload, Radio} from "antd";
import {history} from "umi";
import {LockOutlined, UserOutlined, PhoneOutlined, UploadOutlined} from "@ant-design/icons";
import {
	getUserByUsername,
	isAccountExist,
	isTelephoneExist,
	isUsernameExist,
	loginByAccount,
	loginByTelephone
} from "@/api/user";
import {setCookie} from "@/util/cookie";
import "./Login.css";

const {TabPane} = Tabs;
const {Dragger} = Upload;

type LoginType = "account" | "telephone";

const Login = () => {
	const [loginForm] = Form.useForm();
	const [loginType, setLoginType] = useState<LoginType>("account");

	const login = () => {
		const password = loginForm.getFieldValue("password");
		if (loginType === "account") {
			const account = loginForm.getFieldValue("account");
			loginByAccount(account, password).then(res => {
				if (res.data.status === 200) {
					message.success("登录成功");
					setCookie("account", res.data.data);
					history.push("/");
				} else {
					message.error(res.data.message);
				}
			})
		}
		if (loginType === "telephone") {
			const telephone = loginForm.getFieldValue("telephone");
			loginByTelephone(telephone, password).then(res => {
				if (res.data.status === 200) {
					message.success("登录成功");
					setCookie("account", res.data.data);
					history.push("/");
				} else {
					message.error(res.data.message);
				}
			})
		}
	};

	const [isShowForm, setShowForm] = useState(false);
	const [registerForm] = Form.useForm();

	const handleCancel = () => {
		setShowForm(false);
		registerForm.resetFields();
	};

	const isFieldExist = (value: string, type: "telephone" | "account" | "username") => {
		let result;
		if (type === "telephone") {
			result = isTelephoneExist(value)
		} else if (type === "username") {
			result = isUsernameExist(value)
		} else {
			result = isAccountExist(value)
		}
		result.then(res => {
			if (res.data.status === 200) {
				return Promise.resolve();
			}
			return Promise.reject(new Error(res.data.message));
		})
	};

	return (
		<ProCard className={"main"}>
			<Form form={loginForm} className={"form"} labelCol={{span: 3}}>
				<Tabs defaultActiveKey={loginType} className={"tabs"} onChange={key => setLoginType(key as LoginType)}>
					<TabPane tab={"账号"} key={"account"}/>
					<TabPane tab={"手机号"} key={"telephone"}/>
				</Tabs>
				{loginType === "account" && (
					<>
						<Form.Item name={"account"} rules={[
							{required: true, message: "请输入账号!"}]}>
							<Input placeholder={"请输入账号"} prefix={<UserOutlined/>}/>
						</Form.Item>
					</>
				)}
				{loginType === "telephone" && (
					<>
						<Form.Item name={"telephone"} rules={[
							{pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: "请输入正确的手机号!"},
							{required: true, message: "请输入手机号!"}
						]}>
							<Input placeholder={"请输入手机号"} prefix={<PhoneOutlined/>}/>
						</Form.Item>
					</>
				)}
				<Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
					<Input.Password placeholder={"请输入密码"} prefix={<LockOutlined/>}/>
				</Form.Item>
				<Form.Item>
					<Button type={"primary"} htmlType={"submit"} style={{width: "100%"}} onClick={login}>
						登录
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type={"text"} style={{float: "left"}}>忘记密码</Button>
					<Button type={"text"} style={{float: "right", color: "blue"}} onClick={() => setShowForm(true)}>注册</Button>
				</Form.Item>
			</Form>


			<Modal visible={isShowForm} title={"用户注册"} onCancel={handleCancel}>
				<Form form={registerForm}>
					<Form.Item label={"用户名"} name={"username"}
							   rules={[{required: true, message: "用户名不能为空"},
								   {type: 'string', whitespace: true, max: 10},
								   () => ({
									   validator(_, value) {
									   		return isFieldExist(value, "username")
									   }
								   })
							   ]}
							   validateTrigger={"onBlur"}>
						<Input />
					</Form.Item>
					<Form.Item label={"账号"} name={"account"}
							   rules={[{required: true, message: "账号不能为空"},
								   () => ({
									   validator(_, value) {
									   	return isFieldExist(value, "account")
									   }
								   })
							   ]}
							   validateTrigger={"onBlur"}>
						<Input/>
					</Form.Item>
					<Form.Item label={"密码"} name={"password"}
							   rules={[{required: true, message: "密码不能为空"}]}>
						<Input.Password />
					</Form.Item>
					<Form.Item label={"手机号"} name={"telephone"}
							   rules={[{pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: "请输入正确的手机号"},
								   () => ({
									   validator(_, value) {
									   	return isFieldExist(value, "telephone")
									   }
								   })
							   ]}
							   validateTrigger={"onBlur"}>
						<Input />
					</Form.Item>
					<Form.Item label={"性别"} name={"sex"}>
						<Radio.Group defaultValue={0}>
							<Radio value={0}>女</Radio>
							<Radio value={1}>男</Radio>
						</Radio.Group>
					</Form.Item>
					<Dragger>
						<p><UploadOutlined /></p>
						<p>点击上传头像</p>
						<p>或拖动文件到此上传</p>
					</Dragger>
					<Form.Item>
						<Button type={"primary"} htmlType={"submit"}>注册</Button>
					</Form.Item>
				</Form>
			</Modal>
		</ProCard>
	)
};

export default Login;
