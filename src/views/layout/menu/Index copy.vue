<template>
  <div>
    <el-menu :default-active="active" class="el-menu-vertical-demo" background-color="#112f50" text-color="#fff"
      active-text-color="#ffd04b" router :collapse="isCollapse">
      <el-menu-item>
        <span slot="title">首客生鲜采购系统</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t('menu.home') }}</span>
        <!-- <span slot="title">首页</span> -->
      </el-menu-item>
      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t('menu.product') }}</span>
          <!-- <span>产品管理</span> -->
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">
            <i class="el-icon-setting"></i>
            <span slot="title">产品列表</span>
          </el-menu-item>
          <el-menu-item index="/product/category">
            <i class="el-icon-setting"></i>
            <span slot="title">产品分类</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/order-list">
            <i class="el-icon-setting"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/order/collect">
            <i class="el-icon-setting"></i>
            <span slot="title">订单汇总</span>
          </el-menu-item>
          <el-menu-item index="/order/contract">
            <i class="el-icon-setting"></i>
            <span slot="title">订单审核</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/advert">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>广告管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/advert/advert-list">
            <i class="el-icon-setting"></i>
            <span slot="title">广告列表</span>
          </el-menu-item>

        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/system">
        <template slot="title">
        <i class="el-icon-setting"></i>
        <span slot="title">系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/system/role">
            <i class="el-icon-setting"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/system/department">
            <i class="el-icon-setting"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  data() {
    return {
      // isCollapse:false
      active: ''
    }
  },
  created() {
    // console.log('menu',this.$route);
    //首次处理一下-----------------------
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu
    } else {
      this.active = this.$route.path
    }
  },
  watch: {
    //监听路由的变化---切换页面组件
    $route(to, from) {
      // console.log('watch---to',to);
      //判断当前的路由里面 meta:{ activeMenu:'/product/list'}
      let { meta, path } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu
      } else {
        this.active = path
      }
    }
  }


}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;

  /deep/ .is-active {
    background: #1e78bf !important;
    color: #fff !important;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>