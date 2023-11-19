<template>
  <div>
    <Breadcrumb></Breadcrumb>
    <!-- 顶部区域 -->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="预定编号">
            <el-input v-model="formInline.name" size="small" placeholder="预定编号"></el-input>
          </el-form-item>
          <el-form-item label="预定时间">
            <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button size="small" type="warning" @click="orderCollect">订单汇总</el-button>
        <!-- <el-button size="small" type="warning">导出</el-button> -->
        <!-- 导出当前的表格数据 tableData -->
        <download-excel class="export-excel-wrapper" :data="tableData" :fields="json_fields" :header="title"
          name="采购公司订单列表.xls">
          <el-button size="small" type="warning">导出</el-button>
        </download-excel>
        <!-- 导出选中的订单编号 -->
        <!-- <download-excel class="export-excel-wrapper" :data="DetailsForm" :fields="json_fields" :header="title"
          name="xxx公司订单列表.xls">
          <el-button size="small" type="warning">导出</el-button>
        </download-excel> -->
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
        cell-class-name="table-center" @select="select">
        <el-table-column type="selection" width="55" :selectable="selectable">
        </el-table-column>
        <el-table-column prop="code" label="订单编号">
          <template slot-scope="scope">
            <span @click="OrderDecs(scope.row)" style="color:blue;cursor: pointer;">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ordername" label="下单人">
        </el-table-column>
        <el-table-column prop="company" label="所属单位">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="yudingTime" label="预定时间">
          <!-- <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}
          </template> -->
        </el-table-column>
        <el-table-column prop="price" label="订单总价格">
        </el-table-column>
        <el-table-column prop="huizongStatus" label="汇总状态">
          <!-- <template slot-scope="scope">
            {{ scope.row.huizongStatus == 1 ? '未汇总' : '已汇总' }}
          </template> -->
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>

    </div>

    <!-- 抽屉组件 -->
    <OrderDecs ref="child"></OrderDecs>
  </div>

</template>

<script>
import dayjs from 'dayjs'
import Pagination from '@/components/pagination/Pagination.vue'
import OrderDecs from './OrderDecs.vue'
export default {
  components: {
    Pagination,
    OrderDecs
  },
  data() {
    return {
      formInline: {},
      tableData: [],//订单列表数据展示
      total: 10,
      pageSize: 1,
      ids: [],//操作id数组集合]
      DetailsForm: [],//需要导出的数据 [{},{}]
      json_fields: {//映射字段值
        // "订单编号": 'code',
          //数字处理--
          "订单编号":{
          field:"code",
          callback:value=>{
            return '&nbsp;'+value;
          }
        },
        "下单人": 'ordername',
        "所属单位": 'company',
        "联系电话": 'phone',
        "预定时间":'yudingTime',
        "订单总价格":'price',
        "汇总状态":'huizongStatus'
      },
      title: '公司采购系统订单列表',//
    }
  },
  methods: {
    dayjs,
    //点击进入订单详情界面------------------------
    OrderDecs() {
      this.$refs.child.drawer = true;
    },
    //点击订单汇总------1.获取选中的订单 2. 提交汇总  3. 修改汇总状态-------------------
    orderCollect() {
      //判断ids长度 至少>=2 
      if (this.ids.length >= 2) {
        //汇总订单
        console.log('this.ids---', this.ids);
        this.$api.changeStatus({ ids: this.ids.join(',') })
          .then(res => {
            console.log('汇总了----', res.data);
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '汇总成功!'
              });
              this.orderList(1);
            }
          })

      } else {
        this.$alert('汇总订单至少需要2条订单信息', '汇总订单', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `取消汇总`
            });
          }
        });
      }

    },
    //选中勾选内容-----------------
    select(selection, row) {
      console.log(selection, row);
      let arr = []
      selection.forEach(ele => {
        arr.push(ele.id)
      })
      this.ids = arr;
      //存储当前的勾选行的数据信息------ 
      this.DetailsForm = selection;
    },
    //获取分页页码------------------------------
    CurrentChange(page) {
      this.orderList(page)
    },
    //禁用按钮-------------------------------
    selectable(row, index) {
      // console.log('row, index',row, index);
      // return false;
      if (row.huizongStatus == '未汇总') {
        return true;
      } else {
        return false;
      }
    },
    //获取订单列表-------------------------------------
    async orderList(page) {
      let res = await this.$api.orderList({ page })
      console.log('订单列表---', res.data);
      if (res.data.status == 200) {
        // this.tableData = res.data.data;
        let arr = res.data.data;
        arr.forEach(ele=>{
          ele.huizongStatus = ele.huizongStatus==1?'未汇总':"已汇总"
          ele.yudingTime = dayjs(ele.yudingTime).format('YYYY-MM-DD')
        })
        this.tableData = arr;
        console.log('数据tableData',this.tableData);

        this.total = res.data.total;
        this.pageSize = res.data.pageSize;
      } else {
        this.tableData = []
        this.total = 1;
        this.pageSize = 1;
      }
    }
  },
  created() {
    this.orderList(1)
  }
}
</script>


<style lang="less" scoped>
.header {
  background: #fff;
  margin-bottom: 20px;
  padding: 10px;

  .el-form-item {
    margin-bottom: 16px;
  }

  .group {
    border: 1px solid #eee;
    padding: 8px;
  }
}

.content {
  background: #fff;

  /deep/ .active-header {
    color: #333;
    text-align: center;
  }

  /deep/ .table-center {
    text-align: center;
  }

  .pagination {
    padding: 10px;
  }
}
.export-excel-wrapper{
display: inline-block;
margin-left: 10px;
button{
  padding-left:30px ;
  padding-right:30px ;
}
}
</style>