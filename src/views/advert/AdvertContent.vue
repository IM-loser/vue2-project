<template>
    <div class="content">
      <el-button @click="(dialogVisible = true)">{{ treeData.name }}广告</el-button>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
        <el-table-column prop="name" label="名称" width="180"> </el-table-column>
        <el-table-column prop="url" label="访问地址" min-width="240" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="image" label="图片地址" min-width="240" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!--新增广告内容----
        const pid = req.query.pid;
        const name = req.query.name;
        const contentUrl = req.query.url;
        const image = req.query.image;----------- -->
      <el-dialog title="新增广告内容" :visible="dialogVisible" width="30%">
        <el-form :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="广告名称">
            <el-input v-model="formInline.name" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="广告图片地址">
            <el-input v-model="formInline.url" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-input v-model="formInline.image" placeholder="审批人"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addContent">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  //广告分类管理 内容增加
  import { getselectTbContentAllByCategoryId, getinsertTbContent } from '@/api/advert'
  export default {
    props: {
      treeData: {
        type: Object,
        default: function () {
          return { name: "按钮" };
        },
      },
    },
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        formInline: {
          image: '',
          url: '',
          name: ''
        }
      };
    },
    watch: {
      treeData: function (val) {
        //清空数据
        this.tableData = [];
        getselectTbContentAllByCategoryId({
          pid: val.pid,
        })
          .then((res) => {
            console.log('监听修改----------------',val, res.data);
            if (res.status === 200) {
              this.tableData = res.data.result;
            } else {
              //没有数据
              this.tableData =[];
            }
          });
      },
    },
    methods: {
      handleDelete() { },
      //增加广告内容--弹框
      addContent() {
        //
        let { image,url,name} =this.formInline;
        getinsertTbContent({
          image,url,name,
          
        })
          .then(res => {
            console.log(res.data);
          })
      },
    },
  };
  </script>
  
  <style scoped lang='less'>
  .content {
    text-align: center;
    margin-left: 100px;
    >button {
      margin-bottom: 20px;
    }
  }
  </style>