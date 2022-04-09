import {defineConfig} from 'umi';
export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	routes: [
		{
			path: '/', component: '@/pages/index', name: "首页", title: "首页", routes: [
				{path: "/post/write", component: "@/pages/Post/Write", title: "创作"},
				{path: "/post/:id", component: "@/pages/Post/Post"},
				{path: "/", component: "@/pages/Home/Home"},
			]
		},
	],
	fastRefresh: {},
	mfsu: {},
	layout: {
		layout: "top",
		navTheme: "light",
		title: "blog",
	},
	proxy: {
		"/api": {
			"target": "http://localhost:8088",
			"changeOrigin": true,
			"pathRewrite": {"^/api" : ""}
		}
	}
});
