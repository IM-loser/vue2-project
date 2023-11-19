<template>
  <div>
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
        <el-button size="small" type="warning">导出</el-button>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="active-header"
        cell-class-name="table-center">
        <el-table-column type="selection" width="55" >
        </el-table-column>
        <el-table-column prop="code" label="汇总单编号">
        </el-table-column>
        <el-table-column prop="ordername" label="汇总人">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="yudingTime" label="汇总时间">
          <template slot-scope="scope">
            {{ dayjs(scope.row.yudingTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="汇总单总价格">
        </el-table-column>
        <el-table-column prop="huizongStatus" label="操作">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">撤销汇总</el-button>
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
  components:{
    Pagination
  },
  data() {
    return {
      formInline: {},
      tableData: [],//订单列表数据展示
      total:10,
      pageSize:1
    }
  },
  methods: {
    dayjs,
    //获取分页---------------------------------
    CurrentChange(){

    },
    //撤销汇总----------------------------
    handleEdit(){

    }

  },
  created() {
   
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