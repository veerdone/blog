import React, {useState} from "react";
import ProCard from "@ant-design/pro-card";
import {Button, Form, Input, message, Modal, Tabs, Upload, Radio} from "antd";
import {history} from "umi";
import {LockOutlined, UserOutlined, PhoneOutlined, UploadOutlined} from "@ant-design/icons";
import {
	loginByAccount,
	loginByTelephone,
	insertUser
} from "@/api/user";
import {setCookie} from "@/util/cookie";
import {deleteImage, uploadImage} from "@/api/upload";
import "./Login.css";

const {TabPane} = Tabs;
const {Dragger} = Upload;

type LoginType = "account" | "telephone";

const Login = () => {
	const [loginForm] = Form.useForm();
	const [loginType, setLoginType] = useState<LoginType>("account");

	const login = async () => {
		try {
			const values = await loginForm.validateFields();
			if (loginType === "account") {
				loginByAccount(values).then(res => {
					if (res.data.status === 200) {
						message.success("登录成功");
						setCookie("currentUser", JSON.stringify(res.data.data), {expires: 5});
						setCookie("account", res.data?.data?.account, {expires: 5});
						if (!history) return;
						const {query} = history.location;
						const {redirect} = query as {redirect: string};
						history.push(redirect || "/");
					}
				})
			} else if (loginType === "telephone") {
				loginByTelephone(values).then(res => {
					if (res.data.status === 200) {
						message.success("登录成功");
						setCookie("currentUser", JSON.stringify(res.data.data), {expires: 5});
						history.push("/");
					} else {
						message.error(res.data.message);
					}
				})
			}
		} catch (errorInfo) {
			return;
		}
	};

	const [isShowForm, setShowForm] = useState(false);
	const [registerForm] = Form.useForm();
	const [icon,setIcon] = useState("");

	const upload = async (file: any) => {
		const {data} = await uploadImage(file);
		if (data?.status === 200) {
			const filename = data.data;
			setIcon(filename);
		}
		return ""
	};

	const delImage = () => {
		if (icon !== "") {
			deleteImage(icon)
		}
	};

	const handleCancel = () => {
		setShowForm(false);
		registerForm.resetFields();
		delImage();
	};

	const handleOk = async () => {
		try {
			const values = await registerForm.validateFields();
			if (icon !== "") {
				values.icon = icon;
			}
			insertUser(values).then(res => {
				if (res.data.status === 200) {
					message.success("注册成功");
					setShowForm(false);
					registerForm.resetFields();
				}
			});
		} catch (e) {
			return;
		}
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
					<Button type={"primary"} style={{width: "100%"}} onClick={login}>
						登录
					</Button>
				</Form.Item>
				<Form.Item>
					<Button type={"text"} style={{float: "left"}}>忘记密码</Button>
					<Button type={"text"} style={{float: "right", color: "blue"}}
							onClick={() => setShowForm(true)}>注册</Button>
				</Form.Item>
			</Form>


			<Modal visible={isShowForm} title={"用户注册"} onCancel={handleCancel} onOk={handleOk}
				   footer={false}>
				<Form form={registerForm} initialValues={{sex: 0}} labelCol={{span: 3}}>
					<Form.Item label={"用户名"} name={"username"}
							   rules={[{required: true, message: "用户名不能为空"},
								   {type: "string", max: 10, message: "用户名最长为10个字符"}]}
							   validateTrigger={"onBlur"}>
						<Input/>
					</Form.Item>
					<Form.Item label={"账号"} name={"account"}
							   rules={[{required: true, message: "账号不能为空"},
								   {type: "string", max: 11, message: "账号最长为11个字符"}]}
							   validateTrigger={"onBlur"}>
						<Input/>
					</Form.Item>
					<Form.Item label={"密码"} name={"password"}
							   rules={[{required: true, message: "密码不能为空"},
								   {type: "string", max: 20, message: "密码最长为20个字符"}]}>
						<Input.Password/>
					</Form.Item>
					<Form.Item label={"手机号"} name={"telephone"}
							   rules={[{required: true, message: "手机号不能为空"},
								   {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: "手机号格式错误"}]}
							   validateTrigger={"onBlur"}>
						<Input/>
					</Form.Item>
					<Form.Item label={"性别"} name={"sex"}>
						<Radio.Group>
							<Radio value={0}>女</Radio>
							<Radio value={1}>男</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item>
						<Dragger name={"file"} method={"POST"} maxCount={1}
								 onRemove={delImage} action={file => upload(file)}>
							<p><UploadOutlined/></p>
							<p>点击上传头像</p>
							<p>或拖动文件到此上传</p>
						</Dragger>
					</Form.Item>
					<Form.Item>
						<Button htmlType={"submit"} type={"primary"}
								style={{float: "right"}} onClick={handleOk}
						>注册</Button>
					</Form.Item>
				</Form>
			</Modal>
		</ProCard>
	)
};

export default Login;
