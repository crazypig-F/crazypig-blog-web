<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTable, ElForm, ElInput, ElColorPicker, ElFormItem, ElButton, ElTabPane } from "element-plus";
import { ref, reactive } from "vue";

let essay = reactive({
    id: null,
    content: "",
    title: "",
    color: "",
    createTime: ""
})
let publishDialogFormVisible = ref(false)
let publishForm = reactive({
    color: 'rgba(0, 0, 0, 1)'
})
let dialogVisible = ref(false)
let activeName = ref('first')
let essayList = reactive([])
let vis = ref(false)

</script>
<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>随笔管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-card shadow="hover">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="新建随笔" name="first">
                    <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                        :model="publishForm" class="publish_form">
                        <el-form-item label="标题" prop="title">
                            <el-input v-model="publishForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="色彩" prop="color">
                            <el-color-picker size="small" show-alpha v-model="publishForm.color"></el-color-picker>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <!-- <mavon-editor v-model="publishForm.content" ref="md" @imgAdd="imgAdd" @imgDel="imgDel"
                                style="margin: 10px auto;min-height: 70vh" /> -->
                            <v-md-editor v-model="publishForm.content" height="70vh"></v-md-editor>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <el-button type="primary" @click="publishAssay">发布</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="随笔管理" name="second">
                    <el-table :data="essayList" border stripe>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="随笔标题" prop="title"></el-table-column>
                        <el-table-column label="边框颜色" prop="color">
                            <template slot-scope="scope">
                                <el-tag :color="scope.row.color" class="essay-color"></el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="发布时间" prop="createTime">
                            <template slot-scope="scope">
                                {{ scope.row.createTime | dataFormat }}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--            修改按钮-->
                                <el-button type="primary" icon="el-icon-edit" size="mini" circle
                                    @click="editByid(scope.row)"></el-button>
                                <!--            删除按钮-->
                                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                                    @click="removeById(scope.row.id)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<style scoped>
  .essay-color {
    width: 30px;
    height: 30px;
    border-radius: 9999px;
    border: 1px solid white;
  }

  .card:hover {
    cursor: pointer;
  }
</style>