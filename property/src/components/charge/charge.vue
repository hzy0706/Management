<template>
    <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple">
      <el-input v-model="input" placeholder="按照业主名/房间编号查询"></el-input> <el-button type="primary" icon="el-icon-search" style="margin-left:-170px">查询</el-button>
      
      </div></el-col>
  <el-col :span="10" offset="3" ><div class="grid-content bg-purple"></div></el-col>
</el-row>
    <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple">
      </div></el-col>
  <el-col :span="10" offset="3" ><div class="grid-content bg-purple"></div></el-col>
</el-row>
    <el-row :gutter="20">
  <el-col :span="4"><div class="grid-content bg-purple">


  <el-table
    :data="tableData"
    style="width: 100%"
    :size="mini"
     @row-click="goDetails"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="address"
      label="房产名称">
    </el-table-column>
  </el-table>
      </div></el-col>
  <el-col :span="10" offset="3" ><div class="grid-content bg-purple"></div></el-col>
</el-row>


</template>



<script>


export default {
    data(){
        return{
            tableData: [{
                address: '中东首府'
            }]
        }
    },
    methods :{
         goDetails(row, column, event) {
             
    }
    }
 
};
</script>

<style>

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
