import {defineConfig} from 'umi';
import router from "./router";

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	routes: router,
	fastRefresh: {},
	mfsu: {},
	layout: {
		layout: "top",
		navTheme: "light",
		title: "blog",
		logo: "http://ravu0uf6r.hn-bkt.clouddn.com/logo.svg"
	},
	proxy: {
		"/api": {
			"target": "http://localhost:8088",
			"changeOrigin": true,
			"pathRewrite": {"^/api" : ""}
		}
	},
	dynamicImport: {}
});
