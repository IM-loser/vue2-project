<template>
  <!-- 
    size	Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释	number / string	-	'30%'
    modal	是否需要遮罩层	boolean	—	true
    direction	Drawer 打开的方向	Direction	rtl / ltr / ttb / btt
   -->
   <el-drawer title="订单详情" 
   :visible="drawer" 
   :size="size" 
   :modal="false"
  :before-close="beforeClose"
   >
  <div class="orderdesc">
      <!-- 2. 列表展示 -->
      <div class='header'>
          <el-row :gutter="20">
              <el-col :span="18">
                  <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
                      <el-form-item label="订单编号" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入品牌名称"></el-input>
                      </el-form-item>
                      <el-form-item label="预定时间" label-width="100px">
                          <el-col :span="11">
                              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                                  style="width: 100%;"></el-date-picker>
                          </el-col>
                          <el-col class="line" :span="2">至</el-col>
                          <el-col :span="11">
                              <el-time-picker placeholder="选择时间" v-model="formInline.date2"
                                  style="width: 100%;"></el-time-picker>
                          </el-col>
                      </el-form-item>
                      <el-form-item label="下单人" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入"></el-input>
                      </el-form-item>
                      <el-form-item label="所属单位" label-width="100px">
                          <el-input v-model="formInline.user" placeholder="输入"></el-input>
                      </el-form-item>
                      <el-form-item label="汇总状态" label-width="100px">
                          <el-select v-model="formInline.region" placeholder="全部">
                              <el-option label="全部" value="shanghai"></el-option>
                              <el-option label="未汇总" value="shanghai"></el-option>
                              <el-option label="已汇总" value="beijing"></el-option>
                          </el-select>
                      </el-form-item>

                  </el-form>
              </el-col>
              <el-col :span="6">
                  <el-button type="primary">查询</el-button>
              </el-col>
          </el-row>
      </div>
      <!-- 4. 表格展示数据 -->
      <div class="list-content">
          <el-table :data="tableData" border style="width: 100%"
              :header-cell-style="{ background: '#fafafa', color: '#333', textAlgin: 'center' }">
              <el-table-column prop="title" label="产品名称">
              </el-table-column>
              <el-table-column prop="price" label="价格"></el-table-column>
              <el-table-column prop="guige" label="规格"></el-table-column>
              <el-table-column prop="num" label="数量"></el-table-column>
              <el-table-column prop="sum" label="小计（元）"></el-table-column>
          </el-table>
      </div>

  </div>
</el-drawer>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
      return {
          formInline: {},
          tableData: [],
          direction:'',
          size:'90%',
          drawer:false,
          menu:200,
          width:''
      }
  },
  computed:{
    ...mapState(['isCollapse'])
  },
  methods:{
    //关闭抽屉------------------
    beforeClose(){
      this.drawer = false;
    }
  },
  created() {
      this.$api.getDetail()
          .then(res => {
              console.log('-----详情信息---------', res.data);
              this.tableData = res.data.result.list
          })
  },
  mounted() {
    let width = document.documentElement.clientWidth;
    // let menu = document.querySelector('.menu').clientWidth;
    // console.log(width,'menu---',menu);
    this.size = width - this.menu - 10 + 'px';
    this.width = width;
  },
  watch:{
    isCollapse(val){
        val?this.menu=64:this.menu=200;
        this.size = this.width - this.menu - 10 + 'px';
    }
  }

}
</script>

<style lang="less" scoped>
.orderdesc {
  padding: 10px;
  margin: 20px;
}

.header {
  margin-top: 20px;

  .el-form--inline .el-form-item {
      margin-right: 20px;
  }
}
</style>