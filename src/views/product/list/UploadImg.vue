<template>
    <div>
        <!-- 
            el-upload 上传图片
                action	必选参数，上传的地址	string
                list-type	文件列表的类型	string	text/picture/picture-card	text
                on-preview	点击文件列表中已上传的文件时的钩子	function(file)	—	—
                on-remove	文件列表移除文件时的钩子	function(file, fileList)	—	—
                on-success	文件上传成功时的钩子	function(response, file, fileList)
                multiple	是否支持多选文件	boolean
                file-list	上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]	array	—	[]
                disabled	是否禁用	boolean	—	false
                limit	最大允许上传个数	number	—	—
                on-exceed	文件超出个数限制时的钩子	function(files, fileList)

                方法：
                    clearFiles
      
         -->
        <el-upload 
            :action="uploadUrl" 
            list-type="picture-card"
            :on-preview="handlePictureCardPreview" 
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            ref="upload"
            multiple>
            <i class="el-icon-plus"></i>
        </el-upload>
    </div>
</template>

<script>
import {uploadUrl,host} from '@/api/base'
export default {
    props:{
        fileList:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data() {
        return {
            uploadUrl,
            // fileList:[],
            //上传的文件列表 [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
        };
    },
    methods: {
        //上传成功-----------------------------
        handleSuccess(response, file, fileList){
            console.log('成功',response, file, fileList);
            //获取上传成功后的图片的地址 <img src=''/> http://localhost:7788/+相对路径
            let url = response.url.slice(7);
            let imgUrl = host+'/'+url
            // console.log('url',imgUrl);
            this.$emit('sendImg',imgUrl)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //清空图片列表展示---------------
        clear(){
            // console.log('清空图片列表展示-------');
            // this.fileList=[]
            this.$refs.upload.clearFiles();
        }
    }
}
</script>

<style>

</style>