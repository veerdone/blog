import React, {useState} from "react";
import {Descriptions, Avatar, Drawer, Button, Form, Input, Radio, Upload, message} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {currentUserInfo} from "@/pages";
import {deleteImage, uploadImage} from "@/api/upload";
import {getCurrentUser, updateUserById, updateUserByQuery} from "@/api/user";
import {setCookie} from "@/util/cookie";


const {Dragger} = Upload;

const MyInfo = () => {
	const user = currentUserInfo();
	const [isShowForm, setIsShowForm] = useState(false);
	const [form] = Form.useForm();
	const [icon, setIcon] = useState("");

	const handleClose = () => {
		setIsShowForm(false);
		form.resetFields();
	};

	const upload = async (file: any) => {
		const {data} = await uploadImage(file);
		const filename = data.data;
		setIcon(filename);
		return ""
	};

	const delImage = () => {
		if (icon !== "") {
			deleteImage(icon)
		}
	};

	const handleSubmit = async () => {
		try {
			const value = await form.validateFields();
			value.userId = user?.userId;
			if (icon) {
				value.icon = icon;
			}
			const {data} = await updateUserById(value);
			if (data.status === 200) {
				message.success("修改成功");
				const {data} = await getCurrentUser();
				if (data.status === 200) {
					setCookie("currentUser", JSON.stringify(data.data), {expires: 5})
				}
			}
			setIsShowForm(false);
			form.resetFields();
		} catch (e) {
			return ;
		}
	};

	const [isShowPassForm, setIsShowPassForm] = useState(false);
	const [passForm] = Form.useForm();

	const handleChangePass = async () => {
		try {
			const value = await passForm.validateFields();
			value.userId = user?.userId;
			const {data} = await updateUserByQuery(value);
			if (data.status === 200) {
				message.success("修改成功");
			}
			setIsShowPassForm(false);
			passForm.resetFields();
		} catch (e) {
			return ;
		}
	};

	return (
		<>
			<Descriptions title={"我的信息"}>
				<Descriptions.Item label={"头像"}>
					<Avatar src={user?.icon} alt={user?.username} />
				</Descriptions.Item>
				<Descriptions.Item label={"用户名"}>{user?.username}</Descriptions.Item>
				<Descriptions.Item label={"性别"}>{user?.sex? "男" : "女"}</Descriptions.Item>
				<Descriptions.Item label={"账号"}>{user?.account}</Descriptions.Item>
				<Descriptions.Item label={"手机号"}>{user?.telephone}</Descriptions.Item>
				<Descriptions.Item label={"创建时间"}>{user?.createTime}</Descriptions.Item>
			</Descriptions>

			<Button type={"primary"} onClick={() => setIsShowForm(true)} style={{marginRight: "50px"}}>
				修改信息</Button>
			<Button type={"primary"} onClick={() => setIsShowPassForm(true)}>修改密码</Button>

			<Drawer visible={isShowForm} onClose={handleClose} title={"修改用户信息"}>
				<Form form={form} initialValues={{sex: user?.sex}} labelCol={{span: 5}}>
					<Form.Item label={"用户名"} name={"username"} rules={[
						{type: "string", max: 10, message: "用户名最长为10个字符"}
					]}>
						<Input  />
					</Form.Item>
					<Form.Item label={"性别"} name={"sex"}>
						<Radio.Group>
							<Radio value={false}>女</Radio>
							<Radio value={true}>男</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item>
						<Form.Item>
							<Dragger name={"file"} method={"POST"} maxCount={1}
									 onRemove={delImage} action={file => upload(file)}>
								<p><UploadOutlined/></p>
								<p>点击上传头像</p>
								<p>或拖动文件到此上传</p>
							</Dragger>
						</Form.Item>
					</Form.Item>
					<Form.Item>
						<Button type={"primary"} htmlType={"submit"} onClick={handleSubmit}>修改</Button>
					</Form.Item>
				</Form>
			</Drawer>

			<Drawer visible={isShowPassForm} title={"修改密码"} onClose={() => {
				setIsShowPassForm(false);
				passForm.resetFields();
			}}>
				<Form form={passForm} labelCol={{span: 5}}>
					<Form.Item label={"旧密码"} name={"password"} rules={[
						{required: true, message: "请输入旧密码!"},
						{type: "string", max: 20, message: "密码最长为20个字符"}
					]}>
						<Input.Password />
					</Form.Item>
					<Form.Item label={"新密码"} name={"newPassword"} rules={[
						{required: true, message: "请输入新密码!"},
						{type: "string", max: 20, message: "密码最长为20个字符"}
					]}>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button type={"primary"} onClick={handleChangePass}>修改</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	)
};

export default MyInfo;
