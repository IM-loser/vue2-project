<template>
    <div style="border: 1px solid #ccc;">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 300px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="onCreated" @onChange="onChange" />
    </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
    components: { Editor, Toolbar },
    data() {
        return {
            editor: null,
            html: '<p>hello</p>',
            toolbarConfig: {//菜单栏配置
                 //toolbarKeys-重新配置工具栏，显示哪些菜单，以及菜单的排序、分组
                 toolbarKeys: [
                    'headerSelect', 'bold', 'underline', 'italic', 'color', 'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'uploadImage', 'insertLink', 'insertTable', 'codeBlock', 'divider',
                ],
                //隐藏的菜单栏
                // excludeKeys:['headerSelect', 'blockquote', '|', 'bold', 'underline','group-justify']
            },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        }
    },
    methods: {
        //wangeditor创建的生命周期函数-------------------------
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onChange() {
            console.log('监听-修改', this.html);
            //发送给父组件---- 把wangEditor用户输入的商品描述--发送-商品添加存储
            this.$emit('sendWangEditor', this.html)
        }
    },
    mounted() {
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css">

</style>
<style>

</style>