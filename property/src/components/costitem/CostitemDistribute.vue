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
							费项查询
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
    <div>
		<div class="container">
			<div class="handle-box" style="margin-left:0px">
                    请选择楼盘：
                    <el-select  v-model="selecte.residenceName" @click="selectnoe()" placeholder="请下拉选择所属楼盘" clearable>
                    <el-option v-for="(item, index) in residenceNameOptions"  :key="index" :label="item.label"
                        :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
            </div>
			<el-table :data="tableData" border class="table" ref="multipleTable" style="margin-left: 5px;box-shadow:0px 3px 3px #c8c8c8 ; width: 1150px;" header-cell-class-name="table-header"
				:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
                <el-table-column type="selection"> </el-table-column>
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
		inheritAttrs: false,
  		components: {},
  		props: [],
		data() {
			return {
				pageInfo: {
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
                residenceNameOptions: [{
                    "label": "黄金汉宫",
                    "value": "1"
                }, {
                    "label": "铂金汉宫",
                    "value": "2"
                }, {
                    "label": "钻石汉宫",
                    "value": "3"
                }],
				Ctxz:{
					dialogTableVisible:false
				},
                selecte:{
                    residenceName:''//选择楼盘
                },
				tableData:[],
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
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
			},
			indexMethod(index) {
				return index + 1 + (this.pageInfo.currentPage - 1) * this.pageInfo.pagesize;
			},
            selectnoe(){
                this.axios({
                    url:"http://localhost:8080/Property/tResidence/one",
                    method:'get',
                    params:this.selecte.residenceName
                }).then((response) =>{
                    console.log(this.selecte.residenceName)
                    console.log(response)
					this.tableData = response.data.list
					this.pageInfo.tableTotal = response.data.total//有几行总记录数
					console.log(tableData)
                }).catch((error) =>{

				}) 
            }
			
		},
        created(){
            
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
