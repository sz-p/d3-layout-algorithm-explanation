import * as d3 from 'd3';

export const getDefauteParams = function() {
	this.dom = this.$refs.svgBox;
	this.width = this.dom.clientWidth;
	this.height = this.dom.clientHeight;
	this.color = d3.scaleOrdinal(d3.schemeCategory10);
	this.padding = {
		top: 10,
		right: 40,
		bottom: 40,
		left: 40
	};
};
