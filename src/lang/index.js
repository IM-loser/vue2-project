//1. 如果使用模块系统 (例如通过 vue-cli)，则需要导入 Vue 和 VueI18n ，然后调用 Vue.use(VueI18n)
import Vue from "vue";
import VueI18n from "vue-i18n";
//导入element-ui国际化
// import Element from "element-ui";
//兼容写法
import ElementLocale from 'element-ui/lib/locale'
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
//导入自己的文件语言
import myEn from './en'
import myZh from './zh'

Vue.use(VueI18n);

//2. 准备语言环境
const messages = {
  //中文
  zh: {
    ...myZh,
    ...zhLocale,
  },
  //英文
  en: {
    ...myEn,
    ...enLocale,
  },
};

//3.  通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: "zh", // 设置地区 中文
  messages, // 设置地区信息
});

// Vue.use(Element, {
//   i18n: (key, value) => i18n.t(key, value),
// });

ElementLocale.i18n((key, value) => i18n.t(key, value))



//4. 导出i18n 挂载vue实例
// 通过 `i18n` 选项创建 Vue 实例
// new Vue({ i18n }).$mount('#app')

export default i18n;
