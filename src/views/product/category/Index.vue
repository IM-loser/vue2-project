<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <!-- 一级按钮 -->
        <el-button type="warning" style="margin-bottom:20px;" @click="addCategory">新增一级导航类目</el-button>
        <!-- tree内容结构 -->
        <!-- 
            data  tree数据
            show-checkbox          多选框
            default-expand-all	   是否默认展开所有节点	boolean	—	false
            expand-on-click-node	 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。	boolean	—	true
            render-content	       树节点的内容区的渲染 Function	Function(h, { node, data, store }
         -->

        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
          :render-content="renderContent" :props="defaultProps">
        </el-tree>
      </div>


    </div>

    <!-- 弹框 -->
    <Dialog :info="info" ref="child" :type="type" @updateViews="itemCategory"></Dialog>

  </div>
</template>

<script>
import Dialog from './Dialog.vue'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      info: '标题',
      type: 1,//1 新增 2 修改 3 一级分类
      data: [{
        id: 1,
        name: '一级 1',
        children: [{
          id: 4,
          name: '二级 1-1'
        }]
      }, {
        id: 2,
        name: '一级 2'
      }],
      defaultProps: {
        label: 'name'
      }
    }
  },
  created() {
    this.itemCategory()
  },
  methods: {
    //新增一级目录分类---------------------
    addCategory(){
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `新增一级分类`,
      };
      this.type = 3;
      this.$refs.child.input = '';
    },
    //新增 1. 显示弹框  2. 传递title动态  3. 修改type值 标识操作新增-修改 4. cid参数
    append(data) {
      console.log('新增-------------', data);
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `新增【${data.name}】子级分类`,
        cid: data.cid
      };
      this.type = 1;
      this.$refs.child.input = '';
    },
    //删除  1. 弹框提示信息  2. 确定删除--请求接口  3. 更新视图
    remove(node, data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除接口-------------------------
        this.$api.deleteContentCategoryById({ id: data.id })
          .then(res => {
            console.log('-删除---', res.data);
            if (res.data.status == 200) {
              this.$message({
                message: '恭喜你，删除成功',
                type: 'success'
              });
              this.itemCategory();
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //修改 1. 显示弹框   2. 传递title动态  3. 修改type值 标识操作新增-修改 4.把当前的名称传递给input  5. id参数
    update(node, data) {
      console.log('修改--------------');
      this.$refs.child.dialogVisible = true;
      this.info = {
        title: `修改【${data.name}】名称`,
        id: data.id
      };
      this.type = 2;
      this.$refs.child.input = data.name;

    },
    // 树节点的内容区的渲染 Function	Function(h, { node, data, store }-------------
    renderContent(h, { node, data, store }) {
      // console.log('render--',node,data);
      return (
        <span class="custom-tree-node">
          <span class='name'>{node.label}</span>
          {
            node.level == 1 ? <span>
              <el-button class='mini' on-click={() => this.append(data)} icon="el-icon-plus">新增</el-button>
              <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
              <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
            </span> : <span>
              <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
              <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
            </span>
          }
        </span>
      );
    },
    //请求tree数据-----------------------
    async itemCategory() {
      let res = await this.$api.itemCategory()
      console.log('res--data', res.data.result)
      let data = res.data.result;
      //获取一级目录
      let oneArr = [], otherArr = [];
      data.forEach(ele => {
        if (ele.type == 1) {
          ele.children = []
          oneArr.push(ele)
        } else {
          otherArr.push(ele)
        }
      })
      console.log(oneArr, otherArr);
      //继续遍历数组--获取数据结构---------
      oneArr.forEach(item => {
        //item.cid  一级信息标识
        otherArr.forEach(ele => {
          if (ele.type === item.cid) {
            item.children.push(ele)
          }
        })

      })
      this.data = oneArr;

    }
  }
};
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;


    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }


}
</style>