<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title">业主信息</div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							管理物业系统中业主的相关信息
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="pageInfo.value" placeholder="可根据业主姓名、紧急联系人查询" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="selectAllTOwners()">搜索</el-button>
			</div>
			<div class="el-select-table-two-s">
				<el-button style="margin-right: 20px;" @click="addClick()" type="success">+ 增加</el-button>
			</div>
			<el-table :data="ownerData" height="400" :row-style="{height:'45px'}" :cell-style="{padding:'0px'}" stripe
				class="table" ref="multipleTable" header-cell-class-name="table-header"
				:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
				<el-table-column type="index" :index="indexMethod" label="编号" min-width="120px">
				</el-table-column>
				<el-table-column label="姓名" align="center">
					<template #default="scope">
						<a @click="updateClick(scope.row)"
							style="text-decoration:underline;color: blue;">{{scope.row.ownerName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="ownerSex" label="性别" align="center"></el-table-column>
				<el-table-column prop="ownerBirth" label="出生日期" align="center"></el-table-column>
				<el-table-column prop="ownerNation" label="民族" align="center"></el-table-column>
				<el-table-column prop="ownerPhone" label="手机号码" align="center"></el-table-column>
				<el-table-column prop="ownerNo" label="证件号码" align="center"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button @click="selectFamily(scope.row)" type="text" size="small">
							家庭成员({{scope.row.familyCount}})</el-button>
						<div class="ivu-divider"></div>
						<el-button @click="selectHouse(scope.row)" type="text" size="small">
							房产信息({{scope.row.houseCount}})</el-button>
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
	<el-dialog title="业主房产信息" v-model="dialogVisible4" width="50%" :before-close="handleClose">
		<el-form :model="House" label-width="100px" class="demo-ruleForm">
			<el-form-item label="住宅">
				<el-select v-model="House.rid" placeholder="请选择" @change="selectAllTBuildingByRid()">
					<el-option v-for="item in residenceData" :key="item.residenceId" :label="item.residenceName"
						:value="item.residenceId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="楼宇">
				<el-select v-model="House.bid" placeholder="请选择" @change="selectAllTUnitByBid()">
					<el-option v-for="item in buildingData" :key="item.buildingId" :label="item.buildingName"
						:value="item.buildingId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单元">
				<el-select v-model="House.uid" placeholder="请选择" @change="selectAllTHouseByUid()">
					<el-option v-for="item in unitData" :key="item.unitId" :label="item.unitName" :value="item.unitId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="房间">
				<el-select v-model="House.houseId" placeholder="请选择" >
					<el-option v-for="item in houseData2" :key="item.houseId" :label="item.houseName"
						:value="item.houseId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="房产证号">
				<el-input v-model="House.houseNo"></el-input>
			</el-form-item>
			<el-form-item label="预计装修时间">
				<el-input type="date" v-model="House.decorateDate"></el-input>
			</el-form-item>
			<el-form-item label="备注">
				<el-input v-model="House.ohRemark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="saveHouse()">保存</el-button>
			</el-form-item>
		</el-form>
		<hr />
		<el-table :data="houseData" stripe :row-style="{height:'40px'}" :cell-style="{padding:'0px'}" class="table"
			ref="multipleTable" header-cell-class-name="table-header"
			:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
			<el-table-column prop="houseName" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="houseNo" label="房产证号" align="center"></el-table-column>
			<el-table-column prop="decorateDate" label="装修时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="180" align="center">
				<template #default="scope">
					<el-button @click="deleteClick2(scope.row)" type="text" size="small">删除
					</el-button>
				</template>
			</el-table-column>
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
				ownerData: [],
			}
		},
		created() {
			this.selectAllTOwners();
		},
		methods: {
			selectHouse(row) {
				this.$router.push("/House");
				sessionStorage.setItem("name", JSON.stringify(row.ownerId));
			},
			selectFamily(row) {
				this.$router.push("/Family");
				sessionStorage.setItem("name", JSON.stringify(row.ownerId));
			},
			selectAllTOwners() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTOwners", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.ownerData = response.data.data.list;
						_this.pageInfo.total = response.data.data.total
					}).catch(function(error) {
						console.log(error)
				})
			},
			updateClick(row) {
				this.$router.push("/updateOwer")
				sessionStorage.setItem("name", JSON.stringify(row));
			},
			addClick() {
				this.$router.push('/addOwer');
			},
			handleSizeChange(size) {
				this.pageInfo.pagesize = size;
				this.selectAllTOwners();
			},
			handleCurrentChange(currentPage) {
				this.pageInfo.currentPage = currentPage;
				this.selectAllTOwners();
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
