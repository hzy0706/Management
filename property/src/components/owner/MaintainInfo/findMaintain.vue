<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title"><router-link :to="{name:'Owner'}" style="font-size: 20px;font-weight: 500;">业主信息</router-link></div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							业主房产信息维护
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="申请人">
					<el-input v-model="Maintain.applyName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="请修内容">
					<el-input v-model="Maintain.maintainContent" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工单位">
					<el-input v-model="Maintain.buildUnit" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工开始日期">
					<el-input type="date" v-model="Maintain.buildStartDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收时间">
					<el-input type="date" v-model="Maintain.checkDate" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="联系电话">
					<el-input v-model="Maintain.maintainPhone" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="修理费用">
					<el-input v-model="Maintain.maintainBail" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input v-model="Maintain.buildName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工结束日期">
					<el-input type="date" v-model="Maintain.buildEndDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收意见">
					<el-input v-model="Maintain.checkSuggest" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="申请时间">
					<el-input type="date" v-model="Maintain.applyDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="审批意见">
					<el-input v-model="Maintain.approvalSuggest" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="Maintain.buildPhone" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收人">
					<el-input v-model="Maintain.checkName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="Maintain.maintainRemark" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:550px;left: 570px;">
				<el-button type="primary" style="width: 100px;" @click="return1()">返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	
	export default{
		created() {
			this.Maintain= JSON.parse(sessionStorage.getItem('name'))
		},
		data(){
			return{
				Maintain:{},
			}
		},
		methods:{
			return1(){
				this.$router.push("/Maintain");
			}
		}
	}
</script>

<style>
	.table {
		margin-left: 20px;
		width: 95%;
		font-size: 14px;
	}
	.div1{
		float:left;
		margin-left: 30px;
		margin-top: 30px;
		width: 400px;
		height: 300px;
	}
	.el-select-table-two-s {
		margin-top: 15px;
		margin-right: 30px;
		float: right;
	}
	
	.el-center-top-labels {
		background-color: #FFF;
		height: 99px;
		margin-bottom: 20px;
	}
	
	.el-col {
		border-radius: 0px;
	}
	
	.el-center-title-content {
		padding: 16px 32px 0 32px;
	}
	
	.ivu-page-header-title {
		margin-bottom: 16px;
	}
	
	.ivu-page-header-title {
		display: inline-block;
		color: #17233d;
		font-weight: 500;
		font-size: 20px;
	}
	.el-button {
		width: min-content;
	}
	.ivu-divider {
		margin: 0 8px;
		display: inline-block;
		height: .9em;
		width: 1px;
		vertical-align: middle;
		position: relative;
		top: -.06em;
		font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
		font-size: 14px;
		line-height: 1.5;
		color: #515a6e;
		box-sizing: border-box;
		list-style: none;
		background: #e8eaec;
	}
</style>
