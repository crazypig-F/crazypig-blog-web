<script setup>
import { ref, reactive, toRefs, watch } from "vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'
const adminInfo = JSON.parse(window.localStorage.getItem('admin'))
const props = defineProps({
    createTypeDialogFormVisible: { type: Boolean, default: false }
})
const emits = defineEmits(['update:createTypeDialogFormVisible'])
const refProps = toRefs(props)
const isCreateTypeDialogFormVisible = ref(false)
watch(refProps.createTypeDialogFormVisible, (val, old) => {
    isCreateTypeDialogFormVisible.value = val
})
watch(isCreateTypeDialogFormVisible, (val, old) => {
    emits('update:createTypeDialogFormVisible', val)
})

let imageUrlVal = ref(null)
// Type提交表单
let createTypeForm = reactive({
    name: '',
    picUrl: ''
})
let createTypeFormReset = () => {
    createTypeForm.name = ''
    createTypeForm.picUrl = ''
    imageUrlVal.value = null
}
let createTypeFormRules = reactive({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' }
    ],
    picUrl: [
        { required: true, message: '分类图片不能为空', trigger: 'blur' }
    ]
})
// 新建操作
let createTypeButtonDisabled = ref(true)
let handleAvatarSuccess = (response, uploadFile) => {
    createTypeForm.picUrl = response.url
    createTypeButtonDisabled.value = false
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
    createTypeFormReset()
    createTypeButtonDisabled.value = true
    isCreateTypeDialogFormVisible.value = false
}
let createType = async () => {
    if (!adminInfo) {
        ElMessage({
            message: "token不存在,或者已过期",
            type: 'error',
        })
        close()
        return
    }
    await axios({
        url: "http://127.0.0.1:8000/api/v1/type",
        method: 'post',
        headers: {
            'Authorization': adminInfo.token
        },
        data: createTypeForm,
    }).then(function (res) {
        if (res.data.status === 200) {
            ElMessage({
                message: '创建成功',
                type: 'success',
            })
            close()
        } else {
            ElMessage({
                message: res.data.msg,
                type: 'error',
            })
        }
    }).catch(
        (error) => {
            ElMessage({
                message: error.code,
                type: 'error',
            })
        }
    )
}
</script>

<template>
    <el-dialog title="新建分类" v-model="isCreateTypeDialogFormVisible" @close="close" center>
        <el-form style="text-align: left" ref="createTypeFormRef" :model="createTypeForm" :rules="createTypeFormRules"
            label-width="80px">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="createTypeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="封面图片" prop="picUrl">
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
            <el-button @click="backPage">取消</el-button>
            <el-button type="primary" @click="createType" :disabled="createTypeButtonDisabled">提交</el-button>
        </div>
    </el-dialog>
</template>


<style lang="less" scoped>
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