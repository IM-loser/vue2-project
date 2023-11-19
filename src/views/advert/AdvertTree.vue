<template>
    <div>
      <el-tree :data="data" :expand-on-click-node="false" :render-content="renderContent" :props="props" lazy
        :load="loadNode" node-key="pid" @node-click="handleNodeClick">
      </el-tree>
  
      <!-- 弹框 -->
      <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
        <p>当前出于的广告位置：{{ advertInfo.name }}</p>
        <el-input type="text" v-model="advertName" />
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAdvert">确 定</el-button>
        </span>
      </el-dialog>
  
    </div>
  </template>
  
  <script>
  import { getselectContentCategoryByParentId, getinsertContentCategory, getupdateContentCategory, getdeleteContentCategoryById } from '@/api/advert'
  export default {
    data() {
      return {
        dialogVisible: false, //弹框状态关闭
        title: "添加广告",
        advertName: "", //广告名字
        advertInfo: {}, //点击广告节点内容
        props: {
          label: "name",
          children: "zones",
          isLeaf: "leaf",
        },
        data: [],
      };
    },
    methods: {
      http() {
        getselectContentCategoryByParentId().then((res) => {
          console.log('http----进入组件懒加载数据');
          this.data = res.data.result
        });
      },
      //点击tree节点---发送数据
      handleNodeClick(data) {
        console.log(data);
        this.$emit('getTreeData', data)
      },
      //进入组件懒加载数据
      loadNode(node, resolve) {
        if (node.level === 0) {
          //第一次请求
          getselectContentCategoryByParentId().then((res) => {
            return resolve(res.data.result);
          });
        }
        if (node.level >= 1) {
          getselectContentCategoryByParentId({
            id: node.data.pid,
          })
            .then((res) => {
              if (res.data.status === 200) {
                return resolve(res.data.result);
              } else {
                return resolve([]);
              }
            });
        }
      },
      //render-content
      //增加
      append(data) {
        console.log(data);
        //显示弹框
        this.dialogVisible = true;
        this.title = "添加广告";
        //获取点击的节点内容
        this.advertInfo = data;
      },
      //删除-----------------------------------
      remove(node, data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delete(data.pid)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
      },
      //删除接口-------------------------------------
      delete(pid){
        getdeleteContentCategoryById({
          pid,
        })
          .then(res => {
            if (res.data.status === 200) {
              //添加成功
              this.$message({
                message: "恭喜你，删除成功",
                type: "success",
              });
              //更新tree
              this.http()
            } else {
              //错误信息提示
            }
          })
      },
  
      //修改-------------------------------------
      update(data) {
        //显示弹框
        this.dialogVisible = true;
        this.title = "修改广告名称";
        //获取点击的节点内容
        this.advertInfo = data;
      },
      //提交确定按钮
      submitAdvert() {
        if (this.title == "添加广告") {
          console.log("添加事件");
          getinsertContentCategory({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
            .then((res) => {
              console.log(res.data);
              if (res.data.status === 200) {
                //添加成功
                this.$message({
                  message: "恭喜你，这是一条成功消息",
                  type: "success",
                });
                //隐藏弹框--清空数据
                this.dialogVisible = false;
                this.advertName = "";
                //更新tree
                this.http()
              } else {
                //错误信息提示
  
              }
            });
        } else {
          console.log("修改事件");
          //修改
          getupdateContentCategory({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
            .then(res => {
              if (res.data.status === 200) {
                //添加成功
                this.$message({
                  message: "恭喜你，修改成功",
                  type: "success",
                });
                //隐藏弹框--清空数据
                this.dialogVisible = false;
                this.advertName = "";
                //更新tree
                this.http()
              } else {
                //错误信息提示
  
              }
            })
  
        }
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data, "add")}
              >
                增加
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.update(data, "update")}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      },
    },
  };
  </script>
  
  <style>
  
  </style>