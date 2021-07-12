<template>

<el-row :gutter="20">
  <el-col :span="6"><div ></div></el-col>
  <el-col :span="6"><div >
      <h1>账单详情</h1>
      </div></el-col>
  <el-col :span="6"><div ></div></el-col>

</el-row>
<el-row :gutter="15">
  <el-col :span="3"><div></div></el-col>

   
  <el-col :span="12"><div class="grid-content bg-purple">
      <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{ prop: 'date', order: 'descending' }"
    @row-click="goDetails"
  >
    <el-table-column prop="date" label="日期" sortable width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" sortable width="180">
    </el-table-column>
    <el-table-column prop="address" label="地址" :formatter="formatter">
    </el-table-column>
  </el-table>
      </div></el-col>
  <el-col :span="3"><div></div></el-col>

</el-row>
 
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    goDetails(row, column, event) {
      this.$router.push({ path: "/details/detailsUpdate" }); //id
    },
  },
};
</script>