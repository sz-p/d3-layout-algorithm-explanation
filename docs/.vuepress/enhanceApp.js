// .vuepress/enhanceApp.js
import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default async ({ Vue, router, isServer }) => {
	Vue.use(Element);
	Vue.use(router);

	// 以下加载项都包含 window 或 document 全局变量 打包打不过去 只能丢在这里，
	// 动态加载会出现加载顺序问题，只能静态加载
	if (!isServer) {
		const dat = await import('dat.gui');
		Vue.prototype.dat = dat;
	}
};
