<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import CreateTypeFormVue from "./CreateTypeForm.vue";
import axios from "axios";
const adminInfo = JSON.parse(window.localStorage.getItem("admin"));
let initData = reactive({
    typeList: [],
});
let getTypeList = async () => {
    await axios({
        url: "http://127.0.0.1:8000/api/v1/types",
        method: "get",
        headers: {
            Authorization: adminInfo.token,
        },
    })
        .then(function (res) {
            if (res.data.status === 200) {
                initData.typeList = res.data.data;
            } else {
                ElMessage({
                    message: res.data.msg,
                    type: "error",
                });
            }
        })
        .catch((error) => {
            ElMessage({
                message: error.code,
                type: "error",
            });
        });
};
onMounted(
    getTypeList()
);
// 增加操作弹出框控制
let createTypeDialogFormVisible = ref(false);
watch(createTypeDialogFormVisible, (val, old) => {
    createTypeDialogFormVisible.value = val;
    getTypeList()
});
</script>
<template>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-card shadow="never">
        <el-button type="primary" @click="createTypeDialogFormVisible = true">新建分类</el-button>
        <el-table :data="initData.typeList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="图片" prop="picUrl" width="150px">
                <template #default="scope">
                    <el-image :src="scope.row.picUrl"></el-image>
                </template>
            </el-table-column>
            <el-table-column label="分类名称" prop="name"></el-table-column>
            <el-table-column label="博客数量" prop="blogs.length"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <!--修改按钮-->
                    <el-button type="primary" @click="editBlogDialog(scope.$index)">
                        编辑
                    </el-button>
                    <!--删除按钮-->
                    <el-button type="danger" @click="removeBlogById(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <CreateTypeFormVue v-model:createTypeDialogFormVisible="createTypeDialogFormVisible"></CreateTypeFormVue>
    <!-- <el-dialog title="分类修改" :visible.sync="createTypeDialogFormVisible">
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
        </el-dialog> -->
</template>
