<script setup>
import { ElRow, ElCol, ElCard } from "element-plus";
import { ref, reactive } from "vue"
import BlogChart from "./echarts/BlogChart.vue"
import TagChart from "./echarts/TagChart.vue"
import TypeChart from "./echarts/TypeChart.vue"
import VisitorMap from "./echarts/VisitorMap.vue"
import CommentList from "./echarts/CommentList.vue"
import RecentBlogList from "./echarts/RecentBlogList.vue"
import BoxCard from "./echarts/BoxCard.vue"

let blogCount = ref(1000)
let viewCount = ref(1000)
let appreciateCount = ref(1000)
let commentCount = ref(1000)
let selectedCard = ref(0)
let recommendList = reactive([])
</script>
<template>
    <el-row :gutter="32">
        <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
            <el-card shadow="hover" @click.native="selectCard(0)">
                <p>总阅读量</p>
                <h2>{{ viewCount }}</h2>
            </el-card>
        </el-col>
        <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
            <el-card shadow="hover" @click.native="selectCard(1)">
                <p>文章总数</p>
                <h2>{{ blogCount }}</h2>
            </el-card>
        </el-col>
        <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
            <el-card shadow="hover" @click.native="selectCard(2)">
                <p>点赞数</p>
                <h2>{{ appreciateCount }}</h2>
            </el-card>
        </el-col>
        <el-col :xs="12" :sm="6" style="text-align: center;margin-bottom: 32px;">
            <el-card shadow="hover" @click.native="selectCard(3)">
                <p>评论数</p>
                <h2>{{ commentCount }}</h2>
            </el-card>
        </el-col>
    </el-row>
    <el-row type="flex" justify="center">
        <el-col :span="24" style="text-align: center;">
            <el-card shadow="hover">
                <div class="com-page">
                    <blog-chart style="width: 100%; height: 350px;" :psMsg="selectedCard"></blog-chart>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="32">
        <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
            <el-card class="chart-wrapper" shadow="hover">
                <tag-chart style="width: 100%;height: 300px;"></tag-chart>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
            <el-card class="chart-wrapper" shadow="hover">
                <type-chart style="width: 100%;height: 300px;"></type-chart>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8" style="text-align: center;margin-bottom: 20px;">
            <el-card class="chart-wrapper" shadow="hover">
                <visitor-map style="width: 100%;height: 300px;"></visitor-map>
            </el-card>
        </el-col>
    </el-row>
    <el-row :gutter="8">
        <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 12 }"
            style="padding-right:8px;margin-bottom:30px;">
            <recent-blog-list />
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
            style="margin-bottom:30px;">
            <comment-list />
        </el-col>
        <el-col :xs="{ span: 24 }" :sm="{ span: 12 }" :md="{ span: 6 }" :lg="{ span: 6 }" :xl="{ span: 6 }"
            style="margin-bottom:30px;">
            <box-card />
        </el-col>
    </el-row>
</template>