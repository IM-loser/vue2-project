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
            <download-excel class="export-excel-wrapper" :data="tableData" :fields="json_fields" :header="title"
          name="采购公司汇总清单列表.xls">
          <el-button size="small" type="warning">导出</el-button>
        </download-excel>
        <!-- <el-button size="small" type="warning">导出</el-button> -->
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
        cell-class-name="table-center">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="orderNum" label="汇总单编号">
        </el-table-column>
        <el-table-column prop="operator" label="汇总人">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="time" label="汇总时间">
          <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column prop="totalPrice" label="汇总单总价格">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">撤销汇总</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>

    </div>
  </div>

</template>

<script>
import dayjs from 'dayjs'
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  components: {
    Pagination
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
          "汇总订单编号":{
          field:"orderNum",
          callback:value=>{
            return '&nbsp;'+value;
          }
        },
        "汇总人": 'operator',
        "联系电话": 'phone',
        "汇总时间":'time',
        "汇总单总价格":'totalPrice',
      },
      title: '采购公司汇总清单列表',//
    }
    
  },
  methods: {
    dayjs,
    // //导出excel--------------------------
    // exportExcel() {
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('@/excel/ExportExcel');
    //     const fieldName = ["索引", "用户名", "密码"];
    //     const filterVal = ["index", "username", "password"];
    //     const data = this.tableData.map(v => filterVal.map(j => v[j]));
    //     export_json_to_excel(fieldName, data, "用户列表");

    //   });
    // },
    //获取分页---------------------------------
    CurrentChange() {

    },
    //撤销汇总----------------------------
    handleEdit(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //获取当前的行的id   row.id 
        this.$api.cancel({ id: row.id })
          .then(res => {
            console.log('撤销汇总----', res.data);
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: '撤销成功!'
              });
              //视图更新
              this.collect(1)
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    //获取汇总清单列表---------------------
    async collect(page) {
      let res = await this.$api.collect({ page })
      console.log('汇总清单列表---', res.data);
      if (res.data.status == 200) {
        this.tableData = res.data.data;
        this.total = res.data.total
        this.pageSize = res.data.pageSize
      } else {
        this.tableData = [];
        this.total = 0
        this.pageSize = 1;
      }
    }

  },
  created() {
    this.collect();
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
</style>