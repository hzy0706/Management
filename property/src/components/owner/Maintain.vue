<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title">请修管理</div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							管理物业系统中业主请修的相关信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="pageInfo.state" placeholder="请修状态" class="handle-select mr10" @change="selectAllTMaintainByState()">
					<el-option key="1" label="待审核" value="0"></el-option>
					<el-option key="2" label="通过审核" value="1"></el-option>
					<el-option key="3" label="已验收" value="2"></el-option>
					<el-option key="4" label="已作废" value="3"></el-option>
					<el-option key="5" label="全部" value="4"></el-option>
				</el-select>
				<el-input v-model="pageInfo.value" placeholder="可根据装修申请人、装修内容查询" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="selectAllTDecorateByState()">搜索</el-button>
			</div>
			<div class="el-select-table-two-s">
				<el-button style="margin-right: 20px;" @click="addClick()" type="success">+ 增加</el-button>
			</div>
			<el-table :data="tableData" height="400" :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" stripe
				class="table" ref="multipleTable" header-cell-class-name="table-header"
				:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
				<el-table-column type="index" :index="indexMethod" label="编号" min-width="120px">
				</el-table-column>
				<el-table-column label="房产名" align="center" :show-overflow-tooltip='true'>
					<template #default="scope">
						<a @click="controller(scope.row)"
							style="text-decoration:underline;color: blue;">{{scope.row.houseName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="applyName" label="申请人" align="center"></el-table-column>
				<el-table-column prop="applyDate" label="申请日期" align="center"></el-table-column>
				<el-table-column prop="maintainBail" label="修理费用" align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<p style="color:red" v-if="scope.row.maintainState==0">待审核</p>
						<p style="color:green" v-if="scope.row.maintainState==1">审核通过</p>
						<p style="color:blue" v-if="scope.row.maintainState==2">已验收</p>
						<p style="color:gray" v-if="scope.row.maintainState==3">已作废</p>
					</template>
				</el-table-column>
				<el-table-column prop="maintainContent" label="请修内容" align="center" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column prop="approvalName" label="审批人员" align="center"></el-table-column>
				<el-table-column prop="approvalDate" label="审批时间" align="center"></el-table-column>
				<el-table-column prop="approvalSuggest" label="审批意见" align="center" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column prop="checkSuggest" label="验收意见" align="center" :show-overflow-tooltip='true'></el-table-column>
			</el-table>
			<div class="block">
				<!-- 分页 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pagesize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</div>
	</div>
	<el-dialog title="新增业主请修" v-model="dialogVisible" width="50%" :before-close="handleClose">
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<el-form-item label="住宅">
				<el-select v-model="Maintain.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
					<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
						:value="item.residenceId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="楼宇">
				<el-select v-model="Maintain.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
					<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
						:value="item.buildingId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单元">
				<el-select v-model="Maintain.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
					<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
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
			<el-form-item label="申请人">
				<el-input v-model="Maintain.applyName"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Maintain.maintainPhone"></el-input>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Maintain.applyDate"></el-input>
			</el-form-item>
			<el-form-item label="请修内容">
				<el-input v-model="Maintain.maintainContent"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addMaintain()">保存</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="审核/编辑/删除请修信息" v-model="dialogVisible2" width="50%" :before-close="handleClose">
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Maintain.applyName"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Maintain.maintainPhone"></el-input>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Maintain.applyDate"></el-input>
			</el-form-item>
			<el-form-item label="请修内容">
				<el-input v-model="Maintain.maintainContent"></el-input>
			</el-form-item>
			<el-form-item label="修理费用">
				<el-input v-model="Maintain.maintainBail"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Maintain.approvalSuggest"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateMaintain()">保存</el-button>
				<el-button type="danger" @click="deleteMaintain()">删除</el-button>
				<el-button type="warning" @click="appMaintain()">审核</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="验收/作废请修信息" v-model="dialogVisible3" width="50%" :before-close="handleClose">
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Maintain.applyName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Maintain.maintainPhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Maintain.applyDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="请修内容">
				<el-input v-model="Maintain.maintainContent" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="修理费用">
				<el-input v-model="Maintain.maintainBail" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Maintain.approvalSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工单位">
				<el-input v-model="Maintain.buildUnit"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-input v-model="Maintain.buildName"></el-input>
			</el-form-item>
			<el-form-item label="负责人电话">
				<el-input v-model="Maintain.buildPhone"></el-input>
			</el-form-item>
			<el-form-item label="施工开始日期">
				<el-input type="date" v-model="Maintain.buildStartDate"></el-input>
			</el-form-item>
			<el-form-item label="施工结束日期">
				<el-input type="date" v-model="Maintain.buildEndDate"></el-input>
			</el-form-item>
			<el-form-item label="验收人">
				<el-input v-model="Maintain.checkName"></el-input>
			</el-form-item>
			<el-form-item label="验收时间">
				<el-input type="date" v-model="Maintain.checkDate"></el-input>
			</el-form-item>
			<el-form-item label="验收意见">
				<el-input v-model="Maintain.checkSuggest"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="Maintain.maintainRemark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="processMaintain()">验收</el-button>
				<el-button type="danger" @click="inidedMaintain()">作废</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="请修详细信息" v-model="dialogVisible4" width="50%" :before-close="handleClose">
		<el-form :model="Maintain" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Maintain.applyName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Maintain.maintainPhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Maintain.applyDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="请修内容">
				<el-input v-model="Maintain.maintainContent" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="修理费用">
				<el-input v-model="Maintain.maintainBail" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Maintain.approvalSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工单位">
				<el-input v-model="Maintain.buildUnit" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-input v-model="Maintain.buildName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="负责人电话">
				<el-input v-model="Maintain.buildPhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工开始日期">
				<el-input type="date" v-model="Maintain.buildStartDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工结束日期">
				<el-input type="date" v-model="Maintain.buildEndDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收人">
				<el-input v-model="Maintain.checkName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收时间">
				<el-input type="date" v-model="Maintain.checkDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收意见">
				<el-input v-model="Maintain.checkSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="Maintain.maintainRemark" disabled="disabled"></el-input>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	export default {
		data() {
			return {
				pageInfo: {
					currentPage: 1,
					pagesize: 5,
					total: 0,
					state:'4',
					value:''
				},
				tableData:[],
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: [],
				dialogVisible:false,
				dialogVisible2:false,
				dialogVisible3:false,
				dialogVisible4:false,
				Maintain:{
					maintainId:'',
					houseId:'',
					applyName:'',
					maintainPhone:'',
					createName:'',
					createDate:'',
					maintainState:'',
					maintainContent:'',
					maintainBail:'',
					approvalSuggest:'',
					approvalName:'',
					approvalDate:'',
					buildUnit:'',
					buildName:'',
					buildPhone:'',
					buildStartDate:'',
					buildEndDate:'',
					checkName:'',
					checkDate:'',
					checkSuggest:'',
					maintainRemark:'',
					houseName:'',
					applyDate:'',
					rid:'',
					bid:'',
					uid:''
				},
			}
		},
		created() {
			this.selectAllTMaintainByState();
		},
		methods: {
			controller(row){
				if(row.maintainState==0){
					this.Maintain.maintainId = row.maintainId;
					this.Maintain.applyName = row.applyName;
					this.Maintain.maintainPhone = row.maintainPhone;
					this.Maintain.applyDate = row.applyDate;
					this.Maintain.houseName = row.houseName;
					this.Maintain.houseId = row.houseId;
					this.Maintain.maintainContent = row.maintainContent;
					this.dialogVisible2=true;
				}
				if(row.maintainState==1){
					this.Maintain.maintainId = row.maintainId;
					this.Maintain.applyName = row.applyName;
					this.Maintain.maintainPhone = row.maintainPhone;
					this.Maintain.applyDate = row.applyDate;
					this.Maintain.houseName = row.houseName;
					this.Maintain.houseId = row.houseId;
					this.Maintain.maintainContent = row.maintainContent;
					this.Maintain.maintainBail = row.maintainBail;
					this.Maintain.approvalSuggest = row.approvalSuggest;
					this.Maintain.approvalDate=row.approvalDate;
					this.Maintain.approvalName=row.approvalName;
					this.dialogVisible3=true;
				}
				if(row.maintainState==2 || row.maintainState==3){
					this.Maintain.maintainId = row.maintainId;
					this.Maintain.applyName = row.applyName;
					this.Maintain.maintainPhone = row.maintainPhone;
					this.Maintain.applyDate = row.applyDate;
					this.Maintain.houseName = row.houseName;
					this.Maintain.houseId = row.houseId;
					this.Maintain.maintainContent = row.maintainContent;
					this.Maintain.maintainBail = row.maintainBail;
					this.Maintain.approvalSuggest = row.approvalSuggest;
					this.Maintain.approvalDate=row.approvalDate;
					this.Maintain.approvalName=row.approvalName;
					this.Maintain.buildUnit=row.buildUnit;
					this.Maintain.buildName=row.buildName;
					this.Maintain.buildPhone=row.buildPhone;
					this.Maintain.buildStartDate=row.buildStartDate;
					this.Maintain.buildEndDate=row.buildEndDate;
					this.Maintain.checkName=row.checkName;
					this.Maintain.checkDate=row.checkDate;
					this.Maintain.checkSuggest=row.checkSuggest;
					this.Maintain.maintainRemark=row.maintainRemark;
					this.dialogVisible4=true;
				}
			},
			inidedMaintain(){
				const _this = this
				this.Maintain.buildUnit=null;
				this.Maintain.buildName=null;
				this.Maintain.buildPhone=null;
				this.Maintain.buildStartDate=null;
				this.Maintain.buildEndDate=null;
				this.Maintain.checkName=null;
				this.Maintain.checkDate=null;
				this.Maintain.checkSuggest=null;
				this.Maintain.maintainRemark=null;
				this.Maintain.maintainState=3;
				this.axios.put("http://localhost:8080/Property/updateByTMaintainKeySelective", this.Maintain)
					.then(function(response) {
						if (response.data.code == 200) {
							ElMessage.success({
								message: '作废成功',
								type: 'success'
							});
						} else {
							ElMessage.error({
								message: '数据异常,请联系技术部管理员',
								type: 'success'
							});
						}
						_this.dialogVisible3=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			processMaintain(){
				const _this = this
				this.Maintain.maintainState=2;
				this.axios.put("http://localhost:8080/Property/updateByTMaintainKeySelective",this.Maintain)
					.then(function(response) {
						if (response.data.code == 200) {
							ElMessage.success({
								message: '验收成功',
								type: 'success'
							});
						} else {
							ElMessage.error({
								message: '数据异常,请联系技术部管理员',
								type: 'success'
							});
						}
						_this.dialogVisible3=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			appMaintain(){
				const _this = this
				this.Maintain.maintainState=1;
				this.Maintain.approvalName='胡志远';
				var date = new Date();
				this.Maintain.approvalDate=date;
				this.axios.put("http://localhost:8080/Property/updateByTMaintainKeySelective",this.Maintain)
					.then(function(response) {
						if (response.data.code == 200) {
							ElMessage.success({
								message: '审核成功',
								type: 'success'
							});
						} else {
							ElMessage.error({
								message: '数据异常,请联系技术部管理员',
								type: 'success'
							});
						}
						_this.dialogVisible2=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			deleteMaintain(){
				const _this = this
				this.axios.delete("http://localhost:8080/Property/deleteByTMaintainKey/"+this.Maintain.maintainId)
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
						_this.dialogVisible2=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			updateMaintain(){
				const _this = this
				this.Maintain.maintainBail=null;
				this.Maintain.approvalSuggest=null;
				this.axios.put("http://localhost:8080/Property/updateByTMaintainKeySelective", this.Maintain)
					.then(function(response) {
						if (response.data.code == 200) {
							ElMessage.success({
								message: '修改成功',
								type: 'success'
							});
						} else {
							ElMessage.error({
								message: '数据异常,请联系技术部管理员',
								type: 'success'
							});
						}
						_this.dialogVisible2=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			addClick(){
				this.selectAllTResidence();
				this.dialogVisible=true;
			},
			addMaintain(){
				const _this = this
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
						_this.dialogVisible=false;
						_this.selectAllTMaintainByState();
						Object.keys(_this.Maintain).forEach((key) => (_this.Maintain[key] = ''))
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
						console.log(response)
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
			selectAllTMaintainByState(){
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTMaintainByState", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.data.list;
						_this.pageInfo.total = response.data.data.total
					}).catch(function(error) {
						console.log(error)
				})
			},
			handleClose() {
				Object.keys(this.Maintain).forEach((key) => (this.Maintain[key] = ''))
				this.dialogVisible = false;
				this.dialogVisible2 = false;
				this.dialogVisible3 = false;
				this.dialogVisible4 = false;
			},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
				this.selectAllTMaintainByState();
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
				this.selectAllTMaintainByState();
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			}
		}
	};
</script>

<style scoped>
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
	
	.container {
		margin-top: 20px;
	}
	
	.handle-box {
		margin-bottom: 20px;
	}
	
	.handle-select {
		width: 120px;
	}
	
	.handle-input {
		width: 300px;
		display: inline-block;
	}
	
	.table {
		margin-left: 20px;
		width: 95%;
		font-size: 14px;
	}
	
	.red {
		color: #ff0000;
	}
	
	.mr10 {
		margin-right: 10px;
	}
	
	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 30px;
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
