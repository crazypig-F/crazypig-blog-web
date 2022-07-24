<script setup>
import { ref, reactive, toRefs, watch } from "vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'
const adminInfo = JSON.parse(window.localStorage.getItem('admin'))
const props = defineProps({
    createTagDialogFormVisible: { type: Boolean, default: false }
})
const emits = defineEmits(['update:createTagDialogFormVisible'])
const refProps = toRefs(props)
const iscreateTagDialogFormVisible = ref(false)
watch(refProps.createTagDialogFormVisible, (val, old) => {
    iscreateTagDialogFormVisible.value = val
})
watch(iscreateTagDialogFormVisible, (val, old) => {
    emits('update:createTagDialogFormVisible', val)
})
let createTagForm = reactive({
    name: ''
})

let createTagFormReset = () => {
    createTagForm.name = ''
}
let createTagFormRules = reactive({
    name: [
        { required: true, message: '分类名称不能为空', trigger: 'blur' }
    ],
})

let close = () => {
    createTagFormReset()
    iscreateTagDialogFormVisible.value = false
}

let backPage = () => {
    close()
}

let createTag = async () => {
    if (!adminInfo) {
        ElMessage({
            message: "token不存在,或者已过期",
            type: 'error',
        })
        close()
        return
    }
    await axios({
        url: "http://127.0.0.1:8000/api/v1/tag",
        method: 'post',
        headers: {
            'Authorization': adminInfo.token
        },
        data: createTagForm,
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
    <el-dialog title="新建标签" v-model="createTagDialogFormVisible" @close="close" center>
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
</template>