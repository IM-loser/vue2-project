## 项目介绍
1. 介绍
    生鲜采购系统 -- 生鲜商城采购后台管理系统  

2. 项目分类
    1. web前端网页 （H5移动端）
        比如：小米官网 穷游网 京东 淘宝... 
        用户群体：广大用户

    2. web后台管理系统
        比如：大学里面成绩查询 12306订票  订餐系统 图书系统 商城系统 医院系统 OA办公系统 ... 
        用户群体：特殊的针对人员 商城--商家 

    3. 小程序
        比如：微信小程序、百度小程序、支付宝小程序... 
        用户群体：广大用户

    4. app(非前端技术)  
        比如：手机应用程序 ios 安卓系统 
        用户群体：广大用户

## 搭建项目
1. 项目创建 
    1. 公司：已经搭建完毕 在原来的基础上继续开发
        git clone xxx

    2. 项目从零搭建 

2. 项目原型
    墨刀连接

3. 项目创建
    1. vue create vue-project 
    2. vue add element  npm install babel-plugin-component -D
    3. npm i axios -S
    4. npm i querystring -S
    5. npm i normalize.css -S 
    6. npm i echarts -S 

4. 项目初始化
    1. 删除无用的组件
    2. css初始化

5. 配置路由
    1. layout布局界面
    2. 登录界面
    


## 后台项目
1. nodejs+mysql+Express 
2. xampp软件
3. 启动xampp软件 -- admin---导入sql文件

4. 下载后台依赖
    1. npm i express mysql -S
    2. npm i mockjs multer -S 


## 下载项目
1. 公司会给你开通代码权限 
2. 小组长--给你一个仓库地址 git仓库地址-gitHub
3. 拉取代码：   
    git clone xxx 




## 项目接口
1. 后台提供接口地址 前端访问这个地址 响应的数据
    如果响应的数据少字段 找后端 或者字段不对 格式不对等等 
    如果有前端传递参数 需要联调接口 对字段

2. 同时开发
    1. 前端先写布局  后台写接口 需要等他写完接口 才可以调用接口数据 
    2. 沟通 问人家先写哪个接口 优先写布局 
    
3. 接口形式
    1. world形式 
    2. 在线文档 -（网易云接口） -- postman接口
    3. 发一个消息

4. 采购项目
    1. 后台接口是自己搭建的node.js项目 
    2. 直接获取自己的本地后台接口 保证接口没有问题 


## echarts 
1. 作用
    数据图表展示 ，ECharts是一款基于JavaScript的数据可视化图表库，提供直观，生动，可交互，可个性化定制的数据可视化图表。ECharts最初由百度团队开源

2. 使用echarts 
    1. 安装
        npm install echarts --save
    2. 导入echarts模块 
        ```js
            import * as echarts from 'echarts';
            <div id='main' style='设置大小-存储图表'></div>
        ```
    3. 准备dom元素容器 

    4. 实例化配置图表
        ```js
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'));
            // 绘制图表
            myChart.setOption({
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
                }
            ]
            });
        ```
    
## 产品管理-产品列表
1. 布局
2. 数据获取


## 时间格式处理
1. Moment.js的基本使用
    1. 安装
        npm install moment -S

    2. 使用
        import moment from "moment";
        
    3. 语法
        moment().format('YYYY-MM-DD HH:mm:ss')


## 商品添加
1. tree类目获取
2. 添加--表单输入
    1. 表单布局--获取用户输入的值
    2. 点击保存--获取输入的值--添加数据库


## 富文本编译器
1. wangEditor富文本编译器
2. 使用
    1. 安装
        yarn add @wangeditor/editor
         或者 npm install @wangeditor/editor --save

        yarn add @wangeditor/editor-for-vue
         或者 npm install @wangeditor/editor-for-vue --save
         
    2. 模板语法
        ```js
            <template>
                <div style="border: 1px solid #ccc;">
                    <Toolbar
                        style="border-bottom: 1px solid #ccc"
                        :editor="editor"
                        :defaultConfig="toolbarConfig"
                        :mode="mode"
                    />
                    <Editor
                        style="height: 500px; overflow-y: hidden;"
                        v-model="html"
                        :defaultConfig="editorConfig"
                        :mode="mode"
                        @onCreated="onCreated"
                    />
                </div>
            </template>
        ```

    3. js
        ```js
            <script>
                import Vue from 'vue'
                import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

                export default Vue.extend({
                    components: { Editor, Toolbar },
                    data() {
                        return {
                            editor: null,
                            html: '<p>hello</p>',
                            toolbarConfig: { },
                            editorConfig: { placeholder: '请输入内容...' },
                            mode: 'default', // or 'simple'
                        }
                    },
                    methods: {
                        onCreated(editor) {
                            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
                        },
                    },
                    mounted() {
                        // 模拟 ajax 请求，异步渲染编辑器
                        setTimeout(() => {
                            this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
                        }, 1500)
                    },
                    beforeDestroy() {
                        const editor = this.editor
                        if (editor == null) return
                        editor.destroy() // 组件销毁时，及时销毁编辑器
                    }
                })
                </script>
        ```
    4. 样式
        <style src="@wangeditor/editor/dist/css/style.css"></style>


