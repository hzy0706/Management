<!--  -->
<template>
  <el-row :gutter="20">
    <el-col :span="3"
      ><div class="grid-content bg-purple">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :node-key="cid"
        ></el-tree></div
    ></el-col>

    <el-col :span="15"
      ><div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="right">
          <el-form-item label="楼盘名称">
            <el-input v-model="formInline.user" placeholder="楼盘名称"  :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="楼宇">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单元/楼层">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="费用起期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
           <el-form-item label="费用止期">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        
        </el-form>
        <el-row type="flex" >

  <el-col :span="6"><div class="grid-content bg-purple-light"> 台账名称<el-input v-model="input" :resize="horizontal"></el-input></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple">  <el-button size="mini" round>生成台账</el-button></div></el-col>
</el-row>
        
     
        
      </div>
      <div class="grid-content bg-purple">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table></div
    ></el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      data: [
        {
          label: "常规台账",
          children: [
            {
              label: "中东首府",
              children: [
                {
                  cid: 1,
                  label: "水电费",
                },
              ],
            },
            {
              label: "海边别墅",
              children: [
                {
                  label: "煤气费",
                },
              ],
            },
          ],
        },
        {
          label: "公摊台账",
          children: [
            {
              label: "中东首府",
              children: [
                {
                  label: "卫生费",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {
        name: "",
      },
    };
  },
  methods: {
    handleNodeClick(data, node, component) {
      // this.axios.get('http://localhost:8080/',data.cid)
    },
  },
};
</script>
<style  scoped>
</style>