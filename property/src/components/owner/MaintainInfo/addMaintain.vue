<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title"><router-link :to="{name:'Maintain'}" style="font-size: 20px;font-weight: 500;">业主请修</router-link></div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							新增业主请修
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="住宅">
					<el-select v-model="Maintain.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
						<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
							:value="item.residenceId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间">
					<el-select v-model="Maintain.houseId" placeholder="请选择" @change="selectTOwnerHouseByHouseId()">
						<el-option v-for="item in houseData2" :key="item.houseId" :label="item.houseName"
							:value="item.houseId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请时间">
					<el-input type="date" v-model="Maintain.applyDate"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="楼宇">
					<el-select v-model="Maintain.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
						<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
							:value="item.buildingId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="申请人">
					<el-input v-model="Maintain.applyName"></el-input>
				</el-form-item>
				<el-form-item label="请修内容">
					<el-input v-model="Maintain.maintainContent"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="单元">
					<el-select v-model="Maintain.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
						<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="Maintain.maintainPhone"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:400px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="addMaintain()">保存</el-button>
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
			this.selectAllTResidence();
		},
		data(){
			return{
				Maintain:{},
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: [],
			}
		},
		methods:{
			addMaintain(){
				const _this = this
				this.Maintain.createName="胡志远";
				this.axios.post("http://localhost:8080/Property/addTMaintain", this.Maintain)
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
						_this.$router.push("/Maintain");
					}).catch(function(error) {
						console.log(error)
				})
			},
			selectAllTResidence() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTResidence")
					.then(function(response) {
						_this.residenceData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTBuildingByRid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTBuildingByRid/" + this.Maintain.rid)
					.then(function(response) {
						_this.buildingData = response.data.data;
					}).catch(function(error) {
						console.log(error)
				})
			},
			selectAllTUnitByBid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTUnitByBid/" + this.Maintain.bid)
					.then(function(response) {
						_this.unitData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTHouseByUid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTHouseByUid/" + this.Maintain.uid)
					.then(function(response) {
						_this.houseData2 = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectTOwnerHouseByHouseId(){
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectTOwnerHouseByHouseId/" + this.Maintain.houseId)
					.then(function(response) {
						if(response.data.data != null){
							_this.Maintain.applyName = response.data.data.towner.ownerName
							_this.Maintain.maintainPhone = response.data.data.towner.ownerPhone
						}else{
							_this.Maintain.applyName =''
							_this.Maintain.maintainPhone =''
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
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
