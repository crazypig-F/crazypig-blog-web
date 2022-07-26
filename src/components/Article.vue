<script setup>
import { reactive, onMounted } from "vue";
import axios from 'axios'
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { marked } from 'marked';
import { ref, shallowRef } from 'vue';
import hljs from 'highlight.js'
import 'highlight.js/styles/foundation.css'

const render = new marked.Renderer()
marked.setOptions({
    renderer: render, // 这是必填项
    gfm: true,	// 启动类似于Github样式的Markdown语法
    pedantic: false, // 只解析符合Markdwon定义的，不修正Markdown的错误
    sanitize: false, // 原始输出，忽略HTML标签（关闭后，可直接渲染HTML标签）

    // 高亮的语法规范
    highlight: (code, lang) => hljs.highlight(code, { language: lang }).value,
})

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
        <div class="content animated fadeIn">
            <p class="title">
                {{ initData.article.title }}
            </p>
            <div class="content2">
                <div v-html="marked(initData.article.content)"></div>
            </div>
            <!-- <v-md-editor :model-value="initData.article.content" mode="preview"></v-md-editor> -->

            <router-link class="backBtn" tag="button" to="/"><i class="el-icon-position"></i>返回</router-link>
        </div>
    </div>
</template>

<style scoped lang="less">

:deep(pre) {
    padding: 10PX;
    font-size: 20PX;
    background-color: #f3eeee;
}

:deep(img) {
    width: 80%;
}

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

:deep(.content2){
    width: 80%;
    margin: auto;

    li {
        list-style: decimal;
    }

    a {
        color: #4183C4;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        position: relative;
        margin-top: 1rem;
        margin-bottom: 1rem;
        font-weight: bold;
        line-height: 1.4;
        cursor: text;
    }

    h1:hover a.anchor,
    h2:hover a.anchor,
    h3:hover a.anchor,
    h4:hover a.anchor,
    h5:hover a.anchor,
    h6:hover a.anchor {
        text-decoration: none;
    }

    h1 tt,
    h1 code {
        font-size: inherit;
    }

    h2 tt,
    h2 code {
        font-size: inherit;
    }

    h3 tt,
    h3 code {
        font-size: inherit;
    }

    h4 tt,
    h4 code {
        font-size: inherit;
    }

    h5 tt,
    h5 code {
        font-size: inherit;
    }

    h6 tt,
    h6 code {
        font-size: inherit;
    }

    h1 {
        padding-bottom: .3em;
        font-size: 2.25em;
        line-height: 1.2;
        border-bottom: 1px solid #eee;
    }

    h2 {
        padding-bottom: .3em;
        font-size: 1.75em;
        line-height: 1.225;
        border-bottom: 1px solid #eee;
    }

    h3 {
        font-size: 1.5em;
        line-height: 1.43;
    }

    h4 {
        font-size: 1.25em;
    }

    h5 {
        font-size: 1em;
    }

    h6 {
        font-size: 1em;
        color: #777;
    }

    p,
    blockquote,
    ul,
    ol,
    dl,
    table {
        margin: 0.8em 0;
    }

    li>ol,
    li>ul {
        margin: 0 0;
    }

    hr {
        height: 2px;
        padding: 0;
        margin: 16px 0;
        background-color: #e7e7e7;
        border: 0 none;
        overflow: hidden;
        box-sizing: content-box;
    }

    li p.first {
        display: inline-block;
    }

    ul,
    ol {
        padding-left: 30px;
    }

    ul:first-child,
    ol:first-child {
        margin-top: 0;
    }

    ul:last-child,
    ol:last-child {
        margin-bottom: 0;
    }

    blockquote {
        border-left: 4px solid #dfe2e5;
        padding: 0 15px;
        color: #777777;
    }

    blockquote blockquote {
        padding-right: 0;
    }

    table {
        padding: 0;
        word-break: initial;
    }

    table tr {
        border-top: 1px solid #dfe2e5;
        margin: 0;
        padding: 0;
    }

    table tr:nth-child(2n),
    thead {
        background-color: #f8f8f8;
    }

    table tr th {
        font-weight: bold;
        border: 1px solid #dfe2e5;
        border-bottom: 0;
        margin: 0;
        padding: 6px 13px;
    }

    table tr td {
        border: 1px solid #dfe2e5;
        margin: 0;
        padding: 6px 13px;
    }

    table tr th:first-child,
    table tr td:first-child {
        margin-top: 0;
    }

    table tr th:last-child,
    table tr td:last-child {
        margin-bottom: 0;
    }
}
</style>
