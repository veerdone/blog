import React, {useEffect, useState} from "react";
import {history} from "umi";
import {getCurrentUser} from "@/api/user";
import {isLogin} from "@/util/cookie";
import {Avatar, Input, Comment as AntComment, Button, Divider, message, Modal} from "antd";
import {UserOutlined, CommentOutlined} from "@ant-design/icons";
import {getCommentList, insertComment} from "@/api/comment";

const {TextArea} = Input;

interface Props {
	postId: string
}

const Comment = (props: Props) => {
	const [user, setUser] = useState<User>({
		account: "",
		createTime: "",
		fans: 0,
		focus: 0,
		icon: "",
		likes: 0,
		password: "",
		sex: false,
		status: false,
		telephone: "",
		userId: "",
		username: ""
	});

	const getUser = async () => {
		const {data} = await getCurrentUser();
		setUser(data.data);
	};

	useEffect(() => {
		if (isLogin()) {
			getUser();
		}
	}, []);

	const [commentList, setCommentList] = useState<IComment[]>([]);
	const getComment = async () => {
		const {data} = await getCommentList(props.postId);
		setCommentList(data.list);
	};
	useEffect(() => {
		getComment();
	}, []);

	const isMy = (userId: string, username: string) => {
		if (userId === user.userId) {
			return <span>我</span>
		}
		return <span>{username}</span>
	};

	const [myComment, setMyComment] = useState("");
	const releaseComment = () => {
		const comment = {
			postId: props.postId,
			commentContent: myComment,
			commentType: 0
		};
		insertComment(comment).then(res => {
			if (res.data.status === 200) {
				setMyComment("");
				message.success("发布评论成功");
				getComment();
			}
		});
	};

	const [replyComment, setReplyComment] = useState({
		toUserId: "",
		content: "",
		toCommentId: ""
	});
	const [showInputReply, setShowInputReply] = useState(false);

	const clickReply = (toUserId: string, toCommentId: string) => {
		setShowInputReply(true);
		setReplyComment({...replyComment, toUserId: toUserId, toCommentId: toCommentId})
	};

	const releaseReply = () => {
		if (replyComment.content === "") {
			message.error("回复内容不能为空");
			return
		}
		const comment = {
			toUserId: replyComment.toUserId,
			commentContent: replyComment.content,
			postId: props.postId,
			commentType: 1,
			toCommentId: replyComment.toCommentId
		};
		insertComment(comment).then(res => {
			if (res.data.status === 200) {
				setShowInputReply(false);
				message.success("回复成功");
				setReplyComment({toCommentId: "", content: "", toUserId: ""});
				getComment();
			}
		})
	};

	return (
		<>
			<Divider/>
			{isLogin() && (
				<>
					<AntComment avatar={<Avatar src={user.icon}/>}
								content={<TextArea showCount placeholder={"请输入评论!"}
												   autoSize={{minRows: 2, maxRows: 6}}
												   onChange={value => setMyComment(value.target.value)}
												   value={myComment}/>}
					/>
				</>
			)}
			{!isLogin() && (
				<>
					<AntComment avatar={<Avatar icon={<UserOutlined/>}/>}
								content={<TextArea showCount placeholder={"请输入评论!"}
												   autoSize={{minRows: 2, maxRows: 6}}
										onChange={() => {
											message.warning("请先登录");
											history.push("/login");
										}}/>}
					/>
				</>
			)}
			<Button type={"primary"} onClick={releaseComment}>评论</Button>
			<Divider/>
			{commentList.filter(comment => {
				return comment.commentType === 0
			}).map(comment => {
				return (
					<AntComment content={comment.commentContent} author={isMy(comment.fromUserId, comment.fromUsername)} key={comment.commentId}
								avatar={<Avatar src={comment.fromUserIcon} alt={comment.fromUsername}/>}
								datetime={<span>{comment.commentCreateTime}</span>}
								actions={[<span onClick={() => clickReply(comment.fromUserId, comment.commentId)}><CommentOutlined/>回复</span>]}>
						{commentList.filter(c => {
							return c.toUserId === comment.fromUserId && c.toCommentId == comment.commentId
						}).map(c2 => {
								return (
									<AntComment content={c2.commentContent} key={c2.commentId}
												author={
													<span>{isMy(c2.fromUserId, c2.fromUsername)} 回复 {isMy(c2.toUserId, c2.toUsername)}</span>}
												avatar={<Avatar src={c2.fromUserIcon} alt={c2.fromUsername}/>}
												datetime={<span>{c2.commentCreateTime}</span>}
									/>
								)
							})}
					</AntComment>)
			})}
			<Modal visible={showInputReply} onCancel={() => {
				setShowInputReply(false);
				setReplyComment({toUserId: "", content: "", toCommentId: ""});
			}} title={"回复"} onOk={releaseReply}>
				<TextArea value={replyComment.content} onChange={value => setReplyComment({...replyComment, content: value.target.value})}
						  autoSize={{minRows: 2, maxRows: 6}} placeholder={"请输入回复"}/>
			</Modal>
		</>
	)
};

export default Comment;
