<template>
    <div>
        <el-button @click="printHandle">打印</el-button>
        <hr>
        <!-- 1. 默认获取第一张pdf  可以是单个的pdf图片 -->
        <!-- <pdf src="/sxt.pdf" ref="myPdf"></pdf> -->
        <!-- 2. 获取pdf的总页码数 -->
        <!-- <div> 当前页码：{{ currentPage }}/ {{ pageCount }}</div>
        <pdf
			src="/sxt.pdf"
			@num-pages="pageCount = $event"
			@page-loaded="currentPage = $event"
		></pdf> -->

        <!-- 3. 展示所有的pdf内容  page显示的页码 -->
        <!-- <pdf v-for="i in numPages" :key="i" :src="src" :page="i" style="display: inline-block; width: 25%"></pdf> -->

        <!-- 4. 分页展示pdf -->
        <!-- 分页器 -->
        <Pagination :total="total" :pageSize="pageSize" @CurrentChange="CurrentChange"></Pagination>
        <pdf :src="src" :page="page" ref="myPdf"></pdf>

    </div>
</template>

<script>
import pdf from 'vue-pdf'
import Pagination from '@/components/pagination/Pagination.vue'
var loadingTask = pdf.createLoadingTask('/sxt2.pdf')
export default {
    components: {
        pdf,
        Pagination
    },
    data() {
        return {
            currentPage: 0,//当前的页码
            pageCount: 0,//总页码
            src: loadingTask,//src pdf路径地址
            numPages: undefined,//总页码
            page:1,
            total:1,//总页码
            pageSize:1,//页码条数
        }
    },
    mounted() {
        this.src.promise.then(pdf => {
            //获取总的页码数
            this.numPages = pdf.numPages;
            this.total = pdf.numPages;
        });
    },
    methods: {
        //分页--------------
        CurrentChange(page){
            this.page = page;
        },
        //打印PDF
        printHandle() {
            this.$refs.myPdf.print();
        }
    }
}
</script>

<style>

</style>