## dayjs
1. 安装
    npm install dayjs --save

2. 使用
    import dayjs from 'dayjs'

3. 语法
    dayjs(设置时间).format('YYYY-MM-DD HH:mm:ss')



## vue导出excel表格
1. 安装
    npm install vue-json-excel -S

2. main.js中引入
    ```js
        import JsonExcel from 'vue-json-excel'
        Vue.component('downloadExcel', JsonExcel)
    ```

3. 在代码中使用
    ```js
         <template>
<download-excel
        class="export-excel-wrapper"
        :data="DetailsForm"
        :fields="json_fields"
        :header="title"
        name="需要导出的表格名字.xls"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="success">导出</el-button>
      </download-excel>
</template>
    ```

4. 修改配置参数
    ```js
        title: "xx公司表格",
        json_fields: {
                "排查日期":'date',
                "整改隐患内容":'details',
                "整改措施":'measure',
                "整改时限":'timeLimit',
                "应急措施和预案":'plan',
                "整改责任人":'personInCharge',
                "填表人":'preparer',
                "整改资金":'fund',
                "整改完成情况":'complete',
                "备注":'remark',
            },
            DetailsForm: [
                {
                date: "2022-3-10",
                details: "卸油区过路灯损坏",
                measure: "更换灯泡",
                timeLimit: "2022-3-21",
                plan: "先使用充电灯代替,贴好安全提醒告示",
                personInCharge: "王xx",
                preparer: "王xx",
                fund: "20元",
                complete: "已完成整改",
                remark: "重新更换了灯泡",
                },
       
      ],

    ```

## 面包屑组件


## Pdf打印
1. 安装
    npm install --save vue-pdf

2. 组件使用
    ```js
        <template>
            <pdf src="./static/relativity.pdf"></pdf>
        </template>

        <script>
            import pdf from 'vue-pdf'

            export default {
            components: {
                pdf
            }
        }
    ```
## 国际化 vue-i18n 国际化
1. 安装
    npm install vue-i18n@8.x -S 

2. 使用
    ```js
        // 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)。
        // import Vue from 'vue'
        // import VueI18n from 'vue-i18n'
        //
        // Vue.use(VueI18n)

        // 准备翻译的语言环境信息
        const messages = {
        en: {
            message: {
                hello: 'hello world'
            }
        },
        ja: {
            message: {
                hello: 'こんにちは、世界'
            }
        }
        }

        // 通过选项创建 VueI18n 实例
        const i18n = new VueI18n({
        locale: 'ja', // 设置地区
        messages, // 设置地区信息
        })


        // 通过 `i18n` 选项创建 Vue 实例
        new Vue({ i18n }).$mount('#app')

        // 现在应用程序已经准备好了！
    ```
3. 视图上使用
    ```js
        <div id="app">
        <p>{{ $t("message.hello") }}</p>
        </div>
    ```



2. element-ui库 国际化





## 用户路由权限
1. 介绍
    1. 根据用户的身份不同 登录进入界面后 看到不同的路由界面
    2. 例子：登录过大学的考试系统  学员登录系统  老师登录系统

