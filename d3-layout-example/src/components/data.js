export default {
	name: '中国',
	value: '950',
	children: [
		{
			name: '浙江',
			value: '450',
			children: [
				{
					name: '杭州',
					value: '150',
					children: [ { name: '临安区', value: '150' } ]
				},
				{ name: '宁波', value: '120' },
				{ name: '温州', value: '130' },
				{ name: '绍兴', value: '50' }
			]
		},
		{
			name: '广西',
			value: '200',
			children: [
				{ name: '桂林', value: '80' },
				{ name: '南宁', value: '50' },
				{ name: '柳州', value: '30' },
				{ name: '防城港', value: '40' }
			]
		},
		{
			name: '黑龙江',
			value: '200',
			children: [
				{ name: '哈尔滨', value: '50' },
				{ name: '齐齐哈尔', value: '40' },
				{ name: '牡丹江', value: '60' },
				{ name: '大庆', value: '50' }
			]
		},
		{
			name: '新疆',
			value: '100',
			children: [
				{ name: '乌鲁木齐', value: '30' },
				{ name: '克拉玛依', value: '20' },
				{ name: '吐鲁番', value: '25' },
				{ name: '哈密', value: '25' }
			]
		}
	]
};
