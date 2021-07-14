<template>
	<el-dialog title="新增车位信息" v-model="dialogFormVisible">
		<el-form :model="form">
			基本信息：
			<br>
			<el-form-item label="选择楼盘:" :label-width="residenceId">
				<el-select v-model="form.residenceId" placeholder="请选择">
					<el-option v-for="item in residence" :key="item.residenceId" :label="item.residenceName"
						:value="item.residenceId">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车位类别" :label-width="formLabelWidth">
				<el-select v-model="form.types">
					<el-option label="地上" value="0">地上</el-option>
					<el-option label="地下" value="1">地下</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车位类型" :label-width="formLabelWidth">
				<el-select v-model="form.type">
					<el-option label="标准车位" value="0">标准车位</el-option>
					<el-option label="大型车位" value="1">大型车位</el-option>
					<el-option label="小型车位" value="2">小型车位</el-option>
					<el-option label="特殊车位" value="3">特殊车位</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="车位编号" :label-width="formLabelWidth">
				<el-input v-model="form.pnumber" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="管理类别" :label-width="formLabelWidth">
				<el-select v-model="form.managemen">
					<el-option label="出售" value="0">出售</el-option>
					<el-option label="出租" value="1">出租</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="状态" :label-width="formLabelWidth">
				<el-input placeholder="空闲" v-model="form.state" :disabled="true">
				</el-input>
			</el-form-item>
			<el-form-item label="备注" :label-width="formLabelWidth">
				<el-input v-model="form.remarks" autocomplete="off"></el-input>
			</el-form-item>
			<hr><br>
			租售信息：<br>
			<el-form-item label="预售价格" :label-width="formLabelWidth">
				<el-input v-model="form.presale" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="预租价格" :label-width="formLabelWidth">
				<el-input v-model="form.preprice" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="车位位置" :label-width="formLabelWidth">
				<el-input v-model="form.position" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="车位面积" :label-width="formLabelWidth">
				<el-input v-model="form.area" autocomplete="off"></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="addParking">确 定</el-button>
			</span>
		</template>
	</el-dialog>

	<el-dialog title="修改车位信息" v-model="dialogFormVisible2">
		<el-descriptions title="车位信息">
			<el-descriptions-item label="选择楼盘">
				<el-input placeholder="请输入内容" v-model="form.residenceId" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位编号">
				<el-input placeholder="请输入内容" v-model="form.pNumber" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位类别">
				<el-select v-model="form.types">
					<el-option value="0" label="地上">地上</el-option>
					<el-option value="1" label="地下">地下</el-option>
				</el-select>
			</el-descriptions-item>
			<el-descriptions-item label="管理类别">
				<el-input placeholder="请输入内容" v-model="form.managemen" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位类型">
				<el-select v-model="form.type">
					<el-option value="0" label="标准车位">标准车位</el-option>
					<el-option value="1" label="大型车位">大型车位</el-option>
					<el-option value="2" label="小型车位">小型车位</el-option>
					<el-option value="3" label="特殊车位">特殊车位</el-option>
				</el-select>
			</el-descriptions-item>
			<el-descriptions-item label="当前状态">
				<el-input placeholder="请输入内容" v-model="form.state" :disabled="true">
					<template v-slot="scope">
						<p v-if="scope.row.state==0">空闲</p>
						<p v-if="scope.row.state==1">已售</p>
						<p v-if="scope.row.state==2">已租</p>
					</template>
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="备注">
				<el-input placeholder="请输入内容" v-model="form.remarks">
				</el-input>
			</el-descriptions-item>
			租售信息：
			<el-descriptions-item label="预售价格">
				<el-input placeholder="请输入内容" v-model="form.presale">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="预租价格">
				<el-input placeholder="请输入内容" v-model="form.preprice">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位位置">
				<el-input placeholder="请输入内容" v-model="form.position">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="面积">
				<el-input placeholder="请输入内容" v-model="form.area">
				</el-input>
			</el-descriptions-item>

		</el-descriptions>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="updateParKing">确 定</el-button>
			</span>
		</template>
	</el-dialog>

	<!-- 选择楼盘：<el-select v-model="value1" pformLabelWidthlaceholder="请选择">
		<el-option v-for="item in residence" :key="item.residenceId" :label="item.residenceName"
			:value="item.residenceId">
		</el-option>
	</el-select> -->
	车位状态：<el-select v-model="value3" placeholder="请选择">
		<el-option label="空闲" value="0">空闲</el-option>
		<el-option label="已售" value="1">已售</el-option>
		<el-option label="已租" value="2">已租</el-option>
	</el-select>
	车位编号：<el-input v-model="value2" style="width: 7.5rem;"></el-input>
	<p></p>
	<el-button @click="selectstate()">查询</el-button>
	<el-button @click="dialogFormVisible=true">新增</el-button>
	<el-table :data="ParKing" stripe style="width: 100%">
		<el-table-column prop="parkingId" label="">
		</el-table-column>
		<el-table-column prop="tresidence.residenceName" label="楼盘">
		</el-table-column>
		<el-table-column prop="pnumber" label="车位编号">
			<template v-slot="scope">
				<el-button type="text" @click="update(scope.row)">
					{{scope.row.pnumber}}
				</el-button>
			</template>
		</el-table-column>
		<el-table-column prop="state" label="状态">
			<template v-slot="scope">
				<p v-if="scope.row.state==0">空闲</p>
				<p v-if="scope.row.state==1">已售</p>
				<p v-if="scope.row.state==2">已租</p>
			</template>
		</el-table-column>
		<el-table-column prop="types" label="车位类别">
			<template v-slot="scope">
				<p v-if="scope.row.types==0">地上</p>
				<p v-if="scope.row.types==1">地下</p>
			</template>
		</el-table-column>
		<el-table-column prop="managemen" label="管理类别">
			<template v-slot="scope">
				<p v-if="scope.row.managemen==0">出售</p>
				<p v-if="scope.row.managemen==1">出租</p>
			</template>
		</el-table-column>
		<el-table-column prop="presale" label="预售价格">
		</el-table-column>
		<el-table-column prop="preprice" label="预租价格">
		</el-table-column>
		<el-table-column prop="position" label="位置">
		</el-table-column>
		<el-table-column prop="area" label="面积">
		</el-table-column>
	</el-table>
