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
	<el-dialog title="新增业主信息" v-model="dialogVisible" width="40%" :before-close="handleClose">
		<el-form :model="Owner" :rules="Owner2" ref="Owner" label-width="100px" class="demo-ruleForm">
			<el-form-item label="业主姓名" prop="ownerName">
				<el-input v-model="Owner.ownerName"></el-input>
			</el-form-item>
			<el-form-item label="业主电话" prop="ownerPhone">
				<el-input v-model="Owner.ownerPhone"></el-input>
			</el-form-item>
			<el-form-item label="业主类别" prop="ownerType">
				<el-select v-model="Owner.ownerType" placeholder="请选择业主类别">
					<el-option label="正式业主" value="正式业主"></el-option>
					<el-option label="临时业主" value="临时业主"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="业主性别" prop="ownerSex">
				<el-radio-group v-model="Owner.ownerSex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出生日期" prop="ownerBirth">
				<el-input type="date" v-model="Owner.ownerBirth"></el-input>
			</el-form-item>
			<el-form-item label="业主民族">
				<el-input v-model="Owner.ownerNation"></el-input>
			</el-form-item>
			<el-form-item label="业主学历">
				<el-select v-model="Owner.ownerEducation" placeholder="请选择业主学历">
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
			<el-form-item label="证件类型">
				<el-select v-model="Owner.ownerNotype" placeholder="请选择证件类型">
					<el-option label="身份证" value="身份证"></el-option>
					<el-option label="护照" value="护照"></el-option>
					<el-option label="驾驶证" value="驾驶证"></el-option>
					<el-option label="营业执照" value="营业执照"></el-option>
					<el-option label="职业资格证" value="职业资格证"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="证件号码">
				<el-input v-model="Owner.ownerNo"></el-input>
			</el-form-item>
			<el-form-item label="工作单位">
				<el-input v-model="Owner.ownerWork"></el-input>
			</el-form-item>
			<el-form-item label="紧急联系人">
				<el-input v-model="Owner.urgentName"></el-input>
			</el-form-item>
			<el-form-item label="紧急联系电话">
				<el-input v-model="Owner.urgentPhone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOwner('Owner')">立即创建</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="编辑业主信息" v-model="dialogVisible2" width="40%" :before-close="handleClose">
		<el-form :model="Owner" :rules="Owner2" ref="Owner" label-width="100px" class="demo-ruleForm">
			<el-form-item label="业主姓名" prop="ownerName">
				<el-input v-model="Owner.ownerName"></el-input>
			</el-form-item>
			<el-form-item label="业主电话" prop="ownerPhone">
				<el-input v-model="Owner.ownerPhone"></el-input>
			</el-form-item>
			<el-form-item label="业主类别" prop="ownerType">
				<el-select v-model="Owner.ownerType" placeholder="请选择业主类别">
					<el-option label="正式业主" value="正式业主"></el-option>
					<el-option label="临时业主" value="临时业主"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="业主性别" prop="ownerSex">
				<el-radio-group v-model="Owner.ownerSex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="出生日期" prop="ownerBirth">
				<el-input type="date" v-model="Owner.ownerBirth"></el-input>
			</el-form-item>
			<el-form-item label="业主民族">
				<el-input v-model="Owner.ownerNation"></el-input>
			</el-form-item>
			<el-form-item label="业主学历">
				<el-select v-model="Owner.ownerEducation" placeholder="请选择业主学历">
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
			<el-form-item label="证件类型">
				<el-select v-model="Owner.ownerNotype" placeholder="请选择证件类型">
					<el-option label="身份证" value="身份证"></el-option>
					<el-option label="护照" value="护照"></el-option>
					<el-option label="驾驶证" value="驾驶证"></el-option>
					<el-option label="营业执照" value="营业执照"></el-option>
					<el-option label="职业资格证" value="职业资格证"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="证件号码">
				<el-input v-model="Owner.ownerNo"></el-input>
			</el-form-item>
			<el-form-item label="工作单位">
				<el-input v-model="Owner.ownerWork"></el-input>
			</el-form-item>
			<el-form-item label="紧急联系人">
				<el-input v-model="Owner.urgentName"></el-input>
			</el-form-item>
			<el-form-item label="紧急联系电话">
				<el-input v-model="Owner.urgentPhone"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateOwner('Owner')">立即修改</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
	<el-dialog title="业主家庭信息" v-model="dialogVisible3" width="70%" :before-close="handleClose">
		<el-form :model="Family" :rules="Family2" ref="Family" label-width="100px" class="demo-ruleForm">
			<el-form-item label="成员姓名" prop="sibName">
				<el-input v-model="Family.sibName"></el-input>
			</el-form-item>
			<el-form-item label="成员电话">
				<el-input v-model="Family.sibPhone"></el-input>
			</el-form-item>
			<el-form-item label="业主性别">
				<el-radio-group v-model="Family.sibSex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
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
			<el-form-item label="证件类型">
				<el-select v-model="Family.sibNotype" placeholder="请选择证件类型">
					<el-option label="身份证" value="身份证"></el-option>
					<el-option label="护照" value="护照"></el-option>
					<el-option label="驾驶证" value="驾驶证"></el-option>
					<el-option label="营业执照" value="营业执照"></el-option>
					<el-option label="职业资格证" value="职业资格证"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="证件号码">
				<el-input v-model="Family.sibNo"></el-input>
			</el-form-item>
			<el-form-item label="工作单位">
				<el-input v-model="Family.sibWork"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save('Family')">保存</el-button>
			</el-form-item>
		</el-form>
		<hr />
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
					<el-button @click="updateClick2(scope.row)" type="primary" icon="el-icon-edit" title="编辑" circle>
					</el-button>
					<div class="ivu-divider"></div>
					<el-button @click="deleteClick(scope.row)" type="danger" icon="el-icon-delete" title="删除" circle>
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
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
				familyData: [],
				houseData: [],
				residenceData: [],
				buildingData: [],
				unitData: [],
				houseData2: [],
				dialogVisible: false,
				dialogVisible2: false,
				dialogVisible3: false,
				dialogVisible4: false,
				House: {
					ohId: '',
					houseId: '',
					ownerId: '',
					houseNo: '',
					decorateDate: '',
					ohRemark: '',
					houseName: '',
					rid: '',
					bid: '',
					uid: ''
				},
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
				Owner: {
					ownerId: '',
					ownerType: '',
					ownerName: '',
					ownerSex: '',
					ownerBirth: '',
					ownerNation: '',
					ownerEducation: '',
					ownerNotype: '',
					ownerNo: '',
					ownerWork: '',
					ownerPhone: '',
					urgentName: '',
					urgentPhone: '',
					familyCount: '',
					houseCount: ''
				},
				Owner2: {
					ownerName: [{
						required: true,
						message: '请输入业主姓名',
						trigger: 'blur'
					}],
					ownerPhone: [{
						required: true,
						message: '请输入业主电话',
						trigger: 'blur'
					}],
					ownerType: [{
						required: true,
						message: '请选择业主类别',
						trigger: 'change'
					}],
					ownerSex: [{
						required: true,
						message: '请选择业主性别',
						trigger: 'change'
					}],
					ownerBirth: [{
						required: true,
						message: '请选择业主生日',
						trigger: 'change'
					}]
				},
				Family2: {
					sibName: [{
						required: true,
						message: '请输入成员姓名',
						trigger: 'blur'
					}]
				}

			}
		},
		created() {
			this.selectAllTOwners();
		},
		methods: {
			selectHouse(row) {
				this.selectAllTOwnerHouseByTid(row.ownerId);
				this.dialogVisible4 = true;
				this.House.ownerId = row.ownerId;
				this.selectAllTResidence();
			},
			deleteClick2(row){
				this.$confirm('此操作将永久删除家属信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const _this = this
					this.axios.delete("http://localhost:8080/Property/deleteByTOwnerHouseKey/" + row.ohId)
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
							_this.selectAllTOwnerHouseByTid(row.ownerId);
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
							_this.selectAllTFamilyByTid(_this.Family.ownerId);
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			updateClick2(row) {
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
			selectFamily(row) {
				this.selectAllTFamilyByTid(row.ownerId);
				this.dialogVisible3 = true;
				this.Family.ownerId = row.ownerId;
			},
			saveHouse() {
				const _this = this
				this.axios.post("http://localhost:8080/Property/addTOwnerHouse", this.House)
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
						_this.selectAllTOwnerHouseByTid(_this.House.ownerId);
						_this.dialogVisible4=false;
					}).catch(function(error) {
						console.log(error)
					})
			},
			save(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
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
								}).catch(function(error) {
									console.log(error)
								})
						}
					} else {
						ElMessage.warning({
							message: '有必填项未填写',
							type: 'warning'
						});
						return false;
					}
				});
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
				this.axios.get("http://localhost:8080/Property/selectAllTBuildingByRid/" + this.House.rid)
					.then(function(response) {
						_this.buildingData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTUnitByBid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTUnitByBid/" + this.House.bid)
					.then(function(response) {
						_this.unitData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTHouseByUid() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTHouseByUidAndState/" + this.House.uid)
					.then(function(response) {
						_this.houseData2 = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectAllTOwnerHouseByTid(tid) {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectAllTOwnerHouseByTid/" + tid)
					.then(function(response) {
						_this.houseData = response.data.data;
					}).catch(function(error) {
						console.log(error)
					})
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
			handleClose() {
				Object.keys(this.Owner).forEach((key) => (this.Owner[key] = ''))
				Object.keys(this.Family).forEach((key) => (this.Family[key] = ''))
				this.dialogVisible = false;
				this.dialogVisible2 = false;
				this.dialogVisible3 = false;
				this.dialogVisible4 = false;
				this.selectAllTOwners();
			},
			updateClick(row) {
				this.dialogVisible2 = true;
				this.Owner.ownerId = row.ownerId;
				this.Owner.ownerType = row.ownerType;
				this.Owner.ownerName = row.ownerName;
				this.Owner.ownerSex = row.ownerSex;
				this.Owner.ownerBirth = row.ownerBirth;
				this.Owner.ownerNation = row.ownerNation;
				this.Owner.ownerEducation = row.ownerEducation;
				this.Owner.ownerNotype = row.ownerNotype;
				this.Owner.ownerNo = row.ownerNo;
				this.Owner.ownerWork = row.ownerWork;
				this.Owner.ownerPhone = row.ownerPhone;
				this.Owner.urgentName = row.urgentName;
				this.Owner.urgentPhone = row.urgentPhone;
			},
			updateOwner(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const _this = this
						this.axios.put("http://localhost:8080/Property/updateTOwner", this.Owner)
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
								_this.dialogVisible2 = false;
								Object.keys(_this.Owner).forEach((key) => (_this.Owner[key] = ''))
								_this.selectAllTOwners();
							}).catch(function(error) {
								console.log(error)
							})
					} else {
						ElMessage.warning({
							message: '有必填项未填写',
							type: 'warning'
						});
						return false;
					}
				});
			},
			addClick() {
				this.dialogVisible = true;
			},
			addOwner(Owner) {
				this.$refs[Owner].validate((valid) => {
					if (valid) {
						const _this = this
						this.axios.post("http://localhost:8080/Property/addTOwner", this.Owner)
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
								_this.dialogVisible = false;
								Object.keys(_this.Owner).forEach((key) => (_this.Owner[key] = ''))
								_this.selectAllTOwners();
							}).catch(function(error) {
								console.log(error)
							})
					} else {
						ElMessage.warning({
							message: '有必填项未填写',
							type: 'warning'
						});
						return false;
					}
				});
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
