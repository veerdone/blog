import React from "react";
import ProCard from "@ant-design/pro-card";
import PostList from "@/components/PostList/PostList";
const Home = () => {
    return (
        <ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}} />
            <ProCard>
                <PostList />
            </ProCard>
            <ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
        </ProCard>
    )
};

export default Home;
