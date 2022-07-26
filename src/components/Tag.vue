<script setup>
import { ref, reactive, nextTick, onMounted } from "vue";
let tagColor = reactive({
    1: "",
    2: "success",
    3: "info",
    4: "warning",
    5: "danger"
})

let chooseTagColor = () => {
    return tagColor[Math.floor(Math.random() * 5) + 1]
}

let tags = reactive([])

const currentDate = ref(new Date())

onMounted(() => {
    for (let index = 0; index < 12; index++) {
        tags.push(
            {
                id: index,
                color: chooseTagColor(),
                num: index
            }
        )
    }
})

</script>
<template>
    <div class="all-tags">
        <el-card class="box-card" shadow="always">
            <div class="text">
                <el-icon>
                    <PriceTag />
                </el-icon>
                文章标签
            </div>
            <el-tag v-for="tag in tags" :key="tag.id" :type="tag.color" class="tag">Tag Name <span>{{ tag.num }}</span>
            </el-tag>
        </el-card>
    </div>
    <el-row :gutter="20" class="blogs">
        <el-col class="blog" v-for="(o, index) in 5" :key="o" :span="6" style="margin-bottom: 10px;">
            <el-card :body-style="{ padding: '0px' }">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image" />
                <div style="padding: 14px">
                    <span>Yummy hamburger</span>
                    <div class="bottom">
                        <time class="time">{{ currentDate }}</time>
                        <el-button text class="button">Operating</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<style lang="less" scoped>
.all-tags {
    width: 1000px;
    margin: 0 auto;

    .text {
        margin: 10px auto;
        width: 100px;
    }

    .box-card {
        margin: 10px auto;
        width: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.tag {
    padding: 10px;
    margin: 10px 20px;

    span {
        margin: 0 2px;
    }
}

.tag:hover {
    cursor: pointer;
    transform: scale(1.05);
}

.blogs {
    min-height: 600px;
    width: 1000px;
    margin: 0 auto !important;

    .blog:hover {
        transform: scale(1.05);
        transition: all .2s linear;
    }
}

.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}
</style>