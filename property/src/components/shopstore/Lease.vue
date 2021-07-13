<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="handle-box">


						<el-input v-model="tLeasingContract.searchInput" placeholder="用户名/商户编号" class="handle-input mr10"></el-input>
						<el-button type="primary" @click="">查询</el-button>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div style="float: left;margin-top:-38px;margin-left: 10px;">
				
				
				<el-button type="primary" @click="tLeasingContract.dialogVisible=true">新增</el-button>
			</div>
			<el-dialog title="租赁合同签约" v-model="tLeasingContract.dialogVisible">
				
				<el-form :model="TLeasingContract" label-width="80px" style="width: 1000px;">
					<el-row :span="3">基本信息:</el-row>
					<el-row :span="3">
						
						<el-col :span="5">
							<el-form-item label="签订日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="选择日期" size="medium"
									v-model="TLeasingContract.leaseDate" style="width: 206px;"></el-date-picker>
							</el-form-item>

							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.leaseContacts" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="起租日期" size="medium"
									v-model="TLeasingContract.leaseBegtime" style="width: 206px;"></el-date-picker>
								
							</el-form-item>

							
						</el-col>
						<el-col :span="5">
							<el-form-item label="选择租户" :label-width="formLabelWidth">
								
									<el-select @click="clickEmployeeSelect()" @change="changeEmployeeSelect()"
										v-model="TLeasingContract.merId" style="width: 206px;" placeholder="请选择租户">
										<el-option v-for="e in tMerchant.tableData" :label="e.merName"
											:value="e.merId"></el-option>
									</el-select>
								
								
							</el-form-item>
						




							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TLeasingContract.leasePhone"></el-input>
							</el-form-item>
							<el-form-item label="日期" :label-width="formLabelWidth">
								<el-date-picker type="datetime" placeholder="停租日期" size="medium"
									v-model="TLeasingContract.leaseEndtime" style="width: 206px;"></el-date-picker>
								
							</el-form-item>

							

						</el-col>


					</el-row>
					

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tLeasingContract.dialogVisible = false;productallsel()">关 闭</el-button>
						<el-button type="primary" @click="add(0)">保存并新建</el-button>
						<el-button type="primary" @click="add(1)">保存并关闭</el-button>
					</span>
				</template>
			</el-dialog>




			<el-dialog title="修改商户" v-model="tLeasingContract.dialogVisible1">
				
				<el-form :model="TLeasingContract" label-width="80px" style="width: 1000px;">
					
					<el-row :span="3">
						<el-col :span="5">
							<el-form-item label="租户名称(必填)" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merName" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="租户类别(必填)" :label-width="formLabelWidth">
								<el-select v-model="TLeasingContract.merType" placeholder="租户类别" class="handle-select mr10">
									<el-option key="本土品牌租户" label="本土品牌租户" value="本土品牌租户"></el-option>
									<el-option key="个人租户" label="个人租户" value="个人租户"></el-option>
									<el-option key="国际品牌租户" label="国际品牌租户" value="国际品牌租户"></el-option>
									<el-option key="国内品牌租户" label="国内品牌租户" value="国内品牌租户"></el-option>
									<el-option key="中小企业租户" label="中小企业租户" value="中小企业租户"></el-option>

								</el-select>
							</el-form-item>

							<el-form-item label="法定代表" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merRight" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="证件类型" :label-width="formLabelWidth">
								<el-select v-model="TLeasingContract.merCardtype" placeholder="证件类型" class="handle-select mr10">
									<el-option key="护照" label="护照" value="护照"></el-option>
									<el-option key="驾驶证" label="驾驶证" value="驾驶证"></el-option>
									<el-option key="身份证" label="身份证" value="身份证"></el-option>
									<el-option key="营业执照" label="营业执照" value="营业执照"></el-option>
									<el-option key="职业资格证" label="职业资格证" value="职业资格证"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="状态" :label-width="formLabelWidth">
								<el-select v-model="TLeasingContract.merState" placeholder="状态" class="handle-select mr10">
									<el-option key="0" label="正常" value="正常"></el-option>
									<el-option key="1" label="停用" value="停用"></el-option>


								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merContacts" size="small" clearable></el-input>
							</el-form-item>




							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TLeasingContract.merPhone"></el-input>
							</el-form-item>
							<el-form-item label="主营商品" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merMain" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="证件号码" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merCard" size="small" clearable></el-input>
							</el-form-item>

							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input size="small" v-model="TLeasingContract.merAddress" style="width: 250px;"></el-input>
							</el-form-item>

						</el-col>


					</el-row>
					<el-row :span="3">
						<el-col :span="5">

							<el-form-item label="备注" :label-width="formLabelWidth">
								<el-input v-model="TLeasingContract.merMarket" size="small" type="textarea" style="width: 500px;"></el-input>
							</el-form-item>

						</el-col>
						<el-col :span="5">


						</el-col>
					</el-row>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tLeasingContract.dialogVisible1 = false;productallsel()">关 闭</el-button>

						<el-button type="primary" @click="update(1)">修改</el-button>
					</span>
				</template>
			</el-dialog>
			<el-table :data="tLeasingContract.tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 :header-cell-style="{background:'#f8f8f9',color:'#606266'}" @selection-change="handleSelectionChange">
				<el-table-column label="操作">
					<template #default="scope">
						<el-button type="text" icon="el-icon-edit" @click="">房间明细
						</el-button>
						<el-button type="text" icon="el-icon-edit" @click="">租金明细
						</el-button>
						

					</template>
				</el-table-column>
				
				<el-table-column prop="merId" label="合同编号"></el-table-column>
				<el-table-column prop="leaseDate" label="签订日期"></el-table-column>
				<el-table-column prop="tmerchant.merName" label="租户"></el-table-column>
				<el-table-column prop="leaseBegtime" label="起租日期"></el-table-column>
				<el-table-column prop="leaseEndtime" label="停租日期"></el-table-column>
				<el-table-column prop="leaseTenterm" label="租期"></el-table-column>
				<el-table-column prop="leaseUnitprice" label="租金单价"></el-table-column>
				<el-table-column prop="leaseChangemode" label="租金计费方式"></el-table-column>
				<el-table-column prop="leaseAcre" label="收费面积"></el-table-column>
				<el-table-column prop="leasePrice" label="租金总额"></el-table-column>
				
				<el-table-column label="状态">
					<template #default="scope">
						<p v-if="tLeasingContract.tableData[scope.$index].leaseAudit == 0">未生效</p>
						<p v-if="tLeasingContract.tableData[scope.$index].leaseAudit == 1">已生效</p>
					</template>
				</el-table-column>
				<el-table-column prop="tmerchant.merContacts" label="联系人"></el-table-column>
				<el-table-column prop="tmerchant.merPhone" label="手机号码"></el-table-column>
				<el-table-column prop="tmerchant.merCardtype" label="证件类型"></el-table-column>
				<el-table-column prop="tmerchant.merCard" label="证件号码"></el-table-column>
				<el-table-column prop="tmerchant.merMarket" label="备注"></el-table-column>
				<el-table-column prop="" label="创建人"></el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,40,80]"
				 :page-size="tLeasingContract.pageParam.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tLeasingContract.tableTotal">
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
				TLeasingContract: {},
				tLeasingContract: {
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
					"merId": this.tLeasingContract.searchInput,
					"merName": this.tLeasingContract.searchInput,
					"merType": this.tLeasingContract.searchInput,

				}
			}
		},

		methods: {
			clickEmployeeSelect(){
				this.axios({
					url: "http://127.0.0.1:8080/Property/tMerchant/search",
					method: 'get',
					params: this.tMerchant.pageParam
				}).then((response) => {
					console.log(response.data.list)
					this.tMerchant.tableData = response.data.list
					this.tMerchant.tableTotal = response.data.total
				}).catch((error) => {
				
				})
				},
				
				changeEmployeeSelect(){
					this.tMerchant.tableData.forEach(aa=>{
						if(this.TLeasingContract.merId==aa.merId){
							this.TLeasingContract.leaseContacts=aa.merContacts
							this.TLeasingContract.leasePhone=aa.merPhone
						}
						
					})
					
					
				},
			handleSizeChange(val) {
				this.tLeasingContract.pageParam.pageSize = val

				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleCurrentChange(val) {
				this.tLeasingContract.pageParam.pageNum = val

				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleScreen() {
				this.queryType = 'screen'



				var screenForm = Object.assign(this.searchCondition, this.tLeasingContract.pageParam)
				console.log(this.screenForm)
				this.axios({
					url: "http://127.0.0.1:8080/Property/tLeasingContract/search",
					method: "get",
					params: screenForm
				}).then(response => {
					this.tLeasingContract.tableData = response.data.list
					this.tLeasingContract.tableTotal = response.data.total
				}).catch(error => {

				})


			},

			productallsel() {
				this.TLeasingContract = {}
			},
			handleSelectionChange(val) {
				console.log(val)
				this.liststate = val
			},
			add(number) {
				if (this.TLeasingContract.leaseDate != '' && this.TLeasingContract.leaseDate != null && this.TLeasingContract.merId !=
					'' && this.TLeasingContract.merId != null&&this.TLeasingContract.leaseContacts != '' && this.TLeasingContract.leaseContacts != null && this.TLeasingContract.leasePhone !=
					'' && this.TLeasingContract.leasePhone != null&&this.TLeasingContract.leaseBegtime != '' && this.TLeasingContract.leaseBegtime != null && this.TLeasingContract.leaseEndtime !=
					'' && this.TLeasingContract.leaseEndtime != null) {
						var tLeasingContract=this.TLeasingContract
					this.axios({
						url: 'http://127.0.0.1:8080/Property/tLeasingContract',
						method: 'post',
						data: tLeasingContract
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
							this.tLeasingContract.dialogVisible = false
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
				if (this.TLeasingContract.leaseDate != '' && this.TLeasingContract.leaseDate != null && this.TLeasingContract.merId !=
					'' && this.TLeasingContract.merId != null&&this.TLeasingContract.leaseContacts != '' && this.TLeasingContract.leaseContacts != null && this.TLeasingContract.leasePhone !=
					'' && this.TLeasingContract.leasePhone != null&&this.TLeasingContract.leaseBegtime != '' && this.TLeasingContract.leaseBegtime != null && this.TLeasingContract.leaseEndtime !=
					'' && this.TLeasingContract.leaseEndtime != null) {
					this.axios({
						url: 'http://127.0.0.1:8080/Property/tLeasingContract',
						method: 'put',
						data: this.TLeasingContract
					}).then(response => {
						if (number == 1) {
							this.$message({
								type: 'success',
								message: '商户修改成功！'
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
							this.tLeasingContract.dialogVisible1 = false
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
			findMerchant() {
				this.queryType = 'all'
				this.axios({
					url: "http://127.0.0.1:8080/Property/tLeasingContract/search",
					method: 'get',
					params: this.tLeasingContract.pageParam
				}).then((response) => {
					console.log(response.data.list)
					this.tLeasingContract.tableData = response.data.list
					this.tLeasingContract.tableTotal = response.data.total
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
