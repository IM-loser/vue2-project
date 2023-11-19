<template>
    <!-- 
        el-tree 树状结构
            show-checkbox  节点是否可被选择	boolean	—	false  
            props	配置选项，具体看下表	object
                label	指定节点标签为节点对象的某个属性值	string, function(data, node)	—	—
                children	指定子树为节点对象的某个属性值	string	—	—
                disabled	指定节点选择框是否禁用为节点对象的某个属性值	boolean, function(data, node)	—	—
                isLeaf	指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效	boolean, function(data, node)
            load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
            lazy	是否懒加载子节点，需与 load 方法结合使用	boolean	—	false
     -->
    <el-tree :props="props" :load="loadNode" lazy @node-click="clickHandle" accordion>
    </el-tree>

</template>

<script>
export default {
    data() {
        return {
            props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            },
            treeData: []
        };
    },
    methods: {
        //点击tree的节点触发的事件--------------------
        clickHandle(data,node){
            // console.log('data',data,'node',node);
            this.$emit('sendTreeData',data)
        },

        //tree懒加载自动调用这个函数---自动调用不需要手动调用
        loadNode(node, resolve) {
            // console.log('node--', node);
            if (node.level === 0) {
                this.$api.selectItemCategoryByParentId()
                    .then(res => {
                        if (res.data.status == 200) {
                            return resolve(res.data.result);
                        }else{
                            return resolve([])
                        }
                    })
            }
            if (node.level >= 1){
                //请求--------
                this.$api.selectItemCategoryByParentId({type:node.data.cid})
                    .then(res => {
                        if (res.data.status == 200) {
                            return resolve(res.data.result);
                        }else{
                            return resolve([])
                        }
                    })
            } 
        },
        //请求tree数据类目结构----------------------
        // async selectItemCategoryByParentId(type) {
        //     let res = await this.$api.selectItemCategoryByParentId({ type })
        //     console.log('tree数据类目结构------', res.data);
        // }
    }
};
</script>

<style>

</style>