<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElInput, ElCard, ElRow, ElCol, ElButton, ElDialog, ElForm, ElFormItem, ElSelect, ElOption, ElCheckboxGroup, ElCheckbox, ElUpload } from "element-plus";
import { ref, reactive } from "vue";
let blog = reactive({
    id: null,
    content: "",
    flag: "",
    title: "",
    type: {},
    tagIds: '',
    firstPicture: "",
    appreciation: 0,
    user: {},
    views: 0,
    commentabled: true
})
let dialogImageUrl = ref('')
let flags = reactive([
    { value: "原创", label: "原创" },
    { value: "转载", label: "转载" },
    { value: "翻译", label: "翻译" }
])
let publishDialogFormVisible = ref(false)
let publishForm = reactive({
    // type: {},
    tags: [],
    flag: '原创'
})
let typeList = reactive([])
let tagList = reactive([])
let publishFormRules = reactive({
    type: [
        { required: true, message: '请选择类型', trigger: 'blur' }
    ],
    tags: [
        { required: true, message: '请选择至少一种标签', trigger: 'blur' }
    ],
    flag: [
        { required: true, message: '请选择文章类型', trigger: 'blur' }
    ],
})
let dialogVisible = ref(false) 
</script>
<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>撰写博客</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="5">
            <el-col :span="21">
                <el-input placeholder="请输入文章标题" v-model="blog.title"></el-input>
            </el-col>
            <el-col :span="3">
                <el-button style="border-radius: 20px" type="danger" @click="submit">发布文章</el-button>
            </el-col>
        </el-row>
        <el-row>
            <!-- <mavon-editor v-model="blog.content" style="margin: 10px auto;min-height: 70vh" /> -->
            <v-md-editor v-model="blog.content" height="70vh"></v-md-editor>
        </el-row>
        <el-row align="right" type="flex" justify="end">

        </el-row>
        <!-- <el-dialog class="publish_dialog" title="发布文章" :visible.sync="publishDialogFormVisible"> -->
        <el-dialog class="publish_dialog" title="发布文章" :visible.sync=true>
            <el-form style="text-align: left" ref="publishFormRef" :model="publishForm" :rules="publishFormRules"
                class="publish_form">
                <el-form-item label="文章分类" prop="type">
                    <el-select size="small" v-model="publishForm.type" placeholder="请选择文章分类" style="margin-right: 10px"
                        @change="setBlogType">
                        <el-option v-for="type_ in typeList" :label="type_.name" :value="type_.id" :key="type_.id">
                        </el-option>
                    </el-select>
                    <el-button size="small">+ 新建分类</el-button>
                </el-form-item>
                <el-form-item label="文章标签" prop="tags">
                    <el-card shadow="never" style="height: 120px; overflow: auto">
                        <el-checkbox-group v-model="publishForm.tags">
                            <el-checkbox v-for="tag in tagList" :label="tag.id" :key="tag.id">{{ tag.name }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-button size="mini">+ 新建标签</el-button>
                    </el-card>
                </el-form-item>
                <el-form-item label="文章类型" prop="flag">
                    <el-select size="small" v-model="publishForm.flag">
                        <el-option v-for="item in flags" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章首图">
                    <el-upload ref="upload" action="http://hikari.top:8090/upload" list-type="picture-card" :limit="1"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="publishBlog">发布文章</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<style scoped lang="less">
.el-form /deep/ .el-form-item__content {
    line-height: 23px;
}

.el-card /deep/ .el-card__body {
    padding: 10px;
}
</style>