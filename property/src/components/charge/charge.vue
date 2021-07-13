<template>
<div>
 <el-row :gutter="20">
    <el-col :span="4"><div class="grid-content bg-purple">
        <el-input
          v-model="roomId"
          placeholder="按照业主名/房间编号查询"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="selectBills"
          >查询</el-button
        >
      </div>
      </el-col>
    <el-col :span="10" offset="3"
      ><div class="grid-content bg-purple">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          ref="tableCompponet"
        >
          <el-table-column width="120" type="selection"> </el-table-column>

          <el-table-column prop="ctName" label="费项名称" width="120">
          </el-table-column>

          <el-table-column prop="costMoney" label="单价" width="120">
          </el-table-column>

          <el-table-column label="上次读数" width="120">
            50.00
          </el-table-column>

          <el-table-column label="本次读数" width="120">
            150.00
          </el-table-column>

          <el-table-column label="实际用量" width="120">
            100.00
          </el-table-column>

          <el-table-column prop="costMoney" label="费用金额" width="120">
          </el-table-column>

          <el-table-column prop="breakMoney" label="滞纳金" width="120">
          </el-table-column>

          <el-table-column prop="costMoney" label="本次应付" width="120">
          </el-table-column>

          <el-table-column label="费用减免" width="120"> 0.00 </el-table-column>

          <el-table-column
            prop="chargeCostsBegintime"
            label="费用起期"
            width="120"
          >
          </el-table-column>

          <el-table-column
            prop="chargeCostsEndtime"
            label="费用止期"
            width="120"
          >
          </el-table-column>

          <el-table-column label="记录人" width="120">
            物业企业版用户
          </el-table-column>
        </el-table>
      </div></el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="4"
      ><div>
        <!-- <el-table
    :data="tableData"
    style="width: 100%"
    :size="mini"
     @row-click="goDetails"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="address"
      label="房产名称">
    </el-table-column>
  </el-table> -->
      </div>
    </el-col>

    <el-col :span="10">
      <div class="grid-content bg-purple">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple"> 房间编号：<span>{{roomId}}</span></div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple"> <el-button size="mini" round @click="createPay"> 生成账单</el-button>
          </div></el-col>
     
        </el-row>
      </div>
    </el-col>
  </el-row>
</div>
 
</template>



<script>
export default {
  data() {
    return {
      roomId: "",
      tableData: [],
    };
  },
  methods: {
    createPay(){
       let select = this.$$refs.tableData.selection;
       const data  = {select:select,
       list:data}
       this.axios
        .post(
          "http://192.168.43.141:8080/Property/bill/addBill/" ,data
        )
        .then((res) => {
          this.tableData = res.data.data;
        });
    },
    goDetails(row, column, event) {},
    selectBills() {
      this.axios
        .get(
          "http://192.168.43.141:8080/Property/chargeCosts/getByHoseId/" +
            this.roomId
        )
        .then((res) => {
          this.tableData = res.data.data;
        });
    },
  },
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