2. 功能
    1. 登录信息 查看你的身份
        超级管理员 admin
        普通管理员 任意账号

    2. 后台管理系统 -- 有权限的  
        进入这个系统   必须登录
        导航守卫  ---  拦截 (路由拦截)

    3. 登录的数据信息存储vuex 
        1. 实现组件数据共享 登录账号等信息 
        2. 登录成功存储vuex登录信息标识
        3. vuex-持久化
        4. 退出登录


    4. 后台管理系统 -- 有权限的  进入这个系统   必须登录
        配置导航守卫 
        1. 配置路由元信息meta字段 标识哪些界面需要登录才可以进入
        2. 导航守卫判断当前是否需要登录 以及校验登录状态 token标识 
        
        3. 登录成功后 需要获取动态菜单导航目录--（用户权限 身份不同看到的导航界面不同）
            1. 获取动态菜单导航目录（不是路由-标识） 存储哪里  -- vuex
            2. 设计vuex模式 定义空的菜单导航容器  定义获取导航和清空导航的方法
            3. actions定义了请求动态路由接口的方法 
            4. 哪里调用请求菜单导航 登录成功后 进入页面的时候获取动态菜单导航 -- 路由守卫请求导航

            5. 拆分前端定义好的完整的菜单导航 -- 先不显示前端导航 匹配后台 看看到底显示哪些菜单导航
                前端[{1,2},{2,3,4},{4,5,6}] 后端[{1,2},{4,5,6}] ==> 匹配[{1,2},{4,5,6}]

            6. 最后渲染匹配好的导航菜单  



## 深拷贝
1. loadsh 深拷贝
2. 安装
    npm i --save lodash

3. 使用
    import _ from 'lodash'



##  vue进度条加载组件
1. 安装
    npm install --save nprogress

2. 引入 权限-导航守卫
    import NProgress from 'nprogress'
    import 'nprogress/nprogress.css'



## 项目打包部署
1. 项目环境
    1. 本地开发环境 -研发环境 development 
    2. 测试环境   test 
    3. 线上开发环境 -生产环境 production 


2. 项目打包
    1. 项目自动化部署 jenkins 
        本地代码 -- 远程仓库  -- jenkins构建项目

    2. 手动打包
        1. 执行命令
            开发环境：npm run serve 默认 （公司：npm run start ）
            生产环境：npm run build 

        2. 需要配置打包导出的文件目录
              publicPath: process.env.NODE_ENV === 'production'
                ? './'
                : '/' 

        3. 项目开发的过程中访问接口--资源共享配置 (公司后端工作 前端不关心）
            代理请求  开发环境
            项目发布-研发环境  后端必须配置资源共享 

            后端自己部署的 需要nodejs安装cors资源共享 

        4. 需要打包好的项目 放服务器上去查看  (公司后端工作 前端不关心）
            xampp软件 本地有服务器环境
            dist文件 放xampp文件 htdocs文件  通过localhost访问 

        
        5. 配置环境变量 （公司项目配置完毕）
            .env.development

            .env.production 
                        


## 合并分支
1. 开发的分支dev分支 
2. 同步分支到远程仓库
3. 在dev分支开发项目 完毕了  需要你合并分支 
4. 把dev分支合并到master分支上 并推送远程仓库
    git checkout master
    git merge dev  //合并dev分支到当前的处于的分支上
    git push    //把合并的master分支 推送到远程仓库 同步代码 不需要add commit 


## 上班拉取公司项目
1. 发送一个git仓库的代码地址  //前提有权限拉取了
2. git clone xxx            //拉取仓库地址 --  远程master分支 -- 在哪个分支开发)
3. git branch -a            //查看本地和远程的所有的分支
4. git checkout -b dev origin/dev  //创建并拉取远程dev  
5. 特殊情况：如果拉取的分支 只有master分支 没有其他分支 
    只有你自己开发 可以master 
    最好创建本地的其他分支 开发业务逻辑

6. 功能完毕后 提交代码
    git status 
    git add . 
    git commit -m '注释含义'
    git pull   //冲突 
    git push 、 git push orgin/xx 

    



















## 导出excel 
1. 安装
    cnpm i -S file-saver xlsx
    cnpm i -D script-loader

2. 使用
    ```js
         
<template>
  <div>
    <el-button type="primary" @click="export2Excel()">导出Excel</el-button>
  </div>
</template>
 
<script>
export default {
  components: {},
  data() {
    return {
      tableData: [
        { index: 0, username: "张三", password: 333, age: 22 },
        { index: 1, username: "李四", password: 444, age: 23 }
      ]
    };
  },
  props: {},
  created() {},
  mounted() {},
  computed: {},
  methods: {
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/excel/Export2Excel");
        const fieldName = ["索引", "用户名", "密码"];
        const filterVal = ["index", "username", "password"];
        const data = this.tableData.map(v => filterVal.map(j => v[j]));
        export_json_to_excel(fieldName, data, "用户列表");
      });
    }
  },
  watch: {}
};
</script>
 
<style lang="scss" scoped>
</style>
```



