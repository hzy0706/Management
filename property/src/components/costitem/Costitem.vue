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
				<el-button type="primary" icon="el-icon-plus" style="margin-left: 575px;">新增</el-button>
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
                <el-table-column prop="ctrelation" label="关联费项"></el-table-column>
                <el-table-column prop="overduefine" label="滞纳金比率"></el-table-column>
                <el-table-column prop="overdue" label="超期天数"></el-table-column>   
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button
						  type="text"
						  >编辑</el-button
						>
						&nbsp;
						<el-button
						  type="text"
						  style="color: red"
						  >删除</el-button
						>
					  </template>
				</el-table-column>
			</el-table>
			<br/>
			<div class="block">
				<!-- 分页 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageInfo.pagesize"
					layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
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
					ctName: '',         //费项名称
					ctChargecycle:'',   //收费周期
                    ctrelation:'',      //关联费项
					ctSubtotal:'',      //单价  
                    overdue:'',         //超期天数
                    overduefine:'',     //滞纳金比率
                    chco:'',            //收费方式
                    ifprice:'',         //是否允许改价 
                    residenceName:'',    //楼盘名称
                    ctId:'',
					total:''
				},
				tableData:[]
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
		methods: {
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
					this.total = response.data.total//有几行总记录数
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
