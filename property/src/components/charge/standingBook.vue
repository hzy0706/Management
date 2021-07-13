<!--  -->
<template>
  <div>
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

    <el-col :span="12" :offset="3">
      <div class="grid-content bg-purple">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div>
              费项名称：<span>{{ payItem.ctName }}</span>
               单价:<span>{{
                payItem.ctSubtotal
              }}</span>
            </div></el-col
          >
          <el-col :span="6"><div></div></el-col>
        </el-row>

      <el-row>
          <el-form :model="formData" class="demo-form-inline" inline="true">
          
   

          <el-form-item label="楼盘" >
            <el-input
            size="small"
              placeholder=""
              readonly="true"
              v-model="house.residenceName"
              
              >中东首栋</el-input
            >
          </el-form-item>
          <el-form-item label="楼宇">
            <el-select v-model="buId" @change="buChange">
              <el-option
                v-for="item in buList"
                :key="item.buildingId"
                :label="item.buildingName"
                :value="item.buildingId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="楼层">
            <el-select v-model="fId" @change="flChange">
              <el-option
                v-for="item in floor"
                :key="item.buildingId"
                :label="item.unitName"
                :value="item.unitId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="房间">
            <el-select v-model="rId">
              <el-option
                v-for="item in room"
                :key="item.houseId"
                :label="item.houseName"
                :value="item.houseId"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开始时间">
            <el-input placeholder="" v-model="begin">中东首栋</el-input>
          </el-form-item>

          <el-form-item label="结束时间">
            <el-input placeholder="" v-model="end">中东首栋</el-input>
          </el-form-item>

          <el-form-item label="台账名称">
            <el-input v-model="parName">中东首栋</el-input>
          </el-form-item>

          <el-form-item label="台账备注">
            <el-input v-model="parMark">中东首栋</el-input>
          </el-form-item>

          <el-form-item label="创建人">
            <el-input v-model="man">中东首栋</el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createPay">生成台账</el-button>
          </el-form-item>
        </el-form>
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
      begin: "",
      end: "",
      parName: "",
      parMark: "",
      data: [
        {
          label: "中东首栋",
          children: [
            {
              label: "常规费项",

              children: [
                {
                  cid: 1,
                  label: "水电费",
                },
              ],
            },
          ],
        },
      ],
      man: "",
      buId: "",
      fId: "",
      rId: "",
      buList: [],

      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {
        name: "",
      },
      formData: [],
      house: {
        residenceId: 1,
        residenceName: "",
        greenArea: 66.66,
        floorArea: 77.66,
        address: "英国首都伦敦",
        coveredArea: 10.0,
        roadArea: 1.0,
        taskName: "单新龙",
        developer: "单新龙",
      },
      floor: [],
      room: [],
      payItem: {},
    };
  },
  methods: {
    getbegin(data) {
      this.begin = data;
    },
    getend(data) {
      this.end = data;
    },
    handleNodeClick(data, node, component) {
      this.axios
        .get("http://192.168.43.141:8080/Property/findByIdRes/" + data.cid)
        .then((res) => {
          this.house = res.data.data;
        });
      this.axios
        .get(
          "http://192.168.43.141:8080/Property/selectAllTBuildingByRid/" +
            this.house.residenceId
        )
        .then((res) => {
          this.buList = res.data.data;
        });
      this.axios
        .get("http://192.168.43.141:8080/Property/findByIdRes/" + data.cid)
        .then((res) => {
          this.house = res.data.data;
        });
      this.axios
        .get("http://192.168.43.141:8080/Property/tCostitem/one?id=1")
        .then((res) => {
          this.payItem = res.data;
        });
    },
    buChange() {
      this.axios
        .get(
          "http://192.168.43.141:8080/Property/selectAllTUnitByBid/" + this.buId
        )
        .then((res) => {
          this.floor = res.data.data;
          // console.log( this.floor)
        });
    },
    flChange() {
      this.axios
        .get(
          "http://192.168.43.141:8080/Property/selectAllTHouseByUid/" + this.fId
        )
        .then((res) => {
          this.room = res.data.data;
          console.log(this.room);
        });
    },
    createPay() {
      var bookItem = {
        parId: null,
        parName: this.parName,
        parCostname: this.payItem.ctName,
        parCreatedate: this.begin,
        parMark: this.man,
        houseId: this.rId,
        parDeBegin: this.end,
        parDeEnd: this.end,
        tParameterDetail: [
          {
            parDeId: "",
            parId: "",
            ctId: 1,
            parDeAssessment: "",
            parDeBegin: "",
            parDeEnd: "",
            parDeDeadline: "",
            parDeState: "",
          },
        ],
      };
      this.axios
        .post("http://192.168.43.141:8080/Property/parameter/add", bookItem)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
  created() {},
};
</script>
<style  scoped>
</style>