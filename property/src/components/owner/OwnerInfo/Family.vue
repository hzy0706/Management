<template>
	<el-row>
		<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
			<div class="el-center-title-content">
				<div class="ivn-page-header-main">
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-title"><router-link :to="{name:'Owner'}" style="font-size: 20px;font-weight: 500;">业主信息</router-link></div>
					</div>
					<div class="ivn-page-header-row">
						<div class="ivu-page-header-content">
							业主家庭信息维护
						</div>
					</div>
				</div>
			</div>
		</el-col>
	</el-row>
	<div>
		<el-form :model="Family" label-width="100px" class="demo-ruleForm">
			<div class="div1">
				<el-form-item label="成员姓名" prop="sibName">
					<el-input v-model="Family.sibName"></el-input>
				</el-form-item>
				<el-form-item label="出生日期">
					<el-input type="date" v-model="Family.ownerBirth"></el-input>
				</el-form-item>
				<el-form-item label="成员关系">
					<el-select v-model="Family.sibRelation" placeholder="请选择与业主关系">
						<el-option label="夫妻" value="夫妻"></el-option>
						<el-option label="父子" value="父子"></el-option>
						<el-option label="父女" value="父女"></el-option>
						<el-option label="母子" value="母子"></el-option>
						<el-option label="母女" value="母女"></el-option>
						<el-option label="兄弟" value="兄弟"></el-option>
						<el-option label="兄妹" value="兄妹"></el-option>
						<el-option label="姐弟" value="姐弟"></el-option>
						<el-option label="姐妹" value="姐妹"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="成员电话">
					<el-input v-model="Family.sibPhone"></el-input>
				</el-form-item>
				<el-form-item label="证件类型">
					<el-select v-model="Family.sibNotype" placeholder="请选择证件类型">
						<el-option label="身份证" value="身份证"></el-option>
						<el-option label="护照" value="护照"></el-option>
						<el-option label="驾驶证" value="驾驶证"></el-option>
						<el-option label="营业执照" value="营业执照"></el-option>
						<el-option label="职业资格证" value="职业资格证"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="成员学历">
					<el-select v-model="Family.sibEducation" placeholder="请选择成员学历">
						<el-option label="小学" value="小学"></el-option>
						<el-option label="初中" value="初中"></el-option>
						<el-option label="高中" value="高中"></el-option>
						<el-option label="中专" value="中专"></el-option>
						<el-option label="职高" value="职高"></el-option>
						<el-option label="大专" value="大专"></el-option>
						<el-option label="本科" value="本科"></el-option>
						<el-option label="硕士研究生" value="硕士研究生"></el-option>
						<el-option label="博士研究生" value="博士研究生"></el-option>
						<el-option label="其他" value="其他"></el-option>
					</el-select>
				</el-form-item>
			</div>
			<div class="div1">
				<el-form-item label="成员性别">
					<el-radio-group v-model="Family.sibSex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="证件号码">
					<el-input v-model="Family.sibNo"></el-input>
				</el-form-item>
				<el-form-item label="工作单位">
					<el-input v-model="Family.sibWork"></el-input>
				</el-form-item>
			</div>
			<el-form-item style="position: absolute;top:400px;left: 570px;">
				<el-button type="primary" style="width: 200px;" @click="save()">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
	<el-table :data="familyData" stripe :row-style="{height:'40px'}" :cell-style="{padding:'0px'}" class="table"
		ref="multipleTable" header-cell-class-name="table-header"
		:header-cell-style="{background:'#f8f8f9',color:'#606266'}">
		<el-table-column prop="sibName" label="姓名" align="center">
		</el-table-column>
		<el-table-column prop="sibSex" label="性别" align="center"></el-table-column>
		<el-table-column prop="sibPhone" label="手机号码" align="center"></el-table-column>
		<el-table-column prop="sibNo" label="证件号码" align="center"></el-table-column>
		<el-table-column prop="sibWork" label="工作单位" align="center"></el-table-column>
		<el-table-column prop="sibRelation" label="关系" align="center"></el-table-column>
		<el-table-column label="操作" width="180" align="center">
			<template #default="scope">
				<el-button @click="updateClick(scope.row)" type="text" size="small">编辑
				</el-button>
				<div class="ivu-divider"></div>
				<el-button @click="deleteClick(scope.row)" type="text" size="small">删除
				</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import {
		ElMessage
	} from 'element-plus'
	
	export default{
		created() {
			this.id= JSON.parse(sessionStorage.getItem('name'))
			this.selectAllTFamilyByTid(this.id);
		},
		data(){
			return{
				id:'',
				Family: {
					sibId: '',
					ownerId: '',
					sibName: '',
					sibRelation: '',
					sibPhone: '',
					sibSex: '',
					sibNotype: '',
					sibNo: '',
					sibWork: '',
					sibEducation: '',
					ownerBirth: ''
				},
				familyData:[]
			}
		},
		methods:{
			clear(){
				Object.keys(this.Family).forEach((key) => (this.Family[key] = ''))
			},
			selectAllTFamilyByTid(tid) {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTFamilyByTid/" + tid)
					.then(function(response) {
						_this.familyData = response.data.data;
					}).catch(function(error) {
						console.log(error)
				})
			},
			save(){
				this.Family.ownerId=this.id;
				if (this.Family.sibId == null || this.Family.sibId == '') {
					const _this = this
					this.axios.post("http://localhost:8080/Property/addTFamily", this.Family)
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
							_this.selectAllTFamilyByTid(_this.Family.ownerId);
							_this.clear();
						}).catch(function(error) {
							console.log(error)
						})
				} else {
					const _this = this
					this.axios.put("http://localhost:8080/Property/updateByTFamilyKeySelective", this
							.Family)
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
							_this.selectAllTFamilyByTid(_this.Family.ownerId);
							_this.clear();
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			updateClick(row) {
				this.Family.sibId = row.sibId;
				this.Family.ownerId = row.ownerId;
				this.Family.sibName = row.sibName;
				this.Family.sibRelation = row.sibRelation;
				this.Family.sibSex = row.sibSex;
				this.Family.sibPhone = row.sibPhone;
				this.Family.sibNotype = row.sibNotype;
				this.Family.sibWork = row.sibWork;
				this.Family.sibEducation = row.sibEducation;
				this.Family.sibNo = row.sibNo;
				this.Family.ownerBirth = row.ownerBirth;
			},
			deleteClick(row) {
				this.$confirm('此操作将永久删除家属信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const _this = this
					this.axios.delete("http://localhost:8080/Property/deleteByTFamilyKey/" + row.sibId + "/" + row
							.ownerId)
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
							_this.selectAllTFamilyByTid(row.ownerId);
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		}
	}
</script>

<style>
	.table {
		margin-left: 20px;
		width: 95%;
		font-size: 14px;
	}
	.div1{
		float:left;
		margin-left: 30px;
		margin-top: 30px;
		width: 400px;
		height: 300px;
	}
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
	.el-button {
		width: min-content;
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
