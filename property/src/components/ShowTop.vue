<template>
	<!-- 头部 -->
	<span class="ham">
		<ul class="el-menu-demo">
			<li class="is-actives" @click="show()" title="折叠侧边栏">
				<i :class="this.$store.state.lefticon" :style="{color:$store.state.topiconcolor,fontSize:18+'px'}"></i>
			</li>
		</ul>
	</span>
	<span class="tool">
	</span>
</template>

<script>
	export default {
		name: 'ShowTop',
		data() {
			return {
				
			}
		},
		methods: {
			show() {
				this.$store.state.isCollapse = !this.$store.state.isCollapse;
				if (this.$store.state.left == 200) {
					this.$store.state.left = 65;
					this.$store.state.lefticon = "el-icon-s-unfold";
					this.$store.state.leftimg = "block";
					this.$store.state.leftlable = "none";
				} else {
					this.$store.state.left = 200;
					this.$store.state.lefticon = "el-icon-s-fold";
					this.$store.state.leftimg = "none";
					this.$store.state.leftlable = "block";
				}
				/* console.log(this.$store.state.isCollapse); */
			}
		}
	}
</script>

<style>
	.ham {
		float: left;
	}

	.is-actives {
		list-style: none;
		position: relative;
		margin: 0;
		padding-left: 0;
	}

	.el-header {
		line-height: 0px;
		background-color: #FFFFFF;
	}

	.el-menu-demo {
		height: 64px;
		width: 42px;
		position: relative;
		margin: 0px;
		padding-left: 0px;
		line-height: 67px;
	}

	.el-menu-demo2 {
		height: 64px;
		width: 150px;
		position: relative;
		margin: 0px;
		padding-left: 0px;
		line-height: 65px;
	}

	.is-actives {
		height: 64px;
		width: 42px;
		cursor: pointer;
		transition: border-color .3s, background-color .3s, color .3s;
		box-sizing: border-box;
	}

	.is-actives:hover {
		background-color: #E6E6E6;
	}

	.tool {
		float: right;
		width: 403px;
	}

	.user-img {
		width: 40px;
		height: 40px;
		border-radius: 20px;
		margin: 10px 0px 10px 10px;
		float: left;
	}

	.is-lableimg {
		width: 150px;
	}

	.user-info {
		position: relative;
		font-size: 15px;
		color: #515a6e;
	}

	.el-label-down-s {
		position: relative;
		margin-left: 10px;
	}

	.el-breadcrumb-label-s {
		height: 64px;
		margin-left: 5px;
	}

	.el-breadcrumb__separator {
		margin: 0 12px;
		font-weight: 400;
		color: #dcdee2;
	}

	.el-breadcrumb__inner {
		color: #999;
	}

	.ivu-dropdown .ivu-select-dropdown {
		overflow: visible;
		max-height: none;
	}

	.ivu-select-dropdown {
		width: inherit;
		max-height: 200px;
		overflow: auto;
		margin: 70px 0;
		padding: 5px 0;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 4px;
		box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
		position: absolute;
		z-index: 900;
		height: 112px;
		width: 112px;
		margin-left: 205px;
	}

	.ivu-dropdown-menu {
		list-style: none;
		height: 100px;
		width: 112px;
		margin: 0px;
		padding: 0px;
		line-height: 33px;
	}

	.i-layout-header-user .ivu-dropdown-item {
		font-size: 14px !important;
		text-align: left;
	}

	.ivu-dropdown-item {
		white-space: normal;
	}

	.ivu-dropdown-item {
		margin: 0;
		line-height: normal;
		padding: 7px 16px;
		clear: both;
		color: #515a6e;
		font-size: 14px !important;
		white-space: nowrap;
		list-style: none;
		cursor: pointer;
		transition: background .2s ease-in-out;
	}

	a {
		text-decoration: none;
		outline: none;
		cursor: pointer;
		transition: color .2s ease;
		color: #515a6e;
		font-weight: 100;
		font-size: 14px;
	}

	.ul-label-tc-s {
		text-decoration: none;
		outline: none;
		cursor: pointer;
		transition: color .2s ease;
		color: #515a6e;
		font-weight: 100;
		font-size: 14px;
	}

	.ivu-dropdown-item {
		margin: 0;
		line-height: normal;
		padding: 7px 16px;
		clear: both;
		color: #515a6e;
		font-size: 14px !important;
		white-space: nowrap;
		list-style: none;
		cursor: pointer;
		transition: background .2s ease-in-out;
	}

	.el-lis-item-bs:hover {
		background-color: #E6E6E6;
	}

	.el-drawer__body {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		height: 100%;
		width: 100%;
		padding: 16px;
		font-size: 14px;
		line-height: 1.5;
		word-wrap: break-word;
		position: absolute;
		overflow: auto;
		width: 248px;
	}

	.el-divider--horizontal {
		margin: 18px 0;
	}

	.ivu-drawer-close {
		z-index: 1;
		font-size: 12px;
		position: absolute;
		right: 8px;
		top: 8px;
		overflow: hidden;
		cursor: pointer;
	}

	.i-layout-header-setting-item {
		display: flex;
		align-items: center;
		padding: 12px 0;
	}

	.i-layout-header-setting-item-radio {
		display: inline-block;
		position: relative;
		margin-right: 16px;
		cursor: pointer;
	}

	.ivu-tooltip,
	.ivu-tooltip-rel {
		display: inline-block;
	}

	.i-layout-header-setting-item-radio {
		cursor: pointer;
	}

	.ivu-tooltip-rel {
		position: relative;
		width: inherit;
	}

	img {
		border-style: none;
	}

	.i-layout-header-setting-item-radio::after {
		content: "";
		display: block;
		width: 6px;
		height: 6px;
		border-radius: 6px;
		background: transparent;
		margin: 0 auto;
	}

	.i-layout-header-setting-item-radio {
		display: inline-block;
		position: relative;
		margin-right: 16px;
		cursor: pointer;
	}

	.ivu-tooltip-rel {
		position: relative;
		width: inherit;
	}

	.i-layout-header-setting-item-radio {
		cursor: pointer;
	}

	/* 通知 */
	.ivu-badge-count {
		line-height: 1;
		vertical-align: middle;
		position: absolute;
		transform: translateX(50%);
		top: -10px;
		right: 0;
		height: 8px;
		border-radius: 10px;
		background: #ed4014;
		border: 1px solid transparent;
		color: #fff;
		line-height: 18px;
		text-align: center;
		padding: 0 4px;
		font-size: 12px;
		white-space: nowrap;
		transform-origin: -10% center;
		z-index: 10;
		box-shadow: 0 0 0 1px #fff;
	}

	.i-layout-header-setting-item {
		display: flex;
		align-items: center;
		padding: 12px 0;
	}

	.i-layout-header-setting-item-desc {
		flex: 1 1;
		font-size: 14px;
		margin-right: 120px;
	}

	.pointOfS::after {
		background: #18B566;
	}
</style>
