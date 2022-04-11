import React, {useEffect, useState} from "react";
import Editor, {ToolbarNames} from "md-editor-rt";
import {Button, Input, Form, Modal, Select, message} from "antd";
import ProCard from "@ant-design/pro-card";
import {insertPost, listSort, listTag} from "@/api/post";
import {InputStatus} from "antd/es/_util/statusUtils";
import "md-editor-rt/lib/style.css";
import "./write.css";

const {Option} = Select;

const toolBars: Array<ToolbarNames> = ["bold", "underline", "italic", "strikeThrough", "sub", "sup",
	"-", "quote", "unorderedList", "orderedList",
	"-", "codeRow", "code", "link", "image", "table", "mermaid",
	"-", "revoke", "next", "save", "catalog"];

const Write = () => {
	const [sort, setSort] = useState<Sort[]>([]);
	const [tag, setTag] = useState<Tag[]>([]);

	const getSort = async () => {
		const {data} = await listSort();
		setSort(data.list)
	};

	const getTag = async () => {
		const {data} = await listTag();
		setTag(data.list);
	};

	useEffect(() => {
		getSort();
		getTag();
	}, []);

	const [isShowForm, setShowFrom] = useState(false);
	const [status, setStatus] = useState<InputStatus>("");
	const [post, setPost] = useState<Post>({
		createTime: "",
		postContent: "",
		postId: "",
		postLikes: "",
		postTags: [],
		postTitle: "",
		postViews: "",
		sortId: "",
		status: "",
		titlePicture: "",
		updateTIme: "",
		userId: ""
	});
	const handleRelease = () => {
		if (post.postTitle.length < 5) {
			message.error("文章标题不能小于5个字");
		}
		if (post.postContent.length === 0 || post.postContent === "") {
			message.error("文章内容不能为空");
			return;
		}
		if (post.postContent.length < 200) {
			message.error("内容不能低于200个字");
			return;
		}
		setShowFrom(true);
	};

	const [form] = Form.useForm();
	const handleCancel = () => {
		setShowFrom(false);
		form.resetFields();
	};


	const handleOk = () => {
		form.validateFields().then(value => {
			setShowFrom(false);
			form.resetFields();
			insertPost(post).then(res => {
				if (res.data.status === 200) {
					message.success("发布成功,等待管理员审核");
				}
			})
		}).catch(error => {})
	};

	return (
		<ProCard direction={"column"}>
			<ProCard ghost={true}>
				<Input.Group>
					<Input placeholder={"请输入标题"} style={{width: 'calc(100% - 100px)'}}
						   onChange={(e) => {
						   	setPost({...post, postTitle: e.target.value});
						   	e.target.value.length < 5 ? setStatus("error") : setStatus("");
						   }}
						   showCount maxLength={30} status={status}/>
					<Button type={"primary"} onClick={handleRelease}>发布</Button>
				</Input.Group>
			</ProCard>
			<ProCard ghost={true} className={"content"}>
				<Editor modelValue={post.postContent} onChange={s => setPost({...post, postContent: s})}
						theme={"light"} preview={true} toolbars={toolBars}
						tabWidth={4} showCodeRowNumber={true} previewTheme={"github"}
				/>
			</ProCard>

			<Modal visible={isShowForm} onCancel={handleCancel} onOk={handleOk}
				title={"选择分类和标签"}>
				<Form form={form}>
					<Form.Item label={"分类"} name={"sort"} rules={[{required: true}]}>
						<Select onChange={value => setPost({...post, sortId: value})}>
							{sort.map(s => {
								return <Option value={s.sortId} key={s.sortId}>{s.sortName}</Option>
							})}
						</Select>
					</Form.Item>
					<Form.Item label={"标签"} name={"tag"} rules={[{required: true}]}>
						<Select mode={"multiple"} onChange={value => setPost({...post, postTags: value})}>
							{tag.map(t => {
								return <Option value={t.tagId} key={t.tagId}>{t.tagName}</Option>
							})}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</ProCard>
	)
};

export default Write;
