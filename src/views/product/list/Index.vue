<template>
  <div>
    <!-- 面包屑导航 -->
    <Breadcrumb></Breadcrumb>
    <!-- 1. 产品搜索  -->
    <!--  
        el-form 表单
            :inline="true"      设置 inline 属性可以让表单域变为行内的表单域
            :model="formInline" 表单数据对象	object

        el-form-item 表单控件  每一项内容
            label	标签文本	string

        el-input 表单输入框

        el-date-picker 日期组件
          
    -->

    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="formInline.name" @blur="blur" size="small" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker v-model="formInline.date" size="small" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button size="small" type="warning" icon="el-icon-plus" @click="toProductPage">添加商品</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteAll">批量删除</el-button>
      </div>
    </div>

    <!-- 2. 产品列表 -->
    <!-- 
        el-table 表格组件
            :data="tableData"  注入data对象数组 [{},{}]
            stripe属性可以创建带斑马纹的表格
             border 边框
            
        el-table-column 表格列
            prop="date"   prop属性来对应对象中的键名即可填入数据
            label="日期"  label属性来定义表格的列名
            width属性来定义列宽
        event：
          select	当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
          select-all	当用户手动勾选全选 Checkbox 时触发的事件	selection
     -->
    <div class="content">
      <el-table :data="tableData" style="width: 100%;" border header-cell-class-name="active-header"
        cell-class-name="table-center" @select="selectHandle" @select-all="selectHandle">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" width="120">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:blue;cursor: pointer;"  @click="handleLook(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="120">
        </el-table-column>
        <el-table-column prop="category" label="商品类目" width="120">
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>{{ moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商品描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ removeHTMLTag(scope.row.descs) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div class="pagination">
        <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>
      </div>
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination.vue'
import moment from 'moment'
import { removeHTMLTag } from '@/utils/common.js'
import {mapMutations} from 'vuex'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        name: '',
        date: ''
      },
      tableData: [],
      total: 10,
      pageSize: 1,
      current: 1,//
      ids: [],//存储选中的id
    }
  },
  methods: {
    moment,//注册方法
    removeHTMLTag,
    ...mapMutations('product',['changeRowData','changeTitle']),
    //批量删除-------------------------------------
    deleteAll() {
      console.log('批量删除---ids---', this.ids);
      //传递的ids必须是字符串 
      let idStr = this.ids.join(',')
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //请求批量删除接口
        this.$api.batchDelete({ ids: idStr })
          .then(res => {
            console.log('批量删除-------', res.data);
            if (res.data.status === 200) {
              //删除成功
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              //------批量删除-----------------------
              
              //获取当前是否是最后一页的数据操作-----------
              //获取当前的数据可以展示多少页码  16/8=2   17/8=3  --- 最大的页码数
              let maxPage = Math.ceil(this.total/this.pageSize);
              console.log('最大的页码数--',maxPage);
              //获取选中的个数--- 
              let len = this.ids.length;
              console.log('选中的个数--- ',len);
              //分析：批量删除的时候 删的位置最后一页的数据  再去比较删除的个数与最后一页的条数比较  
              //删除个数==最后一页的条数 选中高亮的页码-1 请求页码数据也就是高亮页码
              if(maxPage == this.current){//最后一页的批量删除操作
                  //最后一页的数据条数---------------
                 let num = this.total%this.pageSize ==0?this.pageSize:this.total%this.pageSize;
                 console.log('最后一页的数据条数---',num);
                 if(num===len){
                    this.current = this.current-1 >0?this.current-1:1;
                 }
              }
              this.projectList(this.current)
              //提示信息-------------
            }
          })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    //点击勾选选择框------选中id------------------------
    selectHandle(selection) {
      console.log('selection---', selection);
      let arr = []
      selection.forEach(ele => {
        arr.push(ele.id)
      });
      this.ids = arr;
    },
    //点击添加跳转界面---------------11111111111111111
    toProductPage() {
      console.log('添加跳转界面-----');
      this.changeTitle('添加')
      this.$router.push('/product/add-product')
    },
    onSubmit() {
      console.log('submit!', this.formInline.name);
      this.search(this.formInline.name)
    },
    //查看商品详情操作---------------------------
    handleLook(index, row){
      this.changeRowData(row)
      this.changeTitle('详情')
      //跳转编辑界面------------------
      this.$router.push('/product/add-product')
    },
    //编辑操作------------------------------------------
    handleEdit(index, row) {
      console.log(index, row);
      //存储当前行的数据--vuex---跳转到另外一个界面--获取vuex行数据
      this.changeRowData(row)
      this.changeTitle('编辑')
      //跳转编辑界面------------------
      this.$router.push('/product/add-product')
    },
    //删除操作--------------------------------------------
    handleDelete(index, row) {
      console.log('删除操作---', index, row);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //删除这个数据---请求后台接口----同步数据库-----------------
        this.deleteItemById(row.id)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //分页传过来的页码------------------------------------
    CurrentChange(val) {
      console.log('--val--页码', val);
      this.current = val;
      this.projectList(val)
    },
    //失去焦点-------------------------------------------
    blur() {
      if (!this.formInline.name) {
        this.projectList(1)
      }
    },
    //获取产品列表数据-------------------------------------
    async projectList(page) {
      let res = await this.$api.projectList({ page })
      console.log('产品列表数据----', res.data);
      this.tableData = res.data.data;
      this.total = res.data.total
      this.pageSize = res.data.pageSize;
    },
    //搜索接口-----------------------------------------
    async search(search) {
      if (!search) {//点击空的查询按钮
        return;
      }
      let res = await this.$api.search({ search })
      console.log('搜索数据--', res.data);
      if (res.data.status === 200) {//有数据
        this.tableData = res.data.result;
        //分页处理
        this.total = res.data.result.length;
        this.pageSize = res.data.result.length;
      } else {//查无数据
        this.tableData = []
        this.total = 1;
        this.pageSize = 1
      }
    },
    //删除接接口---------------------------------------
    async deleteItemById(id) {
      let res = await this.$api.deleteItemById({ id })
      console.log('删除----', res.data);
      if (res.data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        //重新渲染视图-----------------------------
        //删除视图---如果当前是最后一页的最后一条数据-删除后--获取上一页的数据 
        //判断 this.total总数目   
        if (this.total % this.pageSize === 1) {
          this.current = this.current - 1 > 0 ? this.current - 1 : 1;//最好>1 
        }
        this.projectList(this.current)
      }
    }
  },
  created() {
    this.projectList(1);
    console.log('获取当前的时间', new Date(), moment().format('YYYY-MM-DD hh:mm:ss'));
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