const router = [
	{
		path: "/post", routes: [
			{path: "/post/write", component: "@/pages/Post/Write", title: "创作", wrappers: ["@/auth"]},
			{path: "/post/:id", component: "@/pages/Post/Post"},
		]
	},
	{
		path: '/home', component: '@/pages/index', name: "首页", title: "首页", routes: [
			{path: "/home", component: "@/pages/Home/Home"},
		]
	},
	{path: "/sort", component: "@/pages/Sort/Sort", title: "分类", name: "分类"},
	{path: "/tag", component: "@/pages/Tag/Tag", title: "标签", name: "标签"},
	{path: "/login", component: "@/pages/Login/Login", title: "登录"},
	{path: "/myHome", component: "@/pages/MyHome/MyHome", routes: [
			{path: "/myHome/myInfo", component: "@/components/MyInfo/MyInfo", title: "我的信息"},
			{path: "/myHome/myPost", component: "@/components/MyPost/MyPost", title: "我的文章"},
			{path: "/myHome", redirect: "/myHome/MyInfo"}
		]},
	{path: "/", redirect: "/home"},
	{component: "@/components/404/NotFound", title: 404},
];

export default router;
