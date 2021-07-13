<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title">业主装修</div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							管理物业系统中业主装修的相关信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="pageInfo.state" placeholder="装修状态" class="handle-select mr10" @change="selectAllTDecorateByState()">
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
				<el-table-column prop="decorateBail" label="装修保证金" align="center"></el-table-column>
				<el-table-column prop="penaltyMoney" label="违约金" align="center"></el-table-column>
				<el-table-column label="状态" align="center">
					<template #default="scope">
						<p style="color:red" v-if="scope.row.decorateState==0">待审核</p>
						<p style="color:green" v-if="scope.row.decorateState==1">审核通过</p>
						<p style="color:blue" v-if="scope.row.decorateState==2">已验收</p>
						<p style="color:gray" v-if="scope.row.decorateState==3">已作废</p>
					</template>
				</el-table-column>
				<el-table-column prop="decorateContent" label="装修内容" align="center" :show-overflow-tooltip='true'></el-table-column>
				<el-table-column prop="approvalName" label="审批人员" align="center"></el-table-column>
				<el-table-column prop="approvalDate" label="审批时间" align="center"></el-table-column>
				<el-table-column prop="decorateType" label="装修类型" align="center"></el-table-column>
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
	<el-dialog title="新增业主装修" v-model="dialogVisible" width="50%" :before-close="handleClose">
		<el-form :model="Decorate" label-width="100px" class="demo-ruleForm">
			<el-form-item label="住宅">
				<el-select v-model="Decorate.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
					<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
						:value="item.residenceId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="楼宇">
				<el-select v-model="Decorate.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
					<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
						:value="item.buildingId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单元">
				<el-select v-model="Decorate.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
					<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="房间">
				<el-select v-model="Decorate.houseId" placeholder="请选择" @change="selectTOwnerHouseByHouseId()">
					<el-option v-for="item in houseData2" :key="item.houseId" :label="item.houseName"
						:value="item.houseId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="申请人">
				<el-input v-model="Decorate.applyName"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Decorate.decoratePhone"></el-input>
			</el-form-item>
			<el-form-item label="装修类别">
				<el-select v-model="Decorate.decorateType" placeholder="请选择装修类别">
					<el-option label="业主录入" value="业主录入"></el-option>
					<el-option label="物业录入" value="物业录入"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Decorate.applyDate"></el-input>
			</el-form-item>
			<el-form-item label="装修内容">
				<el-input v-model="Decorate.decorateContent"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addDecorate()">保存</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="审核/编辑/删除装修信息" v-model="dialogVisible2" width="50%" :before-close="handleClose">
		<el-form :model="Decorate" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Decorate.applyName"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Decorate.decoratePhone"></el-input>
			</el-form-item>
			<el-form-item label="装修类别">
				<el-select v-model="Decorate.decorateType" placeholder="请选择装修类别" disabled="disabled">
					<el-option label="业主录入" value="业主录入"></el-option>
					<el-option label="物业录入" value="物业录入"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Decorate.applyDate"></el-input>
			</el-form-item>
			<el-form-item label="装修内容">
				<el-input v-model="Decorate.decorateContent"></el-input>
			</el-form-item>
			<el-form-item label="装修保证金">
				<el-input v-model="Decorate.decorateBail"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Decorate.approvalSuggest"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateDecorate()">保存</el-button>
				<el-button type="danger" @click="deleteDecorate()">删除</el-button>
				<el-button type="warning" @click="appDecorate()">审核</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="验收/作废装修信息" v-model="dialogVisible3" width="50%" :before-close="handleClose">
		<el-form :model="Decorate" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Decorate.applyName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Decorate.decoratePhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修类别">
				<el-select v-model="Decorate.decorateType" placeholder="请选择装修类别" disabled="disabled">
					<el-option label="业主录入" value="业主录入"></el-option>
					<el-option label="物业录入" value="物业录入"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Decorate.applyDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修内容">
				<el-input v-model="Decorate.decorateContent" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修保证金">
				<el-input v-model="Decorate.decorateBail" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Decorate.approvalSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工单位">
				<el-input v-model="Decorate.buildUnit"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-input v-model="Decorate.buildName"></el-input>
			</el-form-item>
			<el-form-item label="负责人电话">
				<el-input v-model="Decorate.buildPhone"></el-input>
			</el-form-item>
			<el-form-item label="施工开始日期">
				<el-input type="date" v-model="Decorate.buildStartDate"></el-input>
			</el-form-item>
			<el-form-item label="施工结束日期">
				<el-input type="date" v-model="Decorate.buildEndDate"></el-input>
			</el-form-item>
			<el-form-item label="验收人">
				<el-input v-model="Decorate.checkName"></el-input>
			</el-form-item>
			<el-form-item label="验收时间">
				<el-input type="date" v-model="Decorate.checkDate"></el-input>
			</el-form-item>
			<el-form-item label="验收意见">
				<el-input v-model="Decorate.checkSuggest"></el-input>
			</el-form-item>
			<el-form-item label="违约金">
				<el-input v-model="Decorate.penaltyMoney"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="Decorate.decorateRemark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="processDecorate()">验收</el-button>
				<el-button type="danger" @click="inidedDecorate()">作废</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="查看装修详情" v-model="dialogVisible4" width="50%" :before-close="handleClose">
		<el-form :model="Decorate" label-width="100px" class="demo-ruleForm">
			<el-form-item label="申请人">
				<el-input v-model="Decorate.applyName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="联系电话">
				<el-input v-model="Decorate.decoratePhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修类别">
				<el-select v-model="Decorate.decorateType" placeholder="请选择装修类别" disabled="disabled">
					<el-option label="业主录入" value="业主录入"></el-option>
					<el-option label="物业录入" value="物业录入"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="申请时间">
				<el-input type="date" v-model="Decorate.applyDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修内容">
				<el-input v-model="Decorate.decorateContent" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="装修保证金">
				<el-input v-model="Decorate.decorateBail" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="审批意见">
				<el-input v-model="Decorate.approvalSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工单位">
				<el-input v-model="Decorate.buildUnit" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="负责人">
				<el-input v-model="Decorate.buildName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="负责人电话">
				<el-input v-model="Decorate.buildPhone" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工开始日期">
				<el-input type="date" v-model="Decorate.buildStartDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="施工结束日期">
				<el-input type="date" v-model="Decorate.buildEndDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收人">
				<el-input v-model="Decorate.checkName" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收时间">
				<el-input type="date" v-model="Decorate.checkDate" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="验收意见">
				<el-input v-model="Decorate.checkSuggest" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="违约金">
				<el-input v-model="Decorate.penaltyMoney" disabled="disabled"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="Decorate.decorateRemark" disabled="disabled"></el-input>
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
				Decorate:{
					decorateId:'',
					houseId:'',
					decorateType:'',
					applyName:'',
					decoratePhone:'',
					createName:'',
					createDate:'',
					decorateState:'',
					decorateContent:'',
					decorateBail:'',
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
					penaltyMoney:'',
					cancelName:'',
					cancelDate:'',
					decorateRemark:'',
					houseName:'',
					applyDate:'',
					rid:'',
					bid:'',
					uid:''
				},
			}
		},
		created() {
			this.selectAllTDecorateByState();
		},
		methods: {
			controller(row){
				if(row.decorateState==0){
					this.Decorate.decorateId = row.decorateId;
					this.Decorate.decorateType = row.decorateType;
					this.Decorate.applyName = row.applyName;
					this.Decorate.decoratePhone = row.decoratePhone;
					this.Decorate.applyDate = row.applyDate;
					this.Decorate.houseName = row.houseName;
					this.Decorate.houseId = row.houseId;
					this.Decorate.decorateContent = row.decorateContent;
					this.dialogVisible2=true;
				}
				if(row.decorateState==1){
					this.Decorate.decorateId = row.decorateId;
					this.Decorate.decorateType = row.decorateType;
					this.Decorate.applyName = row.applyName;
					this.Decorate.decoratePhone = row.decoratePhone;
					this.Decorate.applyDate = row.applyDate;
					this.Decorate.houseName = row.houseName;
					this.Decorate.houseId = row.houseId;
					this.Decorate.decorateContent = row.decorateContent;
					this.Decorate.decorateBail = row.decorateBail;
					this.Decorate.approvalSuggest = row.approvalSuggest;
					this.Decorate.approvalDate=row.approvalDate;
					this.Decorate.approvalName=row.approvalName;
					this.dialogVisible3=true;
				}
				if(row.decorateState==2 || row.decorateState==3){
					this.Decorate.decorateId = row.decorateId;
					this.Decorate.decorateType = row.decorateType;
					this.Decorate.applyName = row.applyName;
					this.Decorate.decoratePhone = row.decoratePhone;
					this.Decorate.applyDate = row.applyDate;
					this.Decorate.houseName = row.houseName;
					this.Decorate.houseId = row.houseId;
					this.Decorate.decorateContent = row.decorateContent;
					this.Decorate.decorateBail = row.decorateBail;
					this.Decorate.approvalSuggest = row.approvalSuggest;
					this.Decorate.approvalDate=row.approvalDate;
					this.Decorate.approvalName=row.approvalName;
					this.Decorate.buildUnit=row.buildUnit;
					this.Decorate.buildName=row.buildName;
					this.Decorate.buildPhone=row.buildPhone;
					this.Decorate.buildStartDate=row.buildStartDate;
					this.Decorate.buildEndDate=row.buildEndDate;
					this.Decorate.checkName=row.checkName;
					this.Decorate.checkDate=row.checkDate;
					this.Decorate.checkSuggest=row.checkSuggest;
					this.Decorate.penaltyMoney=row.penaltyMoney;
					this.Decorate.decorateRemark=row.decorateRemark;
					this.Decorate.decorateState=row.decorateState;
					this.Decorate.cancelName=row.cancelName;
					this.Decorate.cancelDate=row.cancelDate;
					this.dialogVisible4=true;
				}
			},
			inidedDecorate(){
				const _this = this
				this.Decorate.buildUnit=null;
				this.Decorate.buildName=null;
				this.Decorate.buildPhone=null;
				this.Decorate.buildStartDate=null;
				this.Decorate.buildEndDate=null;
				this.Decorate.checkName=null;
				this.Decorate.checkDate=null;
				this.Decorate.checkSuggest=null;
				this.Decorate.penaltyMoney=null;
				this.Decorate.decorateRemark=null;
				this.Decorate.decorateState=3;
				this.Decorate.cancelName='胡志远';
				var date = new Date();
				this.Decorate.cancelDate=date;
				this.axios.put("http://localhost:8080/Property/updateByTDecorateKeySelective", this.Decorate)
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
						_this.selectAllTDecorateByState();
						Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			processDecorate(){
				const _this = this
				this.Decorate.decorateState=2;
				this.axios.put("http://localhost:8080/Property/updateByTDecorateKeySelective",this.Decorate)
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
						_this.selectAllTDecorateByState();
						Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			appDecorate(){
				const _this = this
				this.Decorate.decorateState=1;
				this.Decorate.approvalName='胡志远';
				var date = new Date();
				this.Decorate.approvalDate=date;
				this.axios.put("http://localhost:8080/Property/updateByTDecorateKeySelective",this.Decorate)
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
						_this.selectAllTDecorateByState();
						Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
					}).catch(function(error) {
						console.log(error)
				})
			},
			deleteDecorate(){
				if(this.Decorate.decorateType == '业主录入'){
					ElMessage.error({
						message: '业主录入数据，不允许删除',
						type: 'success'
					});
				}else{
					const _this = this
					this.axios.delete("http://localhost:8080/Property/deleteByTDecorateKey/"+this.Decorate.decorateId)
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
							_this.selectAllTDecorateByState();
							Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
						}).catch(function(error) {
							console.log(error)
					})
				}
			},
			updateDecorate(){
				if(this.Decorate.decorateType == '业主录入'){
					ElMessage.error({
						message: '业主录入数据，不允许修改',
						type: 'success'
					});
				}else{
					const _this = this
					this.Decorate.decorateBail=null;
					this.Decorate.approvalSuggest=null;
					this.axios.put("http://localhost:8080/Property/updateByTDecorateKeySelective", this.Decorate)
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
							_this.selectAllTDecorateByState();
							Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
						}).catch(function(error) {
							console.log(error)
					})
				}
			},
			addClick(){
				this.selectAllTResidence();
				this.dialogVisible=true;
			},
			addDecorate(){
				const _this = this
				this.axios.post("http://localhost:8080/Property/addTDecorate", this.Decorate)
					.then(function(response) {
						console.log(response)
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
						_this.selectAllTDecorateByState();
						Object.keys(_this.Decorate).forEach((key) => (_this.Decorate[key] = ''))
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
				this.axios.get("http://localhost:8080/Property/selectAllTBuildingByRid/" + this.Decorate.rid)
					.then(function(response) {
						_this.buildingData = response.data.data;
					}).catch(function(error) {
						console.log(error)
				})
			},
			selectAllTUnitByBid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTUnitByBid/" + this.Decorate.bid)
					.then(function(response) {
						_this.unitData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTHouseByUid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTHouseByUid/" + this.Decorate.uid)
					.then(function(response) {
						_this.houseData2 = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectTOwnerHouseByHouseId(){
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectTOwnerHouseByHouseId/" + this.Decorate.houseId)
					.then(function(response) {
						console.log(response)
						if(response.data.data != null){
							_this.Decorate.applyName = response.data.data.towner.ownerName
							_this.Decorate.decoratePhone = response.data.data.towner.ownerPhone
						}else{
							_this.Decorate.applyName =''
							_this.Decorate.decoratePhone =''
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTDecorateByState(){
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTDecorateByState", {
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
				Object.keys(this.Decorate).forEach((key) => (this.Decorate[key] = ''))
				this.dialogVisible = false;
				this.dialogVisible2 = false;
				this.dialogVisible3 = false;
				this.dialogVisible4 = false;
			},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
				this.selectAllTDecorateByState();
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
				this.selectAllTDecorateByState();
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
