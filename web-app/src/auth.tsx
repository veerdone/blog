import {Redirect} from "umi";
import {isLogin} from "@/util/cookie";
import {message} from "antd";

export default (props: any) => {
	const islogin = isLogin();
	if (islogin) {
		return <>{props.children}</>
	} else {
		message.warning("请先登录!");
		return <Redirect to={'/login'} />
	}
}
