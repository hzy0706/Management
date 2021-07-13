<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title">业主验房</div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							管理物业系统中业主验房的相关信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="pageInfo.value" placeholder="可根据房产名称查询" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="selectAllTInspectionroomByRoomName()">搜索</el-button>
			</div>
			<div class="el-select-table-two-s">
				<el-button style="margin-right: 20px;" @click="addClick()" type="success">+ 增加</el-button>
			</div>
			<el-table :data="tableData" height="400" :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" stripe
				class="table" ref="multipleTable" header-cell-class-name="table-header"
				:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
				<el-table-column type="index" :index="indexMethod" label="编号" min-width="120px">
				</el-table-column>
				<el-table-column label="房产名" align="center">
					<template #default="scope">
						<a @click="selectInspectionroominfo(scope.row)"
							style="text-decoration:underline;color: blue;">{{scope.row.houseName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="okcount" label="验收合格数" align="center"></el-table-column>
				<el-table-column prop="nocount" label="验收不合格数" align="center"></el-table-column>
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
	<el-dialog title="新增业主验房" v-model="dialogVisible" width="50%" :before-close="handleClose">
		<el-form :model="Inspectionroominfo" label-width="100px" class="demo-ruleForm">
			<el-form-item label="住宅">
				<el-select v-model="Inspectionroominfo.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
					<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
						:value="item.residenceId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="楼宇">
				<el-select v-model="Inspectionroominfo.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
					<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
						:value="item.buildingId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单元">
				<el-select v-model="Inspectionroominfo.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
					<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
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
			<el-form-item label="验收日期">
				<el-input type="date" v-model="Inspectionroominfo.acceptanceDate"></el-input>
			</el-form-item>
			<el-form-item label="确认日期">
				<el-input type="date" v-model="Inspectionroominfo.confirmationDate"></el-input>
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
			<el-form-item label="是否合格">
				<el-select v-model="Inspectionroominfo.isOk" placeholder="请选择是否合格">
					<el-option label="合格" value="0"></el-option>
					<el-option label="不合格" value="1"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="验收人员">
				<el-input v-model="Inspectionroominfo.irName"></el-input>
			</el-form-item>
			<el-form-item label="业主意见">
				<el-input v-model="Inspectionroominfo.irOwnerSuggest"></el-input>
			</el-form-item>
			<el-form-item label="物业意见">
				<el-input v-model="Inspectionroominfo.irPropertySuggest"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="Inspectionroominfo.irRemark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addInspectionroominfo()">保存</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="验房详细信息" v-model="dialogVisible2" width="70%" :before-close="handleClose">
		<el-table :data="InspectionroominfoData" height="400" :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" stripe
			class="table" ref="multipleTable" header-cell-class-name="table-header"
			:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
			<el-table-column prop="irType" label="验收项目" align="center"></el-table-column>
			<el-table-column prop="acceptanceDate" label="验收日期" align="center"></el-table-column>
			<el-table-column prop="confirmationDate" label="确认日期" align="center"></el-table-column>
			<el-table-column label="合格" align="center">
				<template #default="scope">
					<p style="color:green" v-if="scope.row.isOk==0">合格</p>
					<p style="color:red" v-if="scope.row.isOk==1">不合格</p>
				</template>
			</el-table-column>
			<el-table-column prop="irName" label="验收人" align="center"></el-table-column>
			<el-table-column prop="irOwnerSuggest" label="业主意见" align="center"></el-table-column>
			<el-table-column prop="irPropertySuggest" label="物业意见" align="center"></el-table-column>
			<el-table-column prop="irRemark" label="备注" align="center"></el-table-column>
		</el-table>
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
					value: ''
				},
				tableData:[],
				InspectionroominfoData:[],
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: [],
				dialogVisible:false,
				dialogVisible2:false,
				Inspectionroominfo:{
					irinfoId:'',
					houseId:'',
					acceptanceDate:'',
					confirmationDate:'',
					irType:'',
					isOk:'',
					irName:'',
					irOwnerSuggest:'',
					irPropertySuggest:'',
					irRemark:'',
					irId:'',
					rid:'',
					bid:'',
					uid:''
				},
				Inspectionroom:{
					irId:'',
					houseName:'',
					houseId:'',
					okcount:'',
					nocount:''
				}
			}
		},
		created() {
			this.selectAllTInspectionroomByRoomName();
		},
		methods: {
			selectInspectionroominfo(row){
				this.selectAllTInspectionroominfoByIrid(row.irId);
				this.dialogVisible2=true;
			},
			addClick(){
				this.$router.push("/addInspection");
			},
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
						_this.dialogVisible=false;
						_this.selectAllTInspectionroomByRoomName();
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
			selectAllTInspectionroominfoByIrid(id) {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTInspectionroominfoByIrid/"+id)
					.then(function(response) {
						console.log(response)
						_this.InspectionroominfoData = response.data.data;
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
			selectAllTInspectionroomByRoomName(){
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTInspectionroomByRoomName", {
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
				Object.keys(this.Inspectionroominfo).forEach((key) => (this.Inspectionroominfo[key] = ''))
				this.dialogVisible = false;
				this.dialogVisible2 = false;
			},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
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
