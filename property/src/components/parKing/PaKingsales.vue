<template>
<el-dialog title="编辑车位信息" v-model="dialogFormVisible2">
		<el-descriptions title="销售信息">
			<el-descriptions-item label="车位编号">
				<el-input placeholder="请输入内容" v-model="tParking.pnumber" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位类别">
				<el-input placeholder="请输入内容" v-model="tParking.types" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="管理类别">
				<el-input placeholder="请输入内容" v-model="tParking.managemen" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="面积">
				<el-input placeholder="请输入内容" v-model="tParking.area" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="预售价格">
				<el-input placeholder="请输入内容" v-model="tParking.presale" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="车位位置">
				<el-input placeholder="请输入内容" v-model="tParking.position" :disabled="true">
				</el-input>
			</el-descriptions-item>
			
			<el-descriptions-item label="备注">
				<el-input placeholder="请输入内容" v-model="tParking.remarks" :disabled="true">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="产权人">
				<el-input placeholder="请输入内容" v-model="form.ownerId">
				</el-input>
			</el-descriptions-item>
			<!-- <el-descriptions-item label="实售价格">
				<el-input placeholder="请输入内容" v-model="form.price">
				</el-input>
			</el-descriptions-item> -->
			<el-descriptions-item label="车牌号码">
				<el-input placeholder="请输入内容" v-model="form.license">
				</el-input>
			</el-descriptions-item>
			<el-descriptions-item label="停车证号">
				<el-input placeholder="请输入内容" v-model="form.Parking">
				</el-input>
			</el-descriptions-item>
		</el-descriptions>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="updateTParkingSales">确 定</el-button>
			</span>
		</template>
	</el-dialog>
	车位状态：<el-select v-model="value1" placeholder="请选择">
		<el-option label="空闲" value="0">空闲</el-option>
		<el-option label="已售" value="1">已售</el-option>
		<el-option label="已租" value="2">已租</el-option>
	</el-select>
	车牌号：<el-input v-model="value2" style="width: 7.5rem;"></el-input>
	
	<p></p>
	<el-button>查询</el-button>
	<el-table :data="PaKingsales" stripe style="width: 100%">
		<el-table-column prop="parkingId" label="">
		</el-table-column>
		<!-- <el-table-column prop="residenceId" label="楼盘">
		</el-table-column> -->
		<el-table-column prop="pnumber" label="车位编号">
		</el-table-column>
		<el-table-column prop="managemen" label="管理类别">
			<template v-slot="scope">
				<p v-if="scope.row.managemen==0">出售</p>
				<p v-if="scope.row.managemen==1">出租</p>
			</template>
		</el-table-column>
		<!-- <el-table-column prop="price" label="实售价格">
		</el-table-column> -->
		<el-table-column prop="ownerId" label="产权人">
		</el-table-column>
		<el-table-column prop="license" label="车牌号码">
		</el-table-column>
		<el-table-column prop="Parking" label="停车证号">
		</el-table-column>
		<el-table-column>
			<template v-slot="scope">
			<el-button type="text" @click="update(scope.row)">销售</el-button>
			</template>
		</el-table-column>
		
	</el-table>
</template>

<script>
	export default{
		data(){
			return{
				dialogFormVisible2:false,
				PaKingsales:[],
				Parking:[],
				value1:"",
				value2:"",
				form: {
					pnumber:"",				
					parkingsalesId:"",
					salecontractId:"",
					price:"",
					license:"",
					parking:"",
					parkingId:"",
					ownerId:""
					
				},
				tParking:{
					pnumber:"",
					types:"",
					managemen:"",
					area:"",
					presale:"",
					position:"",
					remarks:""
				}
			}
		},
		methods: {
			handleSelectionChange(row) {
				console.log(row);
			},
			update(row){
				console.log("修改销售信息")
				this.form.parkingsalesId=row.parkingsalesId
				this.tParking.pnumber=row.pnumber
				this.tParking.types=row.types
				this.tParking.managemen=row.managemen
				this.tParking.area=row.area
				this.tParking.presale=row.presale
				this.tParking.position=row.position
				this.tParking.remarks=row.remarks
				this.form.ownerId=row.ownerId//产权人id
				this.form.price=row.price//实售价格
				this.form.license=row.license//车牌号码
				this.form.Parking=row.Parking//停车证号
				this.dialogFormVisible2 = true
			},
			updateState(){
				const _this = this
				console.log(this.form+"hh")
				this.axios.put("http://localhost:8080/Property/updateState", this.form)
					.then(function(response) {
						// _this.selectName()
						console.log(response.data)
						_this.dialogFormVisible2 = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateTParkingSales(){
				const _this = this
				this.axios.put("http://localhost:8080/Property/updateTParkingSales", this.form)
					.then(function(response) {
						// _this.selectName()
						_this.updateState()
						console.log(response.data)
						_this.dialogFormVisible2 = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectlicense() {
				var _this = this
				this.axios.get("http://localhost:8080/Property/selectlicense/" + this.value1 + "/" + this.value2)
					.then(function(response) {
						// 数据接收
						_this.PaKingsales = response.data;
					}).catch(function(error) {
						console.log(error)
					})
			}		
			},
			
			created() {
				const _this = this
				this.axios.get("http://localhost:8080/Property/selectmanagemen")
					.then(function(response) {
						_this.PaKingsales = response.data
						console.log(response.data)
					}).catch(function(error) {
						console.log(error)
					})
			
			}
			
	}
</script>

<style>
</style>
