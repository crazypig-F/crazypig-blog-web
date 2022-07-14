<script setup>
import { reactive } from 'vue'
let article = reactive({
    title: "Vue",
    content: " # HAHAH\n ### DADFAS \n ```python\n import pandas\n print(\"hello world\")\n```\n ### DADFAS \n### DADFAS \n### DADFAS \n### DADFAS \n### DADFAS \n### DADFAS \n### DADFAS \n### DADFAS \n### DA### DADFAS \nDFAS \n### DADFAS \n"
})

</script>

<template>
    <div class="article">
        <article class="content animated fadeIn">
            <p class="title">
                {{ article.title }}
            </p>
            <v-md-editor :model-value="article.content" mode="preview"></v-md-editor>
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
