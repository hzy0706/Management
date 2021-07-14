<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title"><router-link :to="{name:'Inspection'}" style="font-size: 20px;font-weight: 500;">业主验房</router-link></div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							添加验房信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="Inspectionroominfo" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="住宅">
					<el-select v-model="Inspectionroominfo.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
						<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
							:value="item.residenceId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间">
					<el-select v-model="Inspectionroominfo.houseId" placeholder="请选择" @change="selectAllTHouseByUid()">
						<el-option v-for="item in houseData2" :key="item.houseId" :label="item.houseName"
							:value="item.houseId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="验收项目">
					<el-select v-model="Inspectionroominfo.irType" placeholder="请选择验收项目">
						<el-option label="窗户" value="窗户"></el-option>
						<el-option label="窗台" value="窗台"></el-option>
						<el-option label="地板" value="地板"></el-option>
						<el-option label="墙面" value="墙面"></el-option>
						<el-option label="天花板" value="天花板"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="业主意见">
					<el-input v-model="Inspectionroominfo.irOwnerSuggest"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="楼宇">
					<el-select v-model="Inspectionroominfo.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
						<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
							:value="item.buildingId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="验收日期">
					<el-input type="date" v-model="Inspectionroominfo.acceptanceDate"></el-input>
				</el-form-item>
				<el-form-item label="是否合格">
					<el-select v-model="Inspectionroominfo.isOk" placeholder="请选择是否合格">
						<el-option label="合格" value="0"></el-option>
						<el-option label="不合格" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="物业意见">
					<el-input v-model="Inspectionroominfo.irPropertySuggest"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="单元">
					<el-select v-model="Inspectionroominfo.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
						<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="确认日期">
					<el-input type="date" v-model="Inspectionroominfo.confirmationDate"></el-input>
				</el-form-item>
				<el-form-item label="验收人员">
					<el-input v-model="Inspectionroominfo.irName"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="Inspectionroominfo.irRemark"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:520px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="addInspectionroominfo()">保存</el-button>
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
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: [],
				Inspectionroominfo:{}
			}
		},
		methods:{
			addInspectionroominfo(){
				const _this = this
				this.axios.post("http://localhost:8080/Property/addTInspectionroominfo", this.Inspectionroominfo)
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
						_this.$router.push("/Inspection");
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
				this.axios.get("http://localhost:8080/Property/selectAllTBuildingByRid/" + this.Inspectionroominfo.rid)
					.then(function(response) {
						_this.buildingData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTUnitByBid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTUnitByBid/" + this.Inspectionroominfo.bid)
					.then(function(response) {
						_this.unitData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTHouseByUid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTHouseByUid/" + this.Inspectionroominfo.uid)
					.then(function(response) {
						_this.houseData2 = response.data.data;
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
