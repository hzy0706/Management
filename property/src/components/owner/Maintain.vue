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
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button @click="findMaintain(scope.row)" type="text" size="small">查看详情
						</el-button>
					</template>
				</el-table-column>
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
				Maintain:{},
			}
		},
		created() {
			this.selectAllTMaintainByState();
		},
		methods: {
			controller(row){
				if(row.maintainState==0){
					this.$router.push("/updateMaintain");
					sessionStorage.setItem("name", JSON.stringify(row));
				}
				if(row.maintainState==1){
					this.$router.push("/appMaintain");
					sessionStorage.setItem("name", JSON.stringify(row));
				}
				if(row.maintainState==2 || row.maintainState==3){
					this.$router.push("/findMaintain");
					sessionStorage.setItem("name", JSON.stringify(row));
				}
			},
			findMaintain(row){
				this.$router.push("/findMaintain");
				sessionStorage.setItem("name", JSON.stringify(row));
			},
			addClick(){
				this.$router.push("/addMaintain");
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
