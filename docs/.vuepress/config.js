const path = require('path');
const IS_PRO = process.env.NODE_ENV === 'production';

// 默认路径 即部署后的路径前缀
const defaultPath = 'd3layoutdoc';

const BASE_URI = IS_PRO ? `/${defaultPath}/` : '/';
const STATIC_PATH = IS_PRO ? `/${defaultPath}/` : '/';

// 用于本地build查看 build之后的产物是否正常
// const BASE_URI = IS_PRO ? '/' : '/';
// const STATIC_PATH = IS_PRO ? `/` : '/';
module.exports = {
	theme: '',
	title: 'D3LayoutDoc',
	description: '基于VuePress的文档模板',
	base: BASE_URI, // 输出站点根路由
	head: [ [ 'link', { rel: 'icon', href: '/assets/logo.png' } ] ],
	dest: path.resolve(__dirname, '../../dist'), // 输出目录
	port: 10000,
	// markdown: {
	//   lineNumbers: false,
	// },
	theme: require.resolve('../../.vuepress/theme'),
	themeConfig: {
		displayAllHeaders: false, // 展开全部侧边栏
		sidebar: require('./config/sidebar'), // 侧边栏配置
		smoothScroll: true,
		lastUpdated: '上次更新'
		// editLinks: false,
	},
	chainWebpack(config) {
		config.resolve.alias.set('vue', 'vue/dist/vue.common.js');
	},
	configureWebpack: (config, isServer) => {
		if (!isServer) {
			config.output.publicPath = STATIC_PATH;
		}
	},
	// configureWebpack: (config, isServer) => {
	//   if (!isServer) {
	//     config.output.publicPath = STATIC_PATH
	//   }
	// },
	plugins: [
		// ['@vuepress/back-to-top', true],
		[ '@vuepress/last-updated' ], // 显示最后更新时间
		[ path.resolve(__dirname, './vuepress-plugin-extract-code') ]
	],
	less: {
		javascriptEnabled: true
	}
};
