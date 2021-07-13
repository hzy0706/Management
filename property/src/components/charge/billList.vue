<template>
  <div>
    <!-- 选择房间号 -->
    <!-- 多选框 -->
        <el-select v-model="resId" placeholder="请选择住宅">
          <el-option
            v-for="resi in residentials"
            :key="resi.residenceId"
            :label="resi.residenceName"
            :value="resi.residenceId">
          </el-option>
        </el-select>
        <el-select v-model="buidId" placeholder="请选择楼宇" @click="getBuild">
          <el-option
            v-for="build in builds"
            :key="build.buildingId"
            :label="build.buildingName"
            :value="build.buildingId">
          </el-option>
        </el-select>
        <el-select v-model="unitId" placeholder="请选择单元" @click="getUnit">
          <el-option
            v-for="unit in units"
            :key="unit.unitId"
            :label="unit.unitName"
            :value="unit.unitId">
          </el-option>
        </el-select>
        <el-select v-model="houseId" placeholder="请选择房间" @click="getHouse">
          <el-option
            v-for="unit in houses"
            :key="unit.unitId"
            :label="unit.unitName"
            :value="unit.houseId">
          </el-option>
        </el-select>
        <el-button @click="getTableData" type="primary">查询</el-button>


    <!-- 表数据 -->
    <el-table
      :data="BillDetailData"
      border
      style="width: 100%">
      <el-table-column
        prop="billDetailId"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="billInvoicenumber"
        label="收款单号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="house.houseName"
        label="房产名称"> 
      </el-table-column>
      <el-table-column
        prop="billDetailReceivable"
        label="应收金额"> 
      </el-table-column>
      <el-table-column
        prop="billRealmoney"
        label="实收金额"> 
      </el-table-column>
      <el-table-column
        prop="billReceiptnumber"
        label="收据号"> 
      </el-table-column>
      <el-table-column
        prop="billInvoicenumber"
        label="发票号"> 
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      residentials:[],
      resId:'',

      builds:[],
      buidId:'',

      units:[],
      unitId:'',

      houses:[],
      houseId:'',

      BillDetailData:[]
    }
  },
  created() {
    this.getAllDetail();
      //获取所有的住宅信息
      this.getResidentials();
  },
  mounted() {},
  methods: {
    getAllDetail(){
      this.axios({
        url:'http://localhost:8080/Property/billDetail/allBillDetail',
        method:'get'
      }).then(res=>{
        this.BillDetailData=res.data.data
      })
    },

    getResidentials(){
        this.axios({
          url:'http://localhost:8080/Property/selectAllTResidence',
          method:'get'
        }).then(res=>{
          console.log(res.data.data)
          this.residentials = res.data.data
        
        }).catch(err=>{
          console.log(err);
        })
      },
      getBuild(){
        this.axios({
          url:'http://localhost:8080/Property/selectAllTBuildingByRid/'+this.resId,
          method:'get'
        }).then(res=>{
          console.log(res);
          this.builds = res.data.data
          this.buidId=res.data.data.buildingId
        }).catch(err=>{
          console.log(err)
        })
      },
      getUnit() {
          this.axios({
            url:'http://localhost:8080/Property/selectAllTUnitByBid/'+this.buidId,
            method:'get'
          }).then(res=>{
            console.log(res)
            this.units = res.data.data
          }).catch(err=>{
            console.log(err);
          })
      },
      getHouse(){
        this.axios({
          url:'http://localhost:8080/Property/selectAllTHouseByUid/'+this.unitId,
          method:'get'
        }).then(res=>{
          console.log(res);
          this.houses=res.data.data
        }).catch(err=>{
          console.log(err)
        })
      },
      //获取根据houseId获取表格数据
      getTableData(){
        this.axios({
          url:'http://localhost:8080/Property/billDetail/billDetailByHouseId/'+this.houseId,
          method:'get'
        }).then(res=>{
          console.log(res)
          this.BillDetailData = res.data.data
        })
      }
  }
};
</script>
<style>
.el-table{
  margin-top: 30px;
}
</style>