</template>

<script>
	export default {
		data() {
			return {
				dialogFormVisible: false,
				dialogFormVisible2: false,
				ParKing: [],
				residence: [],
				value1: "",
				value2: "",
				value3: "",
				form: {
					parkingId: "",
					salecontractId: "",
					residenceId: "",
					pnumber: "",
					state: "",
					type: "",
					types: "",
					managemen: "",
					presale: "",
					preprice: "",
					position: "",
					area: "",
					remarks: "",
					leasecontractId: ""
				}
			}
		},
		methods: {
			handleSelectionChange(row) {
				console.log(row);
			},

			addParking() {
				const _this = this
				console.log("=========")
				console.log(this.form)
				this.axios.post("http://localhost:8080/Property/insertTRarKing", this.form)
					.then(function(response) {
						console.log(response)
						var ParKing = response.data
						_this.ParKing.push(ParKing)
						_this.dialogFormVisible = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectstate() {
				var _this = this
				this.axios.get("http://localhost:8080/Property/selectstate/" + this.value3 + "/" + this.value2)
					.then(function(response) {
						// 数据接收
						_this.ParKing = response.data;
					}).catch(function(error) {
						console.log(error)
					})
			},
			update(row) {
				console.log("修改车位信息")
				this.form.parkingId=row.parkingId
				this.form.residenceId = row.residenceId //楼盘id
				this.form.pnumber = row.pnumber //车位编号
				this.form.types = row.type //车位类别
				this.form.managemen = row.managemen //管理类别
				this.form.type = row.type //车位类型
				this.form.state = row.state //当前状态
				this.form.remarks = row.remarks //备注
				this.form.presale = row.presale //预售价格
				this.form.preprice = row.preprice //预租价格
				this.form.position = row.position //车位位置
				this.form.remarks = row.remarks //面积
				this.dialogFormVisible2 = true
			},
			updateParKing() {
				const _this = this
				console.log(this.form.parkingId+"lll")
				this.axios.put("http://localhost:8080/Property/updateTParKing", this.form)
					.then(function(response) {
						// _this.selectName()
						console.log(response.data)
						_this.dialogFormVisible2 = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateTParKing() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectstate/" + value3)
					.then(function(response) {
						_this.ParKing = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8080/Property/selectTParKing")
				.then(function(response) {
					_this.ParKing = response.data
					console.log(response.data)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8080/Property/selectAllTResidence")
				.then(function(response) {

					_this.residence = response.data.data
					console.log(_this.residence)
				}).catch(function(error) {
					console.log(error)
				})

		}
	}
</script>

<style>

</style>
