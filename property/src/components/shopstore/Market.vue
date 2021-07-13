<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="handle-box">


						<el-input v-model="tSellContract.searchInput" placeholder="联系人/手机号" class="handle-input mr10"></el-input>
						<el-button type="primary" @click="handleScreen">查询</el-button>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div style="float: left;margin-top:-38px;margin-left: 10px;">


				<el-button type="primary" @click="tSellContract.dialogVisible=true">新增</el-button>
			</div>
			<el-dialog title="租赁合同签约" v-model="tSellContract.dialogVisible">

				<el-form :model="TSellContract" label-width="80px" style="width: 1000px;">
					<el-row :span="3">基本信息:</el-row>
					<el-row :span="3">

						<el-col :span="5">
							<el-form-item label="签订日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="选择日期" size="medium" v-model="TSellContract.sellTime" style="width: 206px;"></el-date-picker>
							</el-form-item>

							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TSellContract.sellContact" size="small" clearable></el-input>
							</el-form-item>

						


						</el-col>
						<el-col :span="5">
							<el-form-item label="选择租户" :label-width="formLabelWidth">

								<el-select @click="clickEmployeeSelect()" @change="changeEmployeeSelect()" v-model="TSellContract.merId"
								 style="width: 206px;" placeholder="请选择租户">
									<el-option v-for="e in tMerchant.tableData" :label="e.merName" :value="e.merId"></el-option>
								</el-select>


							</el-form-item>





							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TSellContract.sellPhone"></el-input>
							</el-form-item>
							



						</el-col>


					</el-row>


				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tSellContract.dialogVisible = false;productallsel()">关 闭</el-button>
						<el-button type="primary" @click="add(0)">保存并新建</el-button>
						<el-button type="primary" @click="add(1)">保存并关闭</el-button>
					</span>
				</template>
			</el-dialog>




			<el-dialog title="修改租赁合同" v-model="tSellContract.dialogVisible1">

				<el-form :model="TSellContract" label-width="80px" style="width: 1000px;">
					<el-row :span="3">基本信息:</el-row>
					<el-row :span="3">

						<el-col :span="5">
							<el-form-item label="签订日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="选择日期" size="medium" v-model="TSellContract.sellTime" style="width: 206px;"></el-date-picker>
							</el-form-item>

							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TSellContract.sellContact" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="起租日期" size="medium" v-model="TSellContract.sellBegtime" style="width: 206px;"></el-date-picker>

							</el-form-item>


						</el-col>
						<el-col :span="5">
							<el-form-item label="选择租户" :label-width="formLabelWidth">

								<el-select @click="clickEmployeeSelect()" @change="changeEmployeeSelect()" v-model="TSellContract.merId"
								 style="width: 206px;" placeholder="请选择租户">
									<el-option v-for="e in tMerchant.tableData" :label="e.merName" :value="e.merId"></el-option>
								</el-select>


							</el-form-item>





							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TSellContract.sellPhone"></el-input>
							</el-form-item>
							<el-form-item label="日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="停租日期" size="medium" v-model="TSellContract.sellEndtime" style="width: 206px;"></el-date-picker>

							</el-form-item>



						</el-col>


					</el-row>


				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tSellContract.dialogVisible1 = false;productallsel()">关 闭</el-button>
						
						<el-button type="primary" @click="updatemode(1)">保存并关闭</el-button>
					</span>
				</template>
			</el-dialog>




			<el-dialog title="房间明细" v-model="tSellContract.fangjianVisible">

				<el-form :model="TSellContract" label-width="80px" style="width: 1000px;">
					<el-row :span="3">房间明细:</el-row>
					<el-row :span="3">

						<el-col :span="7">

							<el-form-item label="选择房间" :label-width="formLabelWidth">
							
								<el-select @click="clickfangSelect()" @change="changefangSelect()" v-model="TSellContract.stoId" style="width: 206px;"
								 placeholder="请选择房间">
									<el-option v-for="e in tShoptore.tableData" :label="e.stoName" :value="e.stoId"></el-option>
								</el-select>
							
							
							</el-form-item>
							
							<el-form-item label="收费面积" :label-width="formLabelWidth">
								<el-input v-model="TSellContract.sellAcre" size="small" @change="jisuan()" clearable></el-input>
							</el-form-item>
							
							
					
						</el-col>
						
						
						<el-col :span="5">
							<el-form-item label="单价(m)" :label-width="formLabelWidth">
								<el-input size="small" v-model="TSellContract.sellUnitprice"  @change="jisuan()"></el-input>
							</el-form-item>
							
							<el-form-item label="总额" :label-width="formLabelWidth">
								<el-input size="small" v-model="TSellContract.sellPrice" disabled></el-input>
							</el-form-item>


						</el-col>


					</el-row>


				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tSellContract.fangjianVisible = false;productallsel()">关 闭</el-button>

						<el-button type="primary" @click="update(1)">保存并关闭</el-button>
					</span>
				</template>
			</el-dialog>







			<el-table :data="tSellContract.tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 :header-cell-style="{background:'#f8f8f9',color:'#606266'}" @selection-change="handleSelectionChange">
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button type="text" icon="el-icon-edit" @click="tSellContract.fangjianVisible=true;TSellContract=scope.row;jisuan()">房间租金明细
						</el-button>



					</template>
				</el-table-column>
					
				<el-table-column prop="sellId" label="合同编号">
					<template #default="scope">
						<span @click="tSellContract.dialogVisible1=true;TSellContract=scope.row" style="color: #00FFFF;cursor: pointer;">{{scope.row.sellId}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="sellTime" label="签订日期"></el-table-column>
				<el-table-column prop="tmerchant.merName" label="租户"></el-table-column>
				
				
				<el-table-column prop="sellUnitprice" label="租金单价"></el-table-column>
				
				<el-table-column prop="sellAcre" label="收费面积"></el-table-column>
				<el-table-column prop="sellPrice" label="总价"></el-table-column>

				<el-table-column label="状态">
					<template #default="scope">
						<p v-if="tSellContract.tableData[scope.$index].sellAudit == 0">未生效</p>
						<p v-if="tSellContract.tableData[scope.$index].sellAudit == 1">已生效</p>
					</template>
				</el-table-column>
				<el-table-column prop="sellContact" label="联系人"></el-table-column>
				<el-table-column prop="sellPhone" label="手机号码"></el-table-column>
				<el-table-column prop="tmerchant.merCardtype" label="证件类型"></el-table-column>
				<el-table-column prop="tmerchant.merCard" label="证件号码"></el-table-column>
				<el-table-column prop="tmerchant.merMarket" label="备注"></el-table-column>
				<el-table-column prop="" label="审核">
					<template #default="scope">
						<el-button type="text" icon="el-icon-edit" @click="shenhe(scope.row.sellId)" v-if="tSellContract.tableData[scope.$index].sellAudit == 0">审核
						</el-button>
		
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,40,80]"
				 :page-size="tSellContract.pageParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tSellContract.tableTotal">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageInfo: {
					currentPage: 1,
					pagesize: 10,
					total: 0,
					type: '',
					value: ''
				},
				queryType: '',
				liststate: [],
				screenCondition: {},
				tMerchant: {
					dialogVisible: false,
					dialogVisible1: false,

					searchInput: '',
					tableData: [],
					tableTotal: '',
					singleSelection: {},
					pageParam: {
						"pageNum": 1,
						"pageSize": 10
					}
				},
				tShoptore: {
					dialogVisible: false,
					dialogVisible1: false,

					searchInput: '',
					tableData: [],
					tableTotal: '',
					singleSelection: {},
					pageParam: {
						"pageNum": 1,
						"pageSize": 10
					}
				},
				sellidid:'',
				TSellContract: {},
				tSellContract: {
					fangjianVisible: false,
					zujingVisible: false,
					dialogVisible: false,
					dialogVisible1: false,
					searchInput: '',
					tableData: [],
					tableTotal: '',
					singleSelection: {},
					pageParam: {
						"pageNum": 1,
						"pageSize": 10
					}
				}

			}
		},
		computed: {

			searchCondition() {
				return {
					"sellContact": this.tSellContract.searchInput,
					"sellPhone": this.tSellContract.searchInput,
					

				}
			},
			searchjin() {
				return {
					"merState": 0,
					
					
			
				}
			},
			searchshen() {
				return {
					"sellAudit": 1,
					"sellId":this.sellidid,
					
			
				}
			}
		},

		methods: {
			jisuan() {
				this.TSellContract.sellPrice=this.TSellContract.sellUnitprice*this.TSellContract.sellAcre
			},
			clickEmployeeSelect() {
				var screenForm = Object.assign(this.searchjin, this.tMerchant.pageParam)
				this.axios({
					url: "http://127.0.0.1:8080/Property/tMerchant/search",
					method: 'get',
					params: screenForm
				}).then((response) => {
					console.log(response.data.list)
					this.tMerchant.tableData = response.data.list
					this.tMerchant.tableTotal = response.data.total
				}).catch((error) => {

				})
			},

			clickfangSelect() {
				this.axios({
					url: "http://127.0.0.1:8080/Property/tShopstore/search",
					method: 'get',
					params: this.tMerchant.pageParam
				}).then((response) => {
					console.log(response.data.list)
					this.tShoptore.tableData = response.data.list
					this.tShoptore.tableTotal = response.data.total
				}).catch((error) => {

				})
			},
			changefangSelect() {
				this.tShoptore.tableData.forEach(aa => {
					if (this.TSellContract.stoId == aa.stoId) {
						this.TSellContract.sellAcre = aa.stoUsarea

					}

				})


			},

			changeEmployeeSelect() {
				this.tMerchant.tableData.forEach(aa => {
					if (this.TSellContract.merId == aa.merId) {
						this.TSellContract.sellContact = aa.merContacts
						this.TSellContract.sellPhone = aa.merPhone
					}

				})


			},
			handleSizeChange(val) {
				this.tSellContract.pageParam.pageSize = val

				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleCurrentChange(val) {
				this.tSellContract.pageParam.pageNum = val

				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleScreen() {
				this.queryType = 'screen'



				var screenForm = Object.assign(this.searchCondition, this.tSellContract.pageParam)
				console.log(this.screenForm)
				this.axios({
					url: "http://127.0.0.1:8080/Property/tSellContract/search",
					method: "get",
					params: screenForm
				}).then(response => {
					this.tSellContract.tableData = response.data.list
					this.tSellContract.tableTotal = response.data.total
				}).catch(error => {

				})


			},

			productallsel() {
				this.TSellContract = {}
			},
			handleSelectionChange(val) {
				console.log(val)
				this.liststate = val
			},
			add(number) {
				console.log(this.TSellContract)
				if (this.TSellContract.sellTime != '' && this.TSellContract.sellTime != null && this.TSellContract.merId !=
					'' && this.TSellContract.merId != null && this.TSellContract.sellContact != '' && this.TSellContract.sellContact !=
					null && this.TSellContract.sellPhone !=
					'' && this.TSellContract.sellPhone != null ) {
					var tSellContract = this.TSellContract
					this.axios({
						url: 'http://127.0.0.1:8080/Property/tSellContract',
						method: 'post',
						data: tSellContract
					}).then(response => {
						if (number == 1) {
							this.$message({
								type: 'success',
								message: '商户新增成功！'
							})
						} else if (number == 0) {
							this.$message({
								type: 'success',
								message: '请添加下一条数据！'
							})
						}
						this.productallsel()
						this.findMerchant()
						if (number == 1) {
							this.tSellContract.dialogVisible = false
						}
					}).catch(error => {

					})
				} else {
					this.$message({
						type: 'warning',
						message: '必填未填！'
					})
				}

			},
			update(number) {
			
					console.log(this.TSellContract)
					if(this.TSellContract.sellAudit==0) {
					this.axios({
						url: 'http://127.0.0.1:8080/Property/tSellContract',
						method: 'put',
						data: this.TSellContract
					}).then(response => {
						if (number == 1) {
							this.$message({
								type: 'success',
								message: '租赁明细修改成功！'
							})
						} else if (number == 0) {
							this.$message({
								type: 'success',
								message: '请添加下一条数据！'
							})
						}
						this.productallsel()
						this.findMerchant()
						if (number == 1) {
							this.tSellContract.fangjianVisible = false
						}
					}).catch(error => {

					})
					}else{
						
						this.$message({
							type: 'warning',
							message: '审核后无法修改！'
						})
					}
				

			},
			shenhe(aa) {
				this.sellidid=aa
				var screenForm = Object.assign(this.searchshen)
				console.log(screenForm)
				this.axios({
					url: 'http://127.0.0.1:8080/Property/tSellContract',
					method: 'put',
					data: screenForm
				}).then(response => {
					
						this.$message({
							type: 'success',
							message: '审核成功！'
						})
						this.sellidid=''
					this.findMerchant()
				
				}).catch(error => {
				
				})
				
			},
			updatemode(number) {
				if(this.TSellContract.sellAudit==0){
				if (this.TSellContract.sellTime != '' && this.TSellContract.sellTime != null && this.TSellContract.sellId !=
					'' && this.TSellContract.sellId != null && this.TSellContract.sellContact != '' && this.TSellContract.sellContact !=
					null && this.TSellContract.sellPhone !=
					'' && this.TSellContract.sellPhone != null) {
					console.log(this.TSellContract)
					this.axios({
						url: 'http://127.0.0.1:8080/Property/tSellContract',
						method: 'put',
						data: this.TSellContract
					}).then(response => {
						if (number == 1) {
							this.$message({
								type: 'success',
								message: '租赁合同修改成功！'
							})
						} else if (number == 0) {
							this.$message({
								type: 'success',
								message: '请添加下一条数据！'
							})
						}
						this.productallsel()
						this.findMerchant()
						if (number == 1) {
							this.tSellContract.dialogVisible1 = false
						}
					}).catch(error => {
			
					})
				} else {
					this.productallsel()
					this.$message({
						type: 'warning',
						message: '必填未填！'
					})
				}
				}else{
					this.$message({
						type: 'warning',
						message: '审核成功无法修改！'
					})
				}
			
			},
			findMerchant() {
				this.queryType = 'all'
				this.axios({
					url: "http://127.0.0.1:8080/Property/tSellContract/search",
					method: 'get',
					params: this.tSellContract.pageParam
				}).then((response) => {
					console.log(response.data.list)
					this.tSellContract.tableData = response.data.list
					this.tSellContract.tableTotal = response.data.total
				}).catch((error) => {

				})
			},
			handleEdit() {

			},
			handleDelete() {

			}


		},
		created() {
			this.findMerchant()
		}
	};
</script>

<style scoped>
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
		width: 100%;
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
</style>
