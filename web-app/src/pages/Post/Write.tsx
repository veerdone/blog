import React, {useEffect, useState} from "react";
import Editor, {ToolbarNames} from "md-editor-rt";
import {Button, Input, Form, Modal, Select, message} from "antd";
import ProCard from "@ant-design/pro-card";
import {insertPost, listSort, listTag, updatePostById} from "@/api/post";
import {InputStatus} from "antd/es/_util/statusUtils";
import "md-editor-rt/lib/style.css";
import "./write.css";
import {uploadImage} from "@/api/upload";

const {Option} = Select;

const toolBars: Array<ToolbarNames> = ["bold", "underline", "italic", "strikeThrough", "sub", "sup",
	"-", "quote", "unorderedList", "orderedList",
	"-", "codeRow", "code", "link", "image", "table", "mermaid",
	"-", "revoke", "next", "save", "catalog"];
type Props = {
	postVo?: PostVo,
	closeChange?: Function,
	reFlush?: Function
}

const Write = ({postVo, closeChange, reFlush}: Props) => {
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
		if (postVo) {
			setPost({
				...post,
				postTitle: postVo.postTitle,
				postContent: postVo.postContent,
				postId: postVo.postId,
				postTags: postVo.postTags,
				sortId: postVo.sortId,
				status: postVo.status
			})
		}
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
		updateTime: "",
		userId: ""
	});

	const handleRelease = () => {
		if (post.postTitle.length < 5) {
			message.error("文章标题不能小于5个字");
			return;
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

	const uploadImg = async (files: FileList, callback: (urls: string[]) => void) => {
		const res = await uploadImage(files[0]);
		const url: string[] = [res.data.data];
		callback(url.map(item => item))
	};

	const [form] = Form.useForm();
	const handleCancel = () => {
		setShowFrom(false);
		form.resetFields();
	};


	const handleOk = async () => {
		try {
			form.validateFields();
			setShowFrom(false);
			form.resetFields();
			if (post.postId !== "") {
				const {data} = await updatePostById(post);
				if (data.status === 200) {
					message.success("修改成功!");
				}
				if (closeChange && reFlush) {
					reFlush();
					closeChange(false);
				}
			} else {
				const {data} = await insertPost(post);
				if (data.status === 200) {
					message.success("发布成功,请等待管理员审核通过!")
				}
			}
			setShowFrom(false);
			form.resetFields();
		} catch (e) {

		}
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
						   value={post.postTitle}
						   showCount maxLength={30} status={status}/>
					<Button type={"primary"} onClick={handleRelease}>发布</Button>
				</Input.Group>
			</ProCard>
			<ProCard ghost={true} className={"content"}>
				<Editor modelValue={post.postContent} onChange={s => setPost({...post, postContent: s})}
						theme={"light"} preview={true} toolbars={toolBars}
						tabWidth={4} showCodeRowNumber={true} previewTheme={"github"}
						onUploadImg={uploadImg}
						markedImage={((href, _, desc) => {
							return `<figure>
										<img src="${href}" alt="null" style="width: 20%;height: 10%"/>
										<figcaption>${desc}</figcaption>
									</figure>`
						})}
				/>
			</ProCard>

			<Modal visible={isShowForm} onCancel={handleCancel} onOk={handleOk}
				   title={"选择分类和标签"}>
				<Form form={form} initialValues={{sortId: post.sortId, tag: post.postTags, status: post.status}}>
					<Form.Item label={"分类"} name={"sortId"} rules={[{required: true}]}>
						<Select onChange={value => setPost({...post, sortId: value})}>
							{sort.map(s => {
								return <Option value={s.sortId} key={s.sortId}>{s.sortName}</Option>
							})}
						</Select>
					</Form.Item>
					<Form.Item label={"标签"} name={"tag"}
							   rules={[{required: true}, {type: "array", max: 3, message: "最多选择三个标签"}]}>
						<Select mode={"multiple"} onChange={value => setPost({...post, postTags: value})}>
							{tag.map(t => {
								return <Option value={t.tagId} key={t.tagId}>{t.tagName}</Option>
							})}
						</Select>
					</Form.Item>
					<Form.Item label={"状态"} name={"status"}>
						<Select onChange={value => setPost({...post, status: value})}>
							<Option value={0}>公开</Option>
							<Option value={1}>仅自己可见</Option>
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</ProCard>
	)
};

export default Write;
