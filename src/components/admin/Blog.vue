<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";
const adminInfo = JSON.parse(window.localStorage.getItem("admin"));
let initData = reactive({
    typeList: [],
    blogList: []
})
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
let getBlogList = async () => {
    await axios({
        url: "http://127.0.0.1:8000/api/v1/blogs",
        method: "get",
        headers: {
            Authorization: adminInfo.token,
        },
    })
        .then(function (res) {
            if (res.data.status === 200) {
                initData.blogList = res.data.data;
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
    () => {
        getTypeList()
        getBlogList()
    }
);

let queryInfo = reactive({
    title: '',
    type: ''
})

let pagenum = ref(1)
let pagesize = ref(8)
let totalcount = ref(0)
let editing = ref(false)
let commentList = reactive([])
let typeList = reactive([])
let tagList = reactive([])
let editTypeForm = reactive({
    typeId: null
})
let blog = reactive(null)
let editTypeDialogFormVisible = ref(false)
let editTypeFormRules = reactive({
    type: [
        { required: true, message: '请选择类型', trigger: 'blur' }
    ],
})
let inputValue = ref('')
let inputVisible = ref(false)
let editPicDialogFormVisible = ref(false)
let dialogVisible = ref(false)
let dialogImageUrl = ref('')
</script>
<template>
    <!--    面包屑导航区-->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>

    <el-card shadow="never" style="text-align: left">
        <div style="text-align: left;padding: 0;">
            <h1 style="margin: 0;">博客管理</h1>
        </div>
        <el-input style="width: 200px;margin-right: 20px;margin-top: 10px" placeholder="标题" v-model="queryInfo.title">
        </el-input>
        <el-select v-model="queryInfo.type" @change="selectType" placeholder="分类" style="margin-right: 20px">
            <el-option v-for="item in initData.typeList" :key="item.id" :label="item.name" :value="item.name">
            </el-option>
        </el-select>
        <el-button @click="clearSearh">清除</el-button>
        <el-button type="primary" @click="getBlogList">搜索</el-button>
        <el-table :data="initData.blogList" border stripe>
            <el-table-column type="expand">
                <template #default="scope">
                    <div class="blog-information">
                        <el-row :gutter="20">
                            <el-col class="left-item" :sm="12" :lg="8">
                                <el-card shadow="never">
                                    <div class="firstPicture">
                                        <h1 style="margin: 5px auto">博客首图 &nbsp;&nbsp;<el-button type="primary"
                                                @click="editPic(scope.row.id)"> 编辑图片
                                            </el-button>
                                        </h1>
                                        <el-image class="img" :src="scope.row.firstPicture"></el-image>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col class="middle-item" :sm="12" :lg="8">
                                <el-card shadow="never">
                                    <h1 style="margin: 5px auto">描述</h1>
                                    <div style="word-break:break-all;">{{ scope.row.description }}</div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title">
                <template #default="scope">
                    <p @click="getBlogInfo(scope.row.id)" class="change-type">{{ scope.row.title }}</p>
                </template>
            </el-table-column>
            <el-table-column label="分类" prop="type.name" width="110px">
                <template #default="scope">
                    <div @click="changeBlogType(scope.row.id)" class="change-type">{{ scope.row.type }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column label="标签" prop="tags" width="250px">
                <template slot-scope="scope">
                    <el-tag size="medium" v-for="(tag, i) in scope.row.tags" :key="tag.id" closable
                        @close="handleClose(i, scope.row)">{{ tag.name }}
                    </el-tag>
                    <el-input size="small" style="width: 100px;" class="input-new-tag" v-if="scope.row.inputVisible"
                        v-model="scope.row.inputValue" ref="saveTagInput"
                        @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
                    </el-input>
                    <el-button v-else size="mini" class="button-new-tag" @click="showInput(scope.row)">+ New Tag
                    </el-button>
                </template>
            </el-table-column> -->
            <el-table-column label="阅读量" prop="views" width="70px">100</el-table-column>
            <el-table-column label="更新时间" prop="updateTime" width="150px">
                2022-08-01
            </el-table-column>
            <el-table-column label="操作" width="170px">
                <template #default="scope">
                    <el-button type="primary" @click="editBlogByid(scope.row.id)">修改</el-button>
                    <el-button type="danger" @click="removeBlogById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :page-size="pagesize" :current-page="pagenum" :layout="pagLayout" :total="totalcount">
        </el-pagination> -->
        <el-dialog class="publish_dialog" title="修改文章分类" :visible.sync="editTypeDialogFormVisible">
            <el-form style="text-align: left" ref="editTypeFormRef" :model="editTypeForm" :rules="editTypeFormRules"
                class="edit_type_form">
                <el-form-item label="文章分类" prop="type">
                    <el-select v-model="editTypeForm.typeId" placeholder="请选择文章分类" style="margin-right: 10px">
                        <el-option v-for="type_ in typeList" :label="type_.name" :value="type_.id"></el-option>
                    </el-select>
                    <el-button>+ 新建分类</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="backPage">取消</el-button>
                <el-button type="primary" @click="changeTypeSubmit">提交修改</el-button>
            </div>
        </el-dialog>
        <el-dialog class="pic_dialog" title="修改文章首图" center :visible.sync="editPicDialogFormVisible"
            style="width: 800px;margin: 0 auto">
            <el-form ref="editPicFormRef" class="edit_pic_form">
                <el-form-item style="text-align: center">
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
                <el-button @click="backPage2">取消</el-button>
                <el-button type="primary" @click="changePicSubmit">确定</el-button>
            </div>
        </el-dialog>
    </el-card>
</template>

<style scoped lang="less">
.el-tag {
    margin: 2px;
}

.blog-information {
    width: 100%;

    .firstPicture {
        text-align: center;

        h1 {
            display: flex;
            justify-content: center;
            align-items: center;

            .el-button {
                margin-left: 20px;
            }
        }

        /*padding-right: 20px;*/
        /*border-right: 1px dashed #999;*/
        /*box-sizing: border-box;*/

        .img {
            margin: 10px 0;
            width: 90%;
            border-radius: 10px;
        }
    }

    .middle-item {
        /*padding-right: 20px;*/
        /*border-right: 1px dashed #999;*/
        height: 100%;
        /*box-sizing: border-box;*/

        h1 {
            text-align: center;
        }

    }

    .right-item {
        /*margin-left: 20px;*/

        .comment {
            border-bottom: 1px dashed #ccc;
            margin: 10px 0;
            display: flex;
        }

        .el-avatar {
            width: 35px;
            height: 35px;
            border: 2px solid white;
            box-shadow: 0 0 10px 2px rgba(0, 0, 0, .06);
            flex-shrink: 0;
        }

        .content {
            text-align: left;
            font-size: 14px;
            flex-grow: 1;

            .nkname {
                margin-left: 10px;
                max-width: 530px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .rp,
                .date {
                    color: #999;
                    margin-left: 10px;
                }

                .blog {
                    color: #349edf;
                    margin-left: 10px;
                }
            }

            .reply {
                margin-left: 10px;
            }

            .op {
                color: #ddd;
                font-weight: lighter;

                .rep {
                    color: #349edf;
                }

                .del {
                    color: red;
                }
            }

            .op:hover {
                cursor: pointer;
            }
        }
    }
}

.change-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.change-type:hover {
    cursor: pointer;
    color: #409eff;
}

@media screen and (max-width: 748px) {

    .el-input,
    .el-select {
        width: 100% !important;
        margin-bottom: 20px;
    }

    .blog-information {
        .left-item {
            width: 40%;
        }

        .middle-item {
            width: 30%;
        }

        .right-item {
            width: 30%;
        }
    }
}
</style>