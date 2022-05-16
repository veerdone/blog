import React from "react";
import {Result, Button} from "antd";
import {Link} from "umi";

const NotFound = () => {
	return (
		<Result status={404} title={404}
				subTitle={"对不起,页面不存在!"}
				extra={
					<div>
						<Link to={"/"}>
							<Button type={"primary"}>返回首页</Button>
						</Link>
					</div>
				}
				style={{backgroundColor: "white"}}
		/>
	)
};

export default NotFound;
