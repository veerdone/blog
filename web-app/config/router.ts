const router = [
	{
		path: '/', component: '@/pages/index', name: "首页", title: "首页", routes: [
			{path: "/post/write", component: "@/pages/Post/Write", title: "创作", wrappers: ["@/auth"]},
			{path: "/post/:id", component: "@/pages/Post/Post"},
			{path: "/login", component: "@/pages/Login/Login", title: "登录"},
			{path: "/", component: "@/pages/Home/Home"},
		]
	},
];

export default router;