module.exports = [
	{
		title: '简介', // 必要的
		path: '/', // 可选的, 标题的跳转链接，应为绝对路径且必须存在
		sidebarDepth: 1, // 可选的, 默认值是 1
		children: [ '/饼图', '/直方图' ]
	}
];

// module.exports = {
// 	'/': {
// 		sidebar: 'auto'
// 	}
// };