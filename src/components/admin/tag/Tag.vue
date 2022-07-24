<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import axios from "axios";
import CreateTagFormVue from "./CreateTagForm.vue";
const adminInfo = JSON.parse(window.localStorage.getItem("admin"));
let createTagDialogFormVisible = ref(false);
watch(createTagDialogFormVisible, (val, old) => {
  createTagDialogFormVisible.value = val;
  getList();
});
let initData = reactive({
  tagList: [],
});
let getList = async () => {
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
onMounted(getList());
</script>
<template>
  <!--    面包屑导航区-->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>标签管理</el-breadcrumb-item>
  </el-breadcrumb>
  <br />
  <el-card shadow="never">
    <el-button
      type="primary"
      style="margin-bottom: 20px"
      @click="createTagDialogFormVisible = true"
      >新建标签
    </el-button>
    <el-row :gutter="20">
      <el-col
        :sm="8"
        :lg="6"
        v-for="tag in initData.tagList"
        style="margin-bottom: 20px"
        :key="tag.id"
      >
        <el-card
          shadow="hover"
          style="position: relative; border: 2px solid #eee; text-align: left"
        >
          <div class="op" style="position: absolute; right: 45px; top: 22px">
            <el-icon
              :size="20"
              @click="editTagById(tag.id)"
              style="color: #3a8ee6; margin-right: 5px"
            >
              <Edit />
            </el-icon>
          </div>
          <div class="op" style="position: absolute; right: 5px; top: 22px">
            <el-icon
              :size="20"
              @click="editTagById(tag.id)"
              style="color: red; margin-right: 5px"
            >
              <Delete />
            </el-icon>
          </div>
          <b>
            标签名称 <span style="color: #3a8ee6">{{ tag.name }}</span></b
          >
          <br />
          <p style="margin-bottom: 0">
            博客数量 <span style="color: #2ac06d">{{ 0 }}</span>
          </p>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
  <CreateTagFormVue
    v-model:createTagDialogFormVisible="createTagDialogFormVisible"
  ></CreateTagFormVue>
</template>

<style scoped lang="less">
.op:hover {
  cursor: pointer;
  transform: scaleX(1.2);
}
</style>
