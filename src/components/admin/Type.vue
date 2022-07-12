<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElButton, ElTable, ElTableColumn, ElImage, ElDialog, ElForm, ElFormItem, ElInput, ElUpload } from "element-plus"
import { ref, reactive } from "vue"
let typeList = reactive([])
let createTypeDialogFormVisible = ref(false)
let dialogImageUrl = ref('')
let createTypeForm = reactive({
    name: ''
})
let createTypeFormRules = reactive({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' }
    ],
})
let type = reactive({
    id: null,
    name: '',
    pic_url: ''
})
let fileList = reactive([])
let dialogVisible = ref(false)

</script>
<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="never">
            <el-button type="primary" @click="createTypeDialogFormVisible = true">新建分类</el-button>
            <el-table :data="typeList" border stripe>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="图片" prop="pic_url" width="150px">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.pic_url"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="分类名称" prop="name"></el-table-column>
                <el-table-column label="博客数量" prop="blogs.length"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!--            修改按钮-->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editBlogDialog(scope.row)">编辑
                        </el-button>
                        <!--            删除按钮-->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeBlogById(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog title="分类修改" :visible.sync="createTypeDialogFormVisible">
            <el-form style="text-align: left" ref="createTypeFormRef" :model="createTypeForm"
                :rules="createTypeFormRules" label-width="80px">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="createTypeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="封面图片">
                    <el-upload ref="upload" action="http://hikari.top:8090/upload" list-type="picture-card" :limit="1"
                        :file-list="fileList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                        :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="createType">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>