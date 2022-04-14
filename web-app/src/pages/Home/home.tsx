import React from "react";
import ProCard from "@ant-design/pro-card";
import PostList from "@/components/PostList/PostList";
import {BackTop} from "antd";

const Home = () => {
    return (
        <ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}} />
            <ProCard>
				<BackTop>
					<div style={{width: 40, height: 40, backgroundColor: "#1088e9", color: "white", lineHeight: "40px", textAlign: "center", fontSize: "14px", borderRadius: 20}}>
						UP
					</div>
				</BackTop>
                <PostList />
            </ProCard>
            <ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
        </ProCard>
    )
};

export default Home;
