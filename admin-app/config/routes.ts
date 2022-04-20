export default [
	{
		path: '/login',
		layout: false,
		routes: [
			{
				path: '/login',
				name: '登录',
				component: './user/Login',
				title: "登录"
			},
			{
				component: './404',
			},
		],
	},
	{
		path: '/welcome',
		name: '首页',
		icon: 'smile',
		component: './Welcome',
	},
	{
		path: "/post",
		name: "文章管理",
		icon: "file",
		routes: [
			{
				path: "./review",
				component: "@/pages/post/review/Review",
				name: "文章审核",
				title: "文章审核"
			},
			{
				path: "./list",
				component: "@/pages/post/list",
				name: "所有文章",
				title: "所有文章"
			},
		]
	},
	{
		path: "/user",
		name: "用户管理",
		icon: "user",
		routes: [
			{
				path: "./list",
				component: "@/pages/user/list",
				name: "所有用户",
				title: "所有用户"
			}
		]
	},
	{
		path: "/system",
		name: "系统管理",
		icon: "appstore",
		routes: [
			{
				path: "./login-history",
				component: "@/pages/system/loginHistory",
				name: "登录历史",
				title: "登录历史"
			}
		]
	},
	{
		path: "/my",
		name: "个人",
		icon: "home",
		routes: [
			{
				path: "./center",
				component: "@/pages/my/center",
				name: "个人主页",
				title: "个人主页"
			}
		]
	},
	{
		path: "/view/:id",
		component: "@/pages/post/view",
		layout: false
	},
	{
		path: '/',
		redirect: '/welcome',
	},
	{
		component: './404',
	},
];
