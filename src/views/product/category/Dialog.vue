<template>
    <!-- 
        title  弹框标题
        visible	是否显示 Dialog，支持 .sync 修饰符	boolean	—	false

     -->
    <el-dialog :title="info.title" :visible="dialogVisible" width="30%" :before-close="handleClose">
        <strong>请输入类目名称：</strong>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitHandle">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>

export default {
    props: ['info', 'type'],
    data() {
        return {
            dialogVisible: false,
            input: ''
        }
    },
    methods: {
        handleClose(done) {
            this.dialogVisible = false
        },
        submitHandle() {
            //新增分类---1. 点击获取输入的值 2. 隐藏弹框 3.更新视图
            if (this.type == 1) {
                console.log('新增', this.input);
                this.insertItemCategory({ cid: this.info.cid, name: this.input })

            } else if(this.type==2) {//修改
                console.log('修改', this.input);
                this.updateCategory({ id: this.info.id, name: this.input })
            }else{//一级新增
                console.log('一级新增', this.input);
                this.insertCategory({name: this.input })
            }
        },
        //一级新增---------------------------------------
        async insertCategory(params){
            let res = await this.$api.insertCategory(params)
            console.log('一级新增----', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
                //隐藏弹框
                this.dialogVisible = false;
                this.$emit('updateViews')
            }
        },
        //修改类目名称---id name-----------------------
        async updateCategory(params) {
            let res = await this.$api.updateCategory(params)
            console.log('修改----', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                });
                //隐藏弹框
                this.dialogVisible = false;
                //更新视图---父组件视图 方法：1
                this.$emit('updateViews')
            }
        },
        //新增类目---------------------------------------------
        async insertItemCategory(params) {
            let res = await this.$api.insertItemCategory(params)
            console.log('新增----', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
                //隐藏弹框
                this.dialogVisible = false;
                //更新视图---父组件视图 方法：1
                this.$emit('updateViews')
                //this.$parent.itemCategory()   //方法2：获取父组件实例--调用更新方法
            }
        }
    }
}
</script>

<style>

</style>