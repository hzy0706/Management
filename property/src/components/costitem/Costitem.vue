<template>
    <el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title">费项管理</div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							费项设定
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
    <div>
		<div class="container">
			<div class="handle-box" style="margin-left:0px">
                <el-input v-model="pageInfo.value" placeholder="楼盘名称或者收费方式" class="handle-input mr10"></el-input>
				<el-button type="primary" style="width: 75px;height: 15px;" icon="el-icon-search" @click="handleSearch()"></el-button>			
				<el-button @click="Ctxz.dialogTableVisible = true;isAdd = true;formData = {}" type="primary" icon="el-icon-plus" style="margin-left: 575px;">
					新增
				</el-button>
				<el-dialog v-bind="$attrs" v-model="Ctxz.dialogTableVisible" v-on="$listeners" @open="onOpen" @close="onClose" title="详细信息">
					<el-row :gutter="55">
					  <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="88px">
						<el-col :span="10">
						  <el-form-item label="所属楼盘" prop="residenceName">
							<el-select v-model="formData.residenceName" placeholder="请下拉选择所属楼盘" clearable>
							  <el-option v-for="(item, index) in residenceNameOptions" :key="index" :label="item.label"
								:value="item.value" :disabled="item.disabled"></el-option>
							</el-select>
						  </el-form-item>
						</el-col>
						<el-col :span="10">
						  <el-form-item label="费项名称" prop="ctName">
							<el-input v-model="formData.ctName" placeholder="请输入费项名称" clearable :style="{width: '100%'}">
							</el-input>
						  </el-form-item>
						</el-col>
						<el-col :span="10">
						  <el-form-item label="收费方式" prop="chco">
							<el-select v-model="formData.chco" placeholder="请选择收费方式" clearable :style="{width: '100%'}">
							  <el-option v-for="(item, index) in chcoOptions" :key="index" :label="item.label"
								:value="item.value" :disabled="item.disabled"></el-option>
							</el-select>
						  </el-form-item>
						</el-col>
						<el-col :span="10">
						  <el-form-item label="单价" prop="ctSubtotal">
							<el-input v-model="formData.ctSubtotal" placeholder="请输入单价" clearable :style="{width: '100%'}">
							</el-input>
						  </el-form-item>
						</el-col>
						<el-col :span="10">
						  <el-form-item label="允许改价" prop="ifprice">
							<el-select v-model="formData.ifprice" placeholder="请选择允许改价" clearable :style="{width: '100%'}">
							  <el-option v-for="(item, index) in ifpriceOptions" :key="index" :label="item.label"
								:value="item.value" :disabled="item.disabled"></el-option>
							</el-select>
						  </el-form-item>
						</el-col>
						<el-col :span="10">
						  <el-form-item label="收费周期" prop="ctChargecycle">
							<el-input v-model="formData.ctChargecycle" placeholder="1" :disabled='true' clearable
							  :style="{width: '100%'}">
							  <template slot="append">(月)</template>
							</el-input>
						  </el-form-item>
						</el-col>
						
						<el-col :span="10">
						  <el-form-item label="超期天数" prop="overdue">
							<el-input v-model="formData.overdue" placeholder="请输入超期天数" clearable :style="{width: '100%'}">
							</el-input>
						  </el-form-item>
						</el-col>
						<el-col :span="30">
							<el-form-item label="滞纳金比率" prop="overduefine">
							  <el-input v-model="formData.overduefine" placeholder="请输入滞纳金比率" clearable :style="{width: '100%'}">
							  </el-input>
							</el-form-item>
						  </el-col>
					  </el-form>
					</el-row>
					<div slot="footer">
					  <el-button @click="Ctxz.dialogTableVisible = false">取消</el-button>
					  <el-button type="primary" @click="refuel();Ctxz.dialogTableVisible = false">确定</el-button>
					</div>
				  </el-dialog>

			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" style="margin-left: 5px;box-shadow:0px 3px 3px #c8c8c8 ; width: 1150px;" header-cell-class-name="table-header"
				:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
                <el-table-column type="selection"> </el-table-column>
				<el-table-column prop="residenceName" label="所属楼盘"></el-table-column>
				<el-table-column label="费项编号" prop="ctId">
					
				</el-table-column>
				
				<el-table-column prop="ctName" label="费项名称"></el-table-column>
                <el-table-column prop="chco" label="收费方式"></el-table-column>
                <el-table-column prop="ctSubtotal" label="单价"></el-table-column>
               
                <el-table-column label="允许改价" prop="ifprice">
                    <template #default="scope">
                      <p v-if="tableData[scope.$index].ifprice == 0">是</p>
                      <p v-if="tableData[scope.$index].ifprice == 1">否</p>
                    </template>
                </el-table-column>
                <el-table-column prop="ctChargecycle" label="收费周期"></el-table-column>
               
                <el-table-column prop="overduefine" label="滞纳金比率"></el-table-column>
                <el-table-column prop="overdue" label="超期天数"></el-table-column>   
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button
						  type="text" @click="redact(scope.$index,scope.row);Ctxz.dialogTableVisible = true"
						  >编辑</el-button 
						>
						&nbsp;
						<el-button
						  type="text"
						  style="color: red"
						  @click="dele(scope.row.ctId)"
						  >删除</el-button
						>
					  </template>
				</el-table-column>
			</el-table>
			<br/>
			<div class="block">
				<!-- 分页 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,40,80]"
				 :page-size="pageInfo.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.tableTotal">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		inheritAttrs: false,
  		components: {},
  		props: [],
		data() {
			return {
				pageInfo: {
					tableTotal:'',
					currentPage: 1,
					pagesize: 10,
					ctName: '',         //费项名称
					ctChargecycle:'',   //收费周期
                    ctRelation:'',      //关联费项
					ctSubtotal:'',      //单价  
                    overdue:'',         //超期天数
                    overduefine:'',     //滞纳金比率
                    chco:'',            //收费方式
                    ifprice:'',         //是否允许改价 
                    residenceName:'',    //楼盘名称
                    ctId:'',
					total:''
				},
				Ctxz:{
					dialogTableVisible:false
				},
				tableData:[],
				formData: {
					residenceName: "",
					ctName: undefined,
					chco: "",
					ctSubtotal: undefined,
					ifprice: "否",
					ctChargecycle: 1,
					ctRelation: "",
					overdue: undefined,
					overduefine:''
				},
				rules: {
					residenceName: [{
					required: true,
					message: '请下拉选择所属楼盘',
					trigger: 'change'
					}],
					ctName: [{
					required: true,
					message: '请输入费项名称',
					trigger: 'blur'
					}],
					ctName: [{
					required: true,
					message: '请选择收费方式',
					trigger: 'change'
					}],
					ctSubtotal: [{
					required: true,
					message: '请输入单价',
					trigger: 'blur'
					}],
					ifprice: [{
					required: true,
					message: '请选择允许改价',
					trigger: 'change'
					}],
					ctChargecycle: [{
					required: true,
					message: '1',
					trigger: 'blur'
					}],
					ctrelation: [{
					required: true,
					message: '请选择关联费项',
					trigger: 'change'
					}],
					overdue: [{
					required: true,
					message: '请输入超期天数',
					trigger: 'blur'
					}],
				},
				residenceNameOptions: [{
					"label": "黄金汉宫",
					"value": "黄金汉宫"
				}, {
					"label": "铂金汉宫",
					"value": "铂金汉宫"
				}, {
					"label": "钻石汉宫",
					"value": "钻石汉宫"
				}],
				ctNameOptions: [{
					"label": "按住户",
					"value": "按住户"
				}, {
					"label": "自定义",
					"value": "自定义"
				}],
				ifpriceOptions: [{
					"label": "是",
					"value": "是"
				}, {
					"label": "否",
					"value": "否"
				}],
				chcoOptions: [{
					"label": "按住户",
					"value": "按住户"
				}, {
					"label": "自定义",
					"value": "自定义"
				}],
			}
		},
		computed: {
			searchCondition(){	
				return{
					residenceName: this.pageInfo.value,
					chco: this.pageInfo.value
				}
			}
		},
		watch: {},
		
		methods: {
			dele(val){
				// alert(val)
				
				this.$confirm('此操作将会删除该数据且不能撤回，是否继续？','提示',{
					confirmButtonTest:'确定',
					cancelButtonTest:'取消',
					type:'warning'
				}).then(() => {
					this.axios({
						url:"http://localhost:8080/Property/tCostitem",
						method:'Delete',
						params:{"id":val}
					}).then(response => {
						this.loadData()
						this.$message({
							type:"success",
							message:'删除成功'
						})
					}).catch(() => {
						this.message({
							type:"info",
							message:'已取消操作'
						})
					})
				})
			},
			redact(a,b){
				this.formData = b;
				this.isAdd = false
				console.log(b)
			},
			refuel(){
				if(this.isAdd){
					this.axios({
						url:"http://localhost:8080/Property/tCostitem",
						method:'post',
						data:this.formData
					}).then(response =>{
						this.$message({
						type: 'success',
						message: '新增成功！',
						})
						this.loadData();
					}).catch(error => {

					})
				}else{
					this.axios({
						url:"http://localhost:8080/Property/tCostitem",
						method:'put',
						data:this.formData
					}).then(response =>{
						this.$message({
						type: 'success',
						message: '修改成功！',
						})
						this.loadData();
					}).catch(error => {

					})
				}
				
			},
			onOpen() {},
				onClose() {
				this.$refs['elForm'].resetFields()
				},
				close() {
				this.$emit('update:visible', false)
				},
				handelConfirm() {
				this.$refs['elForm'].validate(valid => {
					if (!valid) return
					this.close()
				})
				},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			},
            loadData(){
				this.axios({
					url:"http://localhost:8080/Property/tCostitem",
					method:'get',
					params:this.pageParam
				}).then((response) =>{
                    console.log(response)
					this.tableData = response.data.list
					this.pageInfo.tableTotal = response.data.total//有几行总记录数
					console.log(response)
				}).catch((error) =>{

				}) 
			},
			handleSearch() {
				var searchForm =Object.assign(this.searchCondition,this.pageParam)
				
				this.axios({
					url:"http://localhost:8080/Property/tCostitem/search",
					method:'get',
					params:searchForm
				}).then((response) =>{
					this.tableData = response.data.list
					this.total = response.data.total
				}).catch((error) =>{

				})
			}
		},
        created(){
            this.loadData();
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
	.ivu-page-header-content{
        margin-left: 24px;
    }
	.ivu-page-header-title {
		display: inline-block;
		color: #17233d;
		font-weight: 500;
		font-size: 20px;
	}
	
	.container{
		margin-top: 0px;
	}
	.handle-box {
		margin-bottom: 10px;
	}

	.handle-select {
		width: 200px;
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
		margin-right: 20px;
	}

	.table-td-thumb {
		display: block;
		margin: auto;
		width: 40px;
		height: 30px;
	}
</style>
