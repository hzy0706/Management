<template>
	<!-- 左侧导航栏 -->
	<div class="logo"
		v-bind:style="{background:this.$store.state.leftcolor , borderBottom:$store.state.leftcolorborder , color:$store.state.fontcolor}">
		<div class="el-label-s" :style="{display:this.$store.state.leftlable}">物业系统</div>
		<img src="../assets/1.jpg" class="el-img-s" :style="{display:this.$store.state.leftimg}" />
	</div>
	<el-row class="tac">
		<el-col :span="24">
			<el-menu default-active="0" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				:background-color="this.$store.state.leftcolor" :text-color="this.$store.state.leftfontcolor"
				:active-text-color="this.$store.state.leftactioncolor" :unique-opened="true"
				:collapse-transition="false" :router="true" :collapse="this.$store.state.isCollapse">
				<!-- <el-menu-item index="/HomePage">
					<i class="el-icon-setting"></i>
					<span slot="title">首页</span>
				</el-menu-item> -->
				<el-submenu index="1">
					<template #title>
						<i class="el-icon-user-solid"></i>
						<span>业主管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/Owner">业主信息</el-menu-item>
						<el-menu-item index="/Inspection">业主验房</el-menu-item>
						<el-menu-item index="/Decorate">业主装修</el-menu-item>
						<el-menu-item index="/Occupancy">业主入住</el-menu-item>
						<el-menu-item index="/Maintain">请修管理</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template #title>
						<i class="el-icon-user-solid"></i>
						<span>商铺管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/Tenant">商户管理</el-menu-item>
						<el-menu-item index="/Lease">租赁管理</el-menu-item>
						<el-menu-item index="/Market">销售管理</el-menu-item>
						<el-menu-item index="/Shop">商铺管理</el-menu-item>
						<el-menu-item index="/Statistics">统计报表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template #title>
						<i class="el-icon-notebook-2"></i>
						<span>费项管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/costitem">							
								<span>常规费项</span>
						</el-menu-item>
						<el-menu-item index="">
										公摊费项
						</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		name: 'ShowLeft',
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.el-submenu [class^="el-icon-"],
	.el-menu-item [class^="el-icon-"] {
		margin-right: 10px;
	}

	.el-submenu .el-menu-item {
		min-width: 0px;
	}

	.el-submenu,
	.el-menu-item {
		margin-left: 0px;
		position: relative;
	}

	.logo {
		position: relative;
		top: 0px;
		height: 64px;
		line-height: 64px;
		cursor: pointer;
	}

	.logo>div {
		font-size: 25px;
		text-align: left;
		padding-left: 40px;
		font-weight: 100;
	}

	.el-col-24 {
		text-align: left;
	}

	.el-img-s {
		width: 40px;
		height: 40px;
		border-radius: 0px;
		margin: 10px 10px 10px 10px;
		float: left;
	}

	.el-label-s {
		display: none;
	}

	.el-menu {
		border: 0px;
	}

	.el-menu-item-group__title {
		padding: 0px;
	}
</style>
