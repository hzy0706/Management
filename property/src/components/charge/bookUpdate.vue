<template>
  <div>
    <!-- 多选框 -->
        <el-select v-model="resId" placeholder="请选择住宅">
          <el-option
            v-for="resi in residentials"
            :key="resi.residenceId"
            :label="resi.residenceName"
            :value="resi.residenceId">
          </el-option>
        </el-select>
        
        <el-button @click="getTableData" type="primary">查询</el-button>
    <div class="oneTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
          <el-table-column
            prop="par_costname"
            label="所属楼盘"
            width="180">
          </el-table-column>
          <el-table-column
            prop="par_name"
            label="台账名称"
            width="350">
          </el-table-column>
          <el-table-column
            prop="par_costname"
            label="费用名称"
            width='200'>
          </el-table-column>
          <el-table-column
            prop="par_createdate"
            label="生成日期">
          </el-table-column>
          <el-table-column
            prop="par_mark"
            label="备注">
          </el-table-column>
      </el-table>
    </div>

  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      residentials:[],
      resId:'',


      //以下是表数据
      tableData:[]

    }
  },
  methods: {
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
      
      //获取根据houseId获取表格数据
      getTableData(){
        this.axios({
          url:'http://localhost:8080/Property/parameter/byHouseId/'+this.resId,
          method:'get'
        }).then(res=>{
          console.log(res)
          this.tableData = res.data.data
        })
      }



  },
  created() {
      //获取所有的住宅信息
      this.getResidentials();
  },
  mounted() {

  },
  
}

</script>
<style>

.el-select{
  margin-top: 20px;
  margin-right: 100px;
}
.oneTable{
  margin-top: 30px;
}
</style>
