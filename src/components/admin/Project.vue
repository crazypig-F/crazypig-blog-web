<script setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElCard, ElTabs, ElTabPane, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElUpload, ElDialog, ElImage, ElTag } from "element-plus";
import { ref, reactive } from "vue"
let project = reactive({
    id: null,
    content: "",
    title: "",
    pic_url: "",
    url: "",
    type: 0,
    techs: ""
})
let projectList = reactive([])
let dialogImageUrl = ref('')
let publishForm = reactive({})
let dialogVisible = ref(false)
let activeName = ('second')
let types = reactive([
    { id: 0, name: '完整项目' },
    { id: 1, name: '小练习' }
])
</script>
<template>
    <div>
        <!--    面包屑导航区-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card shadow="hover">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="发布项目" name="first">
                    <el-form label-position="left" label-width="80px" style="text-align: left" ref="publishFormRef"
                        :model="publishForm" class="publish_form">
                        <el-form-item label="项目名称" prop="title">
                            <el-input v-model="publishForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="项目类型" prop="type">
                            <el-select v-model="publishForm.type">
                                <el-option v-for="item in types" :value="item.id" :label="item.name" :key="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="项目描述" prop="content">
                            <el-input v-model="publishForm.content" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="项目图片">
                            <el-upload ref="upload" action="http://hikari.top:8090/upload" list-type="picture-card"
                                :limit="1" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
                                :on-success="handleSuccess">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="技术栈" prop="techs">
                            <el-input v-model="publishForm.techs"></el-input>
                        </el-form-item>
                        <el-form-item label="项目地址" prop="url">
                            <el-input v-model="publishForm.url"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <el-button type="primary" @click="publishProject">发布</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="项目列表" name="second">
                    <el-table :data="projectList" border stripe>
                        <el-table-column type="index"></el-table-column>
                        <el-table-column label="项目名称" prop="title"></el-table-column>
                        <el-table-column label="项目图片" prop="pic_url">
                            <template slot-scope="scope">
                                <el-image :src="scope.row.pic_url" style="width: 100%;max-height: 150px"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目类型" prop="type">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.type" size="small" @change="updateProject(scope.row)">
                                    <el-option v-for="type_ in types" :key="type_.id" :label="type_.name"
                                        :value="type_.id"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目地址" prop="url">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.url" @blur="updateProject(scope.row)">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="项目技术" prop="techs">
                            <template v-if="scope.row.techs !== null" slot-scope="scope">
                                <el-tag v-for="(tag, i) in scope.row.techs.split(',')" style="margin: 3px" size="small"
                                    closable @close="handleClose(i, scope.row)">{{ tag }}
                                </el-tag>
                                <el-input size="small" style="width: 100px;" class="input-new-tag"
                                    v-if="scope.row.inputVisible" v-model="scope.row.inputValue" ref="saveInput"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)">
                                </el-input>
                                <el-button v-else size="mini" class="button-new-tag" @click="showInput(scope.row)">+ New
                                    Tag
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <!--            删除按钮-->
                                <el-button type="danger" icon="el-icon-delete" size="mini" circle
                                    @click="removeProjectById(scope.row.id)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>