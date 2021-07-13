<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="handle-box">
						
						
						<el-input v-model="tMerchant.searchInput" placeholder="用户名/商户编号/类别" class="handle-input mr10"></el-input>
						<el-button type="primary" icon="el-icon-search" @click="handleScreen">搜索</el-button>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div style="float: left;margin-top:-38px" >
			<el-button type="primary"  @click="tMerchant.dialogVisible=true">新增</el-button>
			<el-button type="primary"  @click="handleout">停用</el-button>
			<el-button type="primary"  @click="handlebegin">恢复</el-button>
			</div>
			<el-dialog title="添加商户" v-model="tMerchant.dialogVisible">
				<el-form :model="TMerchant" label-width="80px" style="width: 1000px;">
					<el-row :span="3">
						<el-col :span="5">
							<el-form-item label="租户名称(必填)" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merName" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="租户类别(必填)" :label-width="formLabelWidth">
								<el-select v-model="TMerchant.merType" placeholder="租户类别" class="handle-select mr10">
									<el-option key="本土品牌租户" label="本土品牌租户" value="本土品牌租户"></el-option>
									<el-option key="个人租户" label="个人租户" value="个人租户"></el-option>
									<el-option key="国际品牌租户" label="国际品牌租户" value="国际品牌租户"></el-option>
									<el-option key="国内品牌租户" label="国内品牌租户" value="国内品牌租户"></el-option>
									<el-option key="中小企业租户" label="中小企业租户" value="中小企业租户"></el-option>
									
								</el-select>
							</el-form-item>
							
							<el-form-item label="法定代表" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merRight" size="small" clearable></el-input>
							</el-form-item>
						
						<el-form-item label="证件类型" :label-width="formLabelWidth">
							<el-select v-model="TMerchant.merCardtype" placeholder="证件类型" class="handle-select mr10">
								<el-option key="护照" label="护照" value="护照"></el-option>
								<el-option key="驾驶证" label="驾驶证" value="驾驶证"></el-option>
								<el-option key="身份证" label="身份证" value="身份证"></el-option>
								<el-option key="营业执照" label="营业执照" value="营业执照"></el-option>
								<el-option key="职业资格证" label="职业资格证" value="职业资格证"></el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="状态" :label-width="formLabelWidth">
							<el-select v-model="TMerchant.merState" placeholder="状态" class="handle-select mr10">
								<el-option key="0" label="正常" value="正常"></el-option>
								<el-option key="1" label="停用" value="停用"></el-option>
								
								
							</el-select>
						</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merContacts" size="small" clearable></el-input>
							</el-form-item>
						
							
							
							
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TMerchant.merPhone"></el-input>
							</el-form-item>
							<el-form-item label="主营商品" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merMain" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="证件号码" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merCard" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input size="small" v-model="TMerchant.merAddress" style="width: 250px;"></el-input>
							</el-form-item>
				
						</el-col>
						
				
					</el-row>
					<el-row :span="3">
						<el-col :span="5">
				
							<el-form-item label="备注" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merMarket" size="small" type="textarea" style="width: 500px;"></el-input>
							</el-form-item>
				
						</el-col>
						<el-col :span="5">
							
							
						</el-col>
					</el-row>
					
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tMerchant.dialogVisible = false;productallsel()">关 闭</el-button>
						<el-button type="primary" @click="add(0)">保存并新建</el-button>
						<el-button type="primary" @click="add(1)">保存并关闭</el-button>
					</span>
				</template>
			</el-dialog>
			
			
			
			
			<el-dialog title="修改商户" v-model="tMerchant.dialogVisible1">
				<el-form :model="TMerchant" label-width="80px" style="width: 1000px;">
					<el-row :span="3">
						<el-col :span="5">
							<el-form-item label="租户名称(必填)" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merName" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="租户类别(必填)" :label-width="formLabelWidth">
								<el-select v-model="TMerchant.merType" placeholder="租户类别" class="handle-select mr10">
									<el-option key="本土品牌租户" label="本土品牌租户" value="本土品牌租户"></el-option>
									<el-option key="个人租户" label="个人租户" value="个人租户"></el-option>
									<el-option key="国际品牌租户" label="国际品牌租户" value="国际品牌租户"></el-option>
									<el-option key="国内品牌租户" label="国内品牌租户" value="国内品牌租户"></el-option>
									<el-option key="中小企业租户" label="中小企业租户" value="中小企业租户"></el-option>
									
								</el-select>
							</el-form-item>
							
							<el-form-item label="法定代表" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merRight" size="small" clearable></el-input>
							</el-form-item>
						
						<el-form-item label="证件类型" :label-width="formLabelWidth">
							<el-select v-model="TMerchant.merCardtype" placeholder="证件类型" class="handle-select mr10">
								<el-option key="护照" label="护照" value="护照"></el-option>
								<el-option key="驾驶证" label="驾驶证" value="驾驶证"></el-option>
								<el-option key="身份证" label="身份证" value="身份证"></el-option>
								<el-option key="营业执照" label="营业执照" value="营业执照"></el-option>
								<el-option key="职业资格证" label="职业资格证" value="职业资格证"></el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="状态" :label-width="formLabelWidth">
							<el-select v-model="TMerchant.merState" placeholder="状态" class="handle-select mr10">
								<el-option key="0" label="正常" value="正常"></el-option>
								<el-option key="1" label="停用" value="停用"></el-option>
								
								
							</el-select>
						</el-form-item>
						</el-col>
						<el-col :span="5">
							<el-form-item label="联系人" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merContacts" size="small" clearable></el-input>
							</el-form-item>
						
							
							
							
							<el-form-item label="联系电话" :label-width="formLabelWidth">
								<el-input size="small" v-model="TMerchant.merPhone"></el-input>
							</el-form-item>
							<el-form-item label="主营商品" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merMain" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="证件号码" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merCard" size="small" clearable></el-input>
							</el-form-item>
							
							<el-form-item label="地址" :label-width="formLabelWidth">
								<el-input size="small" v-model="TMerchant.merAddress" style="width: 250px;"></el-input>
							</el-form-item>
				
						</el-col>
						
				
					</el-row>
					<el-row :span="3">
						<el-col :span="5">
				
							<el-form-item label="备注" :label-width="formLabelWidth">
								<el-input v-model="TMerchant.merMarket" size="small" type="textarea" style="width: 500px;"></el-input>
							</el-form-item>
				
						</el-col>
						<el-col :span="5">
							
							
						</el-col>
					</el-row>
					
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="tMerchant.dialogVisible1 = false;productallsel()">关 闭</el-button>
						
						<el-button type="primary" @click="update(1)">修改</el-button>
					</span>
				</template>
			</el-dialog>
			<el-table :data="tMerchant.tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
			 :header-cell-style="{background:'#f8f8f9',color:'#606266'}" @selection-change="handleSelectionChange">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="merName" label="商户名"></el-table-column>
				<el-table-column prop="merId" label="商户编号"></el-table-column>
				<el-table-column prop="merType" label="类别"></el-table-column>
				<el-table-column prop="merContacts" label="联系人"></el-table-column>
				<el-table-column prop="merPhone" label="联系电话"></el-table-column>
				<el-table-column prop="merCard" label="证件号码"></el-table-column>
				<el-table-column label="状态">
				<template #default="scope">
					<p v-if="tMerchant.tableData[scope.$index].merState == 0">正常</p>
					<p v-if="tMerchant.tableData[scope.$index].merState == 1">禁用</p>
				</template>
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button type="text" icon="el-icon-edit" @click="TMerchant=scope.row;tMerchant.dialogVisible1=true">编辑
						</el-button>
						
					</template>
				</el-table-column>
			</el-table>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:page-sizes="[10,20,40,80]" :page-size="tMerchant.pageParam.pageSize"
					layout="total, sizes, prev, pager, next, jumper" :total="tMerchant.tableTotal">
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
				queryType:'',
				liststate:[],
				screenCondition:{},
				zuhusort:[{
					merType:'本土品牌租户'
				},
				{
					merType:'个人租户'
				},
				
				{
					merType:'国际品牌租户'
				},
				{
					merType:'国内品牌租户'
				},
				{
					merType:'中小企业租户'
				},
				],
				TMerchant:{},
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
				}

			}
		},
		computed: {
		
			searchCondition() {
				return {
					"merId": this.tMerchant.searchInput,
					"merName": this.tMerchant.searchInput,
					"merType": this.tMerchant.searchInput,
					
				}
			}
		},

		methods: {
			handleSizeChange(val) {
				this.tMerchant.pageParam.pageSize = val
			
				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleCurrentChange(val) {
				this.tMerchant.pageParam.pageNum = val
			
				if (this.queryType == 'all')
					this.findMerchant()
				else if (this.queryType == 'search')
					this.handleSearch()
				else if (this.queryType == 'screen')
					this.handleScreen()
			},
			handleScreen() {
				this.queryType = 'screen'
				
				
			
				var screenForm = Object.assign(this.searchCondition,this.tMerchant.pageParam)
				console.log(this.screenForm)
				this.axios({
					url: "http://127.0.0.1:8080/Property/tMerchant/search",
					method: "get",
					params: screenForm
				}).then(response => {
					this.tMerchant.tableData = response.data.list
					this.tMerchant.tableTotal = response.data.total
				}).catch(error => {
			
				})
			
				
			},
			handleout() {
				console.log(this.liststate)
				var jingyong=[]
				
				this.liststate.forEach(aa=>{
					jingyong.push({merId:aa.merId,merState:1})
				})
				console.log("jingyong:"+jingyong)
				
				this.axios({
					
					url:'http://127.0.0.1:8080/Property/tMerchant/batch',
					method:'put',
					data:jingyong
				}).then(response=>{
					this.$message({
						type:'success',
						message:'信息更改成功！'
					})
					
					this.findMerchant()
				}).catch(error=>{
					
				})
				
			},
			handlebegin() {
				console.log(this.liststate)
				var qinyong=[]
				this.liststate.forEach(aa=>{
					qinyong.push({merId:aa.merId,merState:0})
				})
				this.axios({
					
					url:'http://127.0.0.1:8080/Property/tMerchant/batch',
					method:'put',
					data:qinyong
				}).then(response=>{
					this.$message({
						type:'success',
						message:'信息更改成功！'
					})
					
					this.findMerchant()
				}).catch(error=>{
					
				})
			},
			productallsel(){
				this.TMerchant={}
			},
			handleSelectionChange(val){
				console.log(val)
				this.liststate=val
			},
			add(number) {
				if(this.TMerchant.merName!=''&&this.TMerchant.merName!=null&&this.TMerchant.merType!=''&&this.TMerchant.merType!=null){
				this.axios({
					url: 'http://127.0.0.1:8080/Property/tMerchant',
					method: 'post',
					data: this.TMerchant
				}).then(response => {
					if(number==1){
					this.$message({
						type: 'success',
						message: '商户新增成功！'
					})}else if(number==0){
					this.$message({
						type: 'success',
						message: '请添加下一条数据！'
					})}
					this.productallsel()
					this.findMerchant()
				if(number==1) {
				this.tMerchant.dialogVisible=false
					}
				}).catch(error => {
					
				})
				}else{
					this.$message({
						type: 'warning',
						message: '必填未填！'
					})
				}
				
			},
			update(number) {
				if(this.TMerchant.merName!=''&&this.TMerchant.merName!=null&&this.TMerchant.merType!=''&&this.TMerchant.merType!=null){
				this.axios({
					url: 'http://127.0.0.1:8080/Property/tMerchant',
					method: 'put',
					data: this.TMerchant
				}).then(response => {
					if(number==1){
					this.$message({
						type: 'success',
						message: '商户修改成功！'
					})}else if(number==0){
					this.$message({
						type: 'success',
						message: '请添加下一条数据！'
					})}
					this.productallsel()
					this.findMerchant()
				if(number==1) {
				this.tMerchant.dialogVisible1=false
					}
				}).catch(error => {
					
				})
				}else{
					this.$message({
						type: 'warning',
						message: '必填未填！'
					})
				}
				
			},
			findMerchant() {
				this.queryType = 'all'
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
