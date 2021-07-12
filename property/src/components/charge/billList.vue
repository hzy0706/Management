<template>
  <div>
    <h1 style="">账单查询</h1>
  </div>
  <div>
    <el-row :gutter="30">
      <!-- <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-row :gutter="40">
          <el-col :span="3"> </el-col> -->

          <!-- <el-col :span="6">
            <el-form-item label="选择楼盘" prop="field101">
              <el-select
                v-model="formData.field101"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field101Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="楼宇" prop="field102">
              <el-select
                v-model="formData.field102"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field102Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      
          <el-col :span="6">
            <el-form-item label="单元/楼层" prop="field103">
              <el-select
                v-model="formData.field103"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field103Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间" prop="field104">
              <el-select
                v-model="formData.field104"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in field104Options"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="3"> </el-col>
        </el-row>

        <el-form-item label="选择费项" prop="field105">
          <el-select
            v-model="formData.field105"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field105Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="生成日期" prop="field106">
          <el-date-picker
            v-model="formData.field106"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{ width: '100%' }"
            clearable
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="截止日期" prop="field107">
          <el-time-picker
            v-model="formData.field107"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            :picker-options="{ selectableRange: '00:00:00-23:59:59' }"
            :style="{ width: '100%' }"
            clearable
          ></el-time-picker>
        </el-form-item>

        <el-form-item label="收款人">
          <el-input v-model="input" placeholder="收款人"></el-input>
        </el-form-item>

        <el-form-item label="备注">
          <el-input v-model="input" placeholder="备注"></el-input>
        </el-form-item>

        <el-form-item label="业主名称">
          <el-input v-model="input" placeholder="业主名称"></el-input>
        </el-form-item>

        <el-form-item label="收款方式" prop="field103">
          <el-select
            v-model="formData.field103"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field103Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="优惠金额" prop="field103">
          <el-select
            v-model="formData.field104"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in field104Options"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-input v-model="input" placeholder="金额"></el-input> -->

        <!-- <el-form-item size="large"> -->
          <el-row :gutter="20">
  <el-col :span="6" :offset="2"><div >
 <el-input v-model="input" placeholder="输入房间名"   size="medium"></el-input>
    </div></el-col>
  <el-col :span="6"><div >
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div></el-col>
 
</el-row>
         
         
        <!-- </el-form-item> -->
      <!-- </el-form> -->
    </el-row>
  </div>
  <div>
    <el-table :data="tableData" @row-click="goDetails" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      input:'',
      formData: {
        field101: undefined,
        field102: undefined,
        field103: "",
        field104: "",
        field105: "",
        field106: null,
        field107: null,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "选择楼盘",
            trigger: "change",
          },
        ],
        field102: [],
        field103: [],
        field104: [],
        field105: [],
        field106: [],
        field107: [],
      },
      field101Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field102Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field103Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field104Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field105Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
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
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    goDetails(row, column, event) {
      this.$router.push({ path: "/bill/billDetails" }); //id
    },
  },
};
</script>
<style>
</style>
