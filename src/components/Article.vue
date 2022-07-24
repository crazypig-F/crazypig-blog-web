<script setup>
import { reactive, onMounted } from "vue";
import axios from 'axios'
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter()
let initData = reactive({
    article: {
        title: '',
        content: ''
    }
})
let getTypeList = async (id) => {
    await axios({
        url: `http://127.0.0.1:8000/api/v1/front/blog/${id}`,
        method: "get",
    })
        .then(function (res) {
            if (res.data.status === 200) {
                console.log(res.data);
                initData.article = res.data.data;
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

onMounted(() => {
    let paths = router.currentRoute.value.fullPath.split("/")
    getTypeList(paths[paths.length - 1])
})
</script>

<template>
    <div class="article">
        <article class="content animated fadeIn">
            <p class="title">
                {{ initData.article.title }}
            </p>
            <v-md-editor :model-value="initData.article.content" mode="preview"></v-md-editor>
            <router-link class="backBtn" tag="button" to="/"><i class="el-icon-position"></i>返回</router-link>
        </article>
    </div>
</template>

<style scoped="scoped">
.article {
    min-height: 1000px;
}

.content {
    min-width: 800px;
    width: 60vw;
    margin: 2em auto;
    background-color: #fbfbfb;
    border-radius: 1em;
    animation-delay: 1.2s;
}

.title {
    text-align: center;
    font-size: 1.5em;
    padding: 1em 0;
    font-weight: bold;
}

.backBtn {
    display: block;
    margin: 0 auto;
    width: 20vw;
    height: 3em;
    border: none;
    outline: none;
    line-height: 3em;
    text-align: center;
    background-color: #82848a;
    color: #fff;
    border-radius: 0.5em;
    cursor: pointer;
}

.backBtn:hover {
    background-color: #a6a9ad;
}
</style>
