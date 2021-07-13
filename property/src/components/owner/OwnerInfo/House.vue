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
		<el-form :model="House" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="住宅">
					<el-select v-model="House.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
						<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
							:value="item.residenceId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房间">
					<el-select v-model="House.houseId" placeholder="请选择" >
						<el-option v-for="item in houseData2" :key="item.houseId" :label="item.houseName"
							:value="item.houseId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input v-model="House.ohRemark"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="楼宇">
					<el-select v-model="House.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
						<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
							:value="item.buildingId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="房产证号">
					<el-input v-model="House.houseNo"></el-input>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="单元">
					<el-select v-model="House.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
						<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="预计装修时间">
					<el-input type="date" v-model="House.decorateDate"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:400px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="saveHouse()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
	<el-table :data="houseData" stripe :row-style="{height:'40px'}" :cell-style="{padding:'0px'}" class="table"
		ref="multipleTable" header-cell-class-name="table-header"
		:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
		<el-table-column prop="houseName" label="姓名" align="center">
		</el-table-column>
		<el-table-column prop="houseNo" label="房产证号" align="center"></el-table-column>
		<el-table-column prop="decorateDate" label="装修时间" align="center">
		</el-table-column>
		<el-table-column label="操作" width="180" align="center">
			<template #default="scope">
				<el-button @click="deleteClick(scope.row)" type="text" size="small">删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	
	export default{
		created() {
			this.id= JSON.parse(sessionStorage.getItem('name'))
			this.selectAllTOwnerHouseByTid(this.id);
			this.selectAllTResidence();
		},
		data(){
			return{
				id:'',
				House:{},
				houseData:[],
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: []
			}
		},
		methods:{
			selectAllTOwnerHouseByTid(tid) {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTOwnerHouseByTid/" + tid)
					.then(function(response) {
						_this.houseData = response.data.data;
					}).catch(function(error) {
						console.log(error)
				})
			},
			deleteClick(row){
				this.$confirm('此操作将永久删除家属信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const _this = this
					this.axios.delete("http://localhost:8080/Property/deleteByTOwnerHouseKey/" + row.ohId)
						.then(function(response) {
							if (response.data.code == 200) {
								ElMessage.success({
									message: '删除成功',
									type: 'success'
								});
							} else {
								ElMessage.error({
									message: '数据异常,请联系技术部管理员',
									type: 'success'
								});
							}
							_this.selectAllTOwnerHouseByTid(row.ownerId);
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			saveHouse() {
				const _this = this
				this.House.ownerId=this.id
				this.axios.post("http://localhost:8080/Property/addTOwnerHouse", this.House)
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
						_this.selectAllTOwnerHouseByTid(_this.House.ownerId);
						_this.dialogVisible4=false;
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
				this.axios.get("http://localhost:8080/Property/selectAllTBuildingByRid/" + this.House.rid)
					.then(function(response) {
						_this.buildingData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTUnitByBid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTUnitByBid/" + this.House.bid)
					.then(function(response) {
						_this.unitData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTHouseByUid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTHouseByUidAndState/" + this.House.uid)
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
