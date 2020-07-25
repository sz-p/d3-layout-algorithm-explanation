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
		prevLinks: false,
		nextLinks: false,
		displayAllHeaders: false, // 展开全部侧边栏
		sidebar: require('./config/sidebar'), // 侧边栏配置
		smoothScroll: true,
		docsRepo: 'sz-p/d3-layout-algorithm-explanation',
		lastUpdated: '上次更新',
		editLinks: true,
		docsDir: 'docs',
		docsBranch: 'master',
		editLinkText: '在 GitHub 上编辑此页'
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
		// 显示最后更新时间
		[ '@vuepress/last-updated' ],
	    // show code demo plugin
		[ path.resolve(__dirname, './vuepress-plugin-extract-code') ],
		// 数学公式插件
		'@maginapp/vuepress-plugin-katex',
		// 页面滚动连接自动高亮插件
		[ '@vuepress/active-header-links' ],
		// 图片缩放插件
		[ '@vuepress/medium-zoom' ],
		// 顶部进度条插件
		['vuepress-plugin-nprogress'],

		{
			delimiters: 'dollars'
		}
	],
	less: {
		javascriptEnabled: true
	}
};
