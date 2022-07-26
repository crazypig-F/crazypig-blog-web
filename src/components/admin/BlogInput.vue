<script setup>
import { ref, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import CreateTypeFormVue from "./type/CreateTypeForm.vue";
import CreateTagFormVue from "./tag/CreateTagForm.vue";
import axios from "axios";
const adminInfo = JSON.parse(window.localStorage.getItem("admin"));
let publishDialogFormVisible = ref(false);
let initData = reactive({
    typeList: [],
    tagList: []
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

let getTagList = async () => {
    await axios({
        url: "http://127.0.0.1:8000/api/v1/tags",
        method: "get",
        headers: {
            Authorization: adminInfo.token,
        },
    })
        .then(function (res) {
            if (res.data.status === 200) {
                initData.tagList = res.data.data;
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

let getInitData = async () => {
    // 获取分类
    getTypeList()
    // 获取标签
    getTagList()
};

let imageUrlVal = ref(null)
let publishForm = reactive({
    type: '',
    tags: [],
    flag: "原创",
    firstPicture: '',
    content: '',
    description: '',
    title: '',
});

let publishFormReset = () => {
    publishForm.type = ''
    publishForm.tags = []
    publishForm.flag = "原创"
    publishForm.firstPicture = ''
    // publishForm.content = ''
    // publishForm.title = ''
    // publishForm.description = ''
    imageUrlVal.value = null
}
let publishFormRules = reactive({
    type: [{ required: true, message: "请选择类型", trigger: "blur" }],
    tags: [{ required: true, message: "请选择至少一种标签", trigger: "blur" }],
    flag: [{ required: true, message: "请选择文章类型", trigger: "blur" }],
});

let submit = () => {
    if (publishForm.title == "") {
        ElMessage({
            message: "博客标题不能为空",
            type: "error",
        });
        return;
    }

    if (publishForm.description == "") {
        ElMessage({
            message: "博客简介不能为空",
            type: "error",
        });
        return;
    }

    if (publishForm.content == "") {
        ElMessage({
            message: "博客内容不能为空",
            type: "error",
        });
        return;
    }
    getInitData();
    publishDialogFormVisible.value = true;
};

let createTypeDialogFormVisible = ref(false);
watch(createTypeDialogFormVisible, (val, old) => {
    createTypeDialogFormVisible.value = val;
    getTypeList();
});

let createTagDialogFormVisible = ref(false);
watch(createTagDialogFormVisible, (val, old) => {
    createTagDialogFormVisible.value = val;
    getTagList();
});

let flags = reactive([
    { value: "原创", label: "原创" },
    { value: "转载", label: "转载" },
    { value: "翻译", label: "翻译" },
]);
let handleAvatarSuccess = (response, uploadFile) => {
    publishForm.firstPicture = response.url
    imageUrlVal.value = URL.createObjectURL(uploadFile.raw)
}
let beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG or PNG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

let close = () => {
    publishFormReset()
    publishDialogFormVisible.value = false
}

let publishBlog = async () => {
    console.log(publishForm);
    await axios({
        url: "http://127.0.0.1:8000/api/v1/blog",
        method: "post",
        headers: {
            Authorization: adminInfo.token,
        },
        data: publishForm
    })
        .then(function (res) {
            if (res.data.status === 200) {
                ElMessage({
                    message: "发布成功",
                    type: "success",
                });
                close()
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
}

</script>
<template>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>撰写博客</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-row :gutter="5">
        <el-col :span="21">
            <el-input placeholder="请输入文章标题" v-model="publishForm.title"></el-input>
        </el-col>
        <el-col :span="3">
            <el-button style="border-radius: 20px" type="danger" @click="submit">发布文章</el-button>
        </el-col>
    </el-row>
    <br />
    <br />
    <el-row>
        <el-col :span="24">
            <el-input placeholder="文章简介" v-model="publishForm.description"></el-input>
        </el-col>
    </el-row>
    <br />
    <br />
    <el-row>
        <v-md-editor v-model="publishForm.content" height="70vh"></v-md-editor>
    </el-row>
    <el-dialog v-model="publishDialogFormVisible" title="发布文章" @close="close" center>
        <el-form style="text-align: left" :model="publishForm" :rules="publishFormRules" class="publish_form">
            <el-form-item label="文章分类" prop="type">
                <el-select size="small" v-model="publishForm.type" placeholder="请选择文章分类" style="margin-right: 10px"
                    @change="setBlogType">
                    <el-option v-for="type_ in initData.typeList" :label="type_.name" :value="type_.id" :key="type_.id">
                    </el-option>
                </el-select>
                <el-button size="small" @click="createTypeDialogFormVisible = true">+ 新建分类</el-button>
            </el-form-item>
            <el-form-item label="文章标签" prop="tags">
                <el-card shadow="never" style="height: 120px; overflow: auto">
                    <el-checkbox-group v-model="publishForm.tags">
                        <el-checkbox v-for="tag in initData.tagList" :label="tag.id" :key="tag.id">{{ tag.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                    <br>
                    <el-button size="mini" @click="createTagDialogFormVisible = true">+ 新建标签</el-button>
                </el-card>
            </el-form-item>
            <el-form-item label="文章类型" prop="flag">
                <el-select size="small" v-model="publishForm.flag">
                    <el-option v-for="item in flags" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章首图">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:8000/api/v1/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrlVal" :src="imageUrlVal" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="publishBlog">发布文章</el-button>
        </div>
    </el-dialog>
    <CreateTypeFormVue v-model:createTypeDialogFormVisible="createTypeDialogFormVisible"></CreateTypeFormVue>
    <CreateTagFormVue v-model:createTagDialogFormVisible="createTagDialogFormVisible"></CreateTagFormVue>
</template>

<style scoped lang="less">

.avatar-uploader {
    width: 78px;
    height: 78px;
    display: block;
    border: 1px dashed lightblue;
    border-radius: 6px;
    cursor: pointer;

    .avatar {
        width: 78px;
        height: 78px;
    }
}

.avatar-uploader:hover {
    border: 1px dashed rgb(23, 193, 250);
}

.avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    text-align: center;
}
</style>
