<template>
  <div>
    <!-- 顶部 -->
    <div class="header">
      <!-- 左侧折叠 -->
      <div class="open">
        <span v-if="!isCollapse" class="iconfont icon-right-indent" @click="changMenu"></span>
        <span v-else class="iconfont icon-left-indent" @click="changMenu"></span>
      </div>
      <!-- 右侧内容--时间 登录信息等 -->
      <div class="right">
        <span>{{ time }}</span> | 
        <el-dropdown  @command="changeLang">
          <span class="el-dropdown-link" style="color:#fff">
            语言环境<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         | 
        <span>欢迎 {{ userinfo.username }}</span> | 
        <span class="el-icon-switch-button icon" @click="loginOut"></span>
      </div>

    </div>
    <!-- 内容 -->
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations, mapState } from 'vuex'
export default {
  props: ['isCollapse'],
  data() {
    return {
      time: ''
    }
  },
  computed:{
    ...mapState('login',['userinfo'])
  },
  methods: {
    ...mapMutations('menu',['removeMenuList']),
    ...mapMutations('login',['removeUser']),
    changMenu() {
      this.$emit('changeShow')
    },
    //切换语言------------
    changeLang(val){
      console.log(val);
      console.log(this);
      this.$i18n.locale=val;
    },
    //退出登录----1. 删除vuex登录信息  2. 跳转登录界面----- 3. 清空菜单导航----
    loginOut(){
      //进入登录界面
      this.$router.replace('/login')
      //清空菜单导航
      this.removeMenuList();
      //清空登录
      this.removeUser()
      console.log('----退出登录----------------');
      localStorage.removeItem('info') //删除有问题 需要单独删除模块名称  vuex持久化注意的 插件--
      localStorage.removeItem('login')
    }
  },
  created() {
    console.log('-------------', dayjs().format('YYYY年MM月DD日 HH:mm:ss'));
    this.time = dayjs().format('YYYY年MM月DD日 HH:mm:ss');
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  background: #1e78bf;
  color: #fff;
  line-height: 50px;
  display: flex;

  .open {
    flex: 1;

    .iconfont {
      font-size: 22px;
      cursor: pointer;
    }
  }

  .right {
    width: 380px;
    font-size: 12px;
    span{
      padding:0 4px;
    }
    .icon{
      font-size: 16px;
    }
  }
}

.wrapper {
  padding: 10px;
}
</style>