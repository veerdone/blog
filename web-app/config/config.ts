import {defineConfig} from 'umi';

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	routes: [
		{
			path: '/', component: '@/pages/index', name: "首页", title: "首页", routes: [
				{path: "/post/:id", component: "@/pages/Post/Post"},
				{path: "/", component: "@/pages/Home/Home"},
			]
		},
	],
	fastRefresh: {},
	layout: {
		layout: "top",
		navTheme: "light",
		title: "blog",
		rightContentRender: null
	},
	proxy: {
		"/api": {
			"target": "http://localhost:8088",
			"changeOrigin": true,
			"pathRewrite": {"^/api" : ""}
		}
	}
});
