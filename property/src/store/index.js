import {
	createStore
} from 'vuex'
const store = createStore({
	state: {
		loginname:"蔡锦康",
		isCollapse: false,
		left: 200,
		lefticon: "el-icon-s-fold",
		leftimg: "none",
		leftlable: "block",
		leftcolor: "#FFF",
		/* 左边颜色 */
		fontcolor: "#28333e",
		/* 左边招牌字体颜色 */
		leftcolorborder: "1px solid #f8f8f9",
		/* 左边招牌底边颜色 */
		leftactioncolor: "#2d8cf0",
		/* 左边导航栏选中颜色 */
		leftindex: 13,
		/* 需要调试[自动更改] */
		leftfontcolor: "#515a6e",
		/* 左边导航栏字体颜色 */
		topcolor: "#fff",
		/* 头部颜色 */
		topfontcolor: "#999",
		/* 头部字体颜色 */
		topiconcolor: "rgb(81, 90, 110)",
		/* 头部图标颜色 */
		topdaohangcolor: "#606266",
		/* 头部当前界面字体颜色 */
		centerlabel: "none",
		centertoptitle: "block" /* 中间头部显示 */
	},
	getters: {
		isCollapse: (state) => {
			return state.isCollapse
		}
	}

})
export default store
