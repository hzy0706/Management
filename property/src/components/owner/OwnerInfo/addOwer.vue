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
							添加业主信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="Owner" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="业主姓名" required>
					<el-input v-model="Owner.ownerName"></el-input>
				</el-form-item>
				<el-form-item label="出生日期" required>
					<el-input type="date" v-model="Owner.ownerBirth" required></el-input>
				</el-form-item>
				<el-form-item label="紧急联系人">
					<el-input v-model="Owner.urgentName"></el-input>
				</el-form-item>
				<el-form-item label="紧急联系电话">
					<el-input v-model="Owner.urgentPhone"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="业主类别" required >
					<el-select v-model="Owner.ownerType" placeholder="请选择业主类别">
						<el-option label="正式业主" value="正式业主"></el-option>
						<el-option label="临时业主" value="临时业主"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="业主电话">
					<el-input v-model="Owner.ownerPhone"></el-input>
				</el-form-item>
				<el-form-item label="证件号码">
					<el-input v-model="Owner.ownerNo"></el-input>
				</el-form-item>
				<el-form-item label="工作单位">
					<el-input v-model="Owner.ownerWork"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="业主性别" required>
					<el-radio-group v-model="Owner.ownerSex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="业主民族">
					<el-input v-model="Owner.ownerNation"></el-input>
				</el-form-item>
				<el-form-item label="证件类型">
					<el-select v-model="Owner.ownerNotype" placeholder="请选择证件类型">
						<el-option label="身份证" value="身份证"></el-option>
						<el-option label="护照" value="护照"></el-option>
						<el-option label="驾驶证" value="驾驶证"></el-option>
						<el-option label="营业执照" value="营业执照"></el-option>
						<el-option label="职业资格证" value="职业资格证"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="业主学历">
					<el-select v-model="Owner.ownerEducation" placeholder="请选择业主学历">
						<el-option label="小学" value="小学"></el-option>
						<el-option label="初中" value="初中"></el-option>
						<el-option label="高中" value="高中"></el-option>
						<el-option label="中专" value="中专"></el-option>
						<el-option label="职高" value="职高"></el-option>
						<el-option label="大专" value="大专"></el-option>
						<el-option label="本科" value="本科"></el-option>
						<el-option label="硕士研究生" value="硕士研究生"></el-option>
						<el-option label="博士研究生" value="博士研究生"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:500px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="addOwner()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
	
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	
	export default{
		data(){
			return{
				Owner: {},
			}
		},
		methods:{
			addOwner() {
				const _this = this
				this.axios.post("http://localhost:8080/Property/addTOwner", this.Owner)
					.then(function(response) {
						if (response.data.code == 200) {
							ElMessage.success({
								message: '添加成功',
								type: 'success'
							});
						} else {
							ElMessage.error({
								message: '数据异常,请联系技术部管理员',
								type: 'success'
							});
						}
						_this.$router.push('/Owner');
					}).catch(function(error) {
						console.log(error)
				})
			}
		}
	}
</script>

<style>
	.div1{
		float:left;
		margin-left: 30px;
		margin-top: 30px;
		width: 400px;
		height: 450px;
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
</style>
