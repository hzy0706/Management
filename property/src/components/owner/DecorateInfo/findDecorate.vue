<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title"><router-link :to="{name:'Decorate'}" style="font-size: 20px;font-weight: 500;">业主装修</router-link></div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							业主装修详情
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="House" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="申请人">
					<el-input v-model="Decorate.applyName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="申请时间">
					<el-input type="date" v-model="Decorate.applyDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="审批意见">
					<el-input v-model="Decorate.approvalSuggest" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="负责人电话">
					<el-input v-model="Decorate.buildPhone" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收人">
					<el-input v-model="Decorate.checkName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="违约金">
					<el-input v-model="Decorate.penaltyMoney" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="联系电话">
					<el-input v-model="Decorate.decoratePhone" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="装修内容">
					<el-input v-model="Decorate.decorateContent" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工单位">
					<el-input v-model="Decorate.buildUnit" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工开始日期">
					<el-input type="date" v-model="Decorate.buildStartDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收时间">
					<el-input type="date" v-model="Decorate.checkDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="Decorate.decorateRemark" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="装修类别">
					<el-select v-model="Decorate.decorateType" placeholder="请选择装修类别" disabled="disabled">
						<el-option label="业主录入" value="业主录入"></el-option>
						<el-option label="物业录入" value="物业录入"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="装修保证金">
					<el-input v-model="Decorate.decorateBail" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="负责人">
					<el-input v-model="Decorate.buildName" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="施工结束日期">
					<el-input type="date" v-model="Decorate.buildEndDate" disabled="disabled"></el-input>
				</el-form-item>
				<el-form-item label="验收意见">
					<el-input v-model="Decorate.checkSuggest" disabled="disabled"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:580px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="return1()">返回</el-button>
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
			this.Decorate= JSON.parse(sessionStorage.getItem('name'))
		},
		data(){
			return{
				Decorate:{},
			}
		},
		methods:{
			return1(){
				this.$router.push("/Decorate");
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
