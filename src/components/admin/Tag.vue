<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElButton, ElRow, ElCol, ElDialog, ElForm, ElFormItem, ElInput } from "element-plus";
import { ref, reactive } from "vue"
let tagList = reactive([])
let createTagDialogFormVisible = ref(false)
let createTagForm = reactive({
    name: ''
})
let createTagFormRules = reactive({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' }
    ],
})
let tag = reactive({
    id: null,
    name: '',
})
</script>
<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>标签管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="never">
            <el-button type="primary" style="margin-bottom: 20px" @click="createTagDialogFormVisible = true">新建标签
            </el-button>
            <el-row :gutter="20">
                <el-col :sm="8" :lg="6" v-for="tag in tagList" style="margin-bottom: 20px;" :key="tag.id">
                    <el-card shadow="hover" style="position:relative;border: 2px solid #eee;text-align: left">
                        <div class="op" style="position: absolute;right: 5px;top: 5px">
                            <i @click="editTagById(tag.id)" class="el-icon-edit"
                                style="color: #3a8ee6;margin-right: 5px"></i>
                            <i @click="deleteTagById(tag.id)" class="el-icon-delete" style="color: red"></i>
                        </div>
                        <b> 标签名称 <span style="color: #3a8ee6">{{ tag.name }}</span></b> <br>
                        <p style="margin-bottom: 0">博客数量 <span style="color: #2ac06d">{{ tag.blogs.length }}</span></p>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-dialog title="分类修改" :visible.sync="createTagDialogFormVisible">
            <el-form style="text-align: left" ref="createTagFormRef" :model="createTagForm" :rules="createTagFormRules"
                label-width="80px">
                <el-form-item label="标签名称" prop="name">
                    <el-input v-model="createTagForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button tag="primary" @click="createTag">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
    .op:hover {
        cursor: pointer;

        i:hover {
            font-weight: bold;
            font-size: large;
        }
    }
</style>