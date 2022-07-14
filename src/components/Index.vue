<script setup>
import { ref, reactive, nextTick } from 'vue'
import img from '../assets/img/article1.jpg'
let totalcount = ref(100)
let queryInfo = reactive({
    query: '',
    pagenum: 1,
    pagesize: 8
})
let pagSmall = ref(false)
let handleSizeChange = () => { }
let handleCurrentChange = () => { }
let pagLayout = ref("")
let intro = ref('')
let blogList = reactive([
    {
        id: 1,
        firstPicture: img,
        title: "题目",
        description: "简单描述的房贷发放啊撒旦范德萨发生的发的是否是大发大水阿斯顿个人个人如果 敢死队风格岁的法国好几天就",
        user: {
            avatar: "",
            nickname: "胡万"
        },
        type: {
            name: "数据库"
        },
        createTime: "2022-08-01",
        views: 10
    },
    {
        id: 2,
        firstPicture: img,
        title: "题目",
        description: "简单描述的房贷发放啊撒旦范德萨发生的发的是否是大发大水阿斯顿个人个人如果 敢死队风格岁的法国好几天就",
        user: {
            avatar: "",
            nickname: "胡万"
        },
        type: {
            name: "数据库"
        },
        createTime: "2022-08-01",
        views: 10
    },
    {
        id: 3,
        firstPicture: img,
        title: "题目",
        description: "简单描述的房贷发放啊撒旦范德萨发生的发的是否是大发大水阿斯顿个人个人如果 敢死队风格岁的法国好几天就",
        user: {
            avatar: "",
            nickname: "胡万"
        },
        type: {
            name: "数据库"
        },
        createTime: "2022-08-01",
        views: 10
    },
    {
        id: 4,
        firstPicture: img,
        title: "题目",
        description: "简单描述的房贷发放啊撒旦范德萨发生的发的是否是大发大水阿斯顿个人个人如果 敢死队风格岁的法国好几天就",
        user: {
            avatar: "",
            nickname: "胡万"
        },
        type: {
            name: "数据库"
        },
        createTime: "2022-08-01",
        views: 10
    }, {
        id: 4,
        firstPicture: img,
        title: "题目",
        description: "简单描述的房贷发放啊撒旦范德萨发生的发的是否是大发大水阿斯顿个人个人如果 敢死队风格岁的法国好几天就",
        user: {
            avatar: "",
            nickname: "胡万"
        },
        type: {
            name: "数据库"
        },
        createTime: "2022-08-01",
        views: 10
    }
])
let typeList = reactive([
    {
        id: 1,
        pic_url: img,
        name: "数据库",
        blogs: [1, 2, 3]
    },
    {
        id: 2,
        pic_url: img,
        name: "数据库",
        blogs: [1, 2, 3]
    },
    {
        id: 3,
        pic_url: img,
        name: "数据库",
        blogs: [1, 2, 3]
    }
])
let tagList = reactive([
    {
        id: 1,
        name: "前端",
        blogs: [1, 2, 3]
    },
    {
        id: 2,
        name: "前端",
        blogs: [1, 2, 3]
    },
    {
        id: 3,
        name: "前端",
        blogs: [1, 2, 3]
    },
])
let recommendList = reactive([
    {
        id: 1,
        title: "Mysql数据库的使用1"
    },
    {
        id: 2,
        title: "Mysql数据库的使用2"
    },
    {
        id: 3,
        title: "Mysql数据库的使用3"
    }
])
let selectMethod = ref('全部博客')
let typeId = ref(-1)
let tagId = ref(-1)
let selected = ref(false)
let moreType = ref(true)
let moreTag = ref(true)
let value = reactive(new Date())
let timer = ref(null)
let start = ref(false)
let screenWidth = ref(document.documentElement.clientWidth)  //实时屏幕宽度
const currentPage = ref(2)
const pageSize = ref(100)
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

let startRead = () => {
    nextTick(() => {
        document.getElementById('main-page').scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            // inline: 'nearest'
        });
    })
}
</script>
<template>
    <el-row style="height: 90vh">
        <el-col :span="24" style="height: 100%">
            <el-card shadow="never" class="welcome">
                <h1 class="tit">
                    欢迎来到crazypigの个人博客
                    <div class="border"></div>
                </h1>

                <h2 class="intro">{{ intro }}</h2>
                <div class="bounce down" @click="startRead">
                    <el-icon color="white">
                        <ArrowDownBold />
                    </el-icon>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <div id="main-page" class="main-page animate__animated animate__fadeInUp">
        <el-row :gutter="12">
            <el-col :xs="24" :sm="17">
                <el-card style="background-color: rgba(255,255,255,0.9)" class="left-item">
                    <div slot="header" class="total">
                        <div class="title">
                            <i v-if="selected" class="el-icon-back" @click="updateBlogList"></i>
                            <span>{{ selectMethod }}</span>
                        </div>
                        <span>共 <span style="color: #3a8ee6; font-size: 20px">{{ totalcount }}</span> 篇</span>
                    </div>
                    <el-row type="flex" align="middle" style="flex-wrap: wrap" :gutter="20" v-for="blog in blogList"
                        :key="blog.id" shadow="never" class="animate__animated animate__fadeInUp blog-content">
                        <el-col class="img" :xs="24" :sm="8">
                            <el-image lazy :src="blog.firstPicture"></el-image>
                        </el-col>
                        <el-col :xs="24" :sm="16">
                            <div @click="getBlogInfo(blog.id)">
                                <h3>{{ blog.title }}</h3>
                                <p class="description">{{ blog.description }}</p>
                                <div class="blog-info">
                                    <div class="user-info">
                                        <el-avatar size="small" :src="blog.user.avatar"></el-avatar>
                                        <a href="#" class="nickname">{{ blog.user.nickname }}</a>
                                    </div>
                                    <div class="blog-date">
                                        <el-icon>
                                            <Calendar />
                                        </el-icon>
                                        <span>{{ blog.createTime }}</span>
                                    </div>
                                    <div>
                                        <el-icon>
                                            <View />
                                        </el-icon>
                                        <span>{{ blog.views }}</span>
                                    </div>
                                    <div class="blog-type">
                                        <el-tag effect="plain">{{ blog.type.name }}</el-tag>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :small="small"
                    :disabled="disabled" :background="background" layout="prev, pager, next, jumper" :total="1000"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </el-col>
            <el-col :xs="24" :sm="7">
                <el-card style="background-color: rgba(255,255,255,0.9)"
                    class="animate__animated animate__fadeInUp right-item">
                    <div slot="header" class="attributes">
                        <b>分类</b>
                    </div>
                    <ul>
                        <li class="animate__animated animate__fadeInUp blog-type" v-for="type in typeList"
                            :key="type.id" @click="selectType(type.id)" :class="type.id === typeId ? 'activeType' : ''">
                            <div style="display: flex;align-items: center">
                                <el-image lazy :src="type.pic_url"
                                    style="width: 28px;height: 28px; border-radius: 50%; margin-right: 10px">
                                </el-image>
                                {{ type.name }}
                            </div>
                            <div>{{ type.blogs.length }}</div>
                        </li>
                    </ul>
                    <div class="more" @click="dealType">
                        <i v-if="moreType" class="el-icon-arrow-down"></i>
                        <i v-else class="el-icon-arrow-up"></i>
                    </div>
                </el-card>
                <el-card style="background-color: rgba(255,255,255,0.9)"
                    class="animate__animated animate__fadeInUp right-item">
                    <div slot="header" class="attributes">
                        <b>标签</b>
                    </div>
                    <div class="tags">
                        <div class="animate__animated animate__fadeInUp tag-item" v-for="tag in tagList" :key="tag.id"
                            @click="selectTag(tag.id)" :class="tag.id === tagId ? 'activeTag' : ''">
                            <div class="sjx-outer">
                                <div class="sjx-inner"></div>
                            </div>
                            <div class="tag">
                                {{ tag.name }}
                                {{ tag.blogs.length }}
                            </div>
                        </div>
                    </div>
                    <div class="more" @click="dealTag">
                        <i v-if="moreTag" class="el-icon-arrow-down"></i>
                        <i v-else class="el-icon-arrow-up"></i>
                    </div>
                </el-card>
                <el-card style="background-color: rgba(255,255,255,0.9)"
                    class="animate__animated animate__fadeInUp right-item">
                    <div slot="header" class="attributes">
                        <span>最新推荐</span>
                    </div>
                    <div class="animate__animated animate__fadeInUp recommend-blog l-text" v-for="blog in recommendList"
                        :key="blog.id" @click="getBlogInfo(blog.id)">
                        <a>{{ blog.title }}</a>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<style scoped lang="less">
.welcome {
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    height: 90%;
    position: relative;

    .border {
        width: 912px;
        height: 112px;
        position: absolute;
        top: -6px;
        left: -6px;
        border: 3px solid white;
        box-sizing: border-box;
        animation: clipMe 5s linear infinite;
    }

    .tit {
        box-sizing: border-box;
        position: relative;
        width: 900px;
        height: 100px;
        line-height: 100px;
        box-shadow: inset 0 0 0 1px white;
        margin: 40px auto;
        margin-top: 80px;
        color: white;
        text-align: center;
        font-size: 50px;
        font-weight: normal;
        letter-spacing: 10px;
    }

    .intro {
        letter-spacing: 5px;
        line-height: 50px;
        width: 80%;
        margin: 0 auto;
        text-align: center;
        font-weight: normal;
        color: white;
    }

    .down {
        animation: bounce 2s infinite;
        animation-duration: 3s;
        font-size: 25px;
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #fff;
    }

    .down:hover {
        animation: none;
        cursor: pointer;
        box-shadow: 0 0 20px 0 white;
        transition: all .2s;
    }
}

.main-page {
    width: 70%;
    margin: 0 auto;
}

@keyframes clipMe {

    0%,
    100% {
        clip: rect(0px, 806px, 6px, 0px);
    }

    25% {
        clip: rect(0px, 6px, 112px, 0px);
    }

    50% {
        clip: rect(112px, 912px, 112px, 0px);
    }

    75% {
        clip: rect(0px, 912px, 112px, 806px);
    }
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translate(-50%, 0);
    }

    40% {
        transform: translate(-50%, -30px);
    }

    60% {
        transform: translate(-50%, -15px);
    }
}


ul {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 0;
    border-radius: 5px;
}

.el-pagination {
    padding-bottom: 20px;
}


.el-card /deep/ .el-card__body {
    padding: 0;
}


.right-item {
    margin-bottom: 20px;

    li:first-child {
        border-top: 1px solid rgba(179, 216, 255, 0.5);
    }

    li {
        border-bottom: 1px solid rgba(179, 216, 255, 0.5);
    }

    .more {
        text-align: center;
        color: #3a8ee6;
        padding: 8px;
    }

    .more:hover {
        cursor: pointer;
        color: #3a8ee6;
    }

    .blog-type:hover,
    .activeType {
        background-color: rgba(58, 142, 230, 0.3);
        cursor: pointer;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin: 15px 13px 0;
        border-bottom: 1px solid rgba(179, 216, 255, 0.5);

    }

    .tag-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 10px;
        box-sizing: border-box;

        .tag {
            background-color: #ecf5ff;
            box-sizing: border-box;
            display: inline-block;
            height: 22px;
            padding: 0 10px;
            line-height: 22px;
            font-size: 10px;
            color: #409eff;
            border-radius: 4px;
            white-space: nowrap;
            border: 1px solid #409eff;
            transition: .2s;
        }

        .sjx-outer {
            width: 0;
            height: 0;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid #409eff;
            position: relative;
            transition: .2s;
        }

        .sjx-inner {
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-right: 6px solid #ecf5ff;
            top: -6px;
            left: 1px;
            position: absolute;
            transition: .2s;
        }
    }



    .tag-item:hover,
    .activeTag {
        box-sizing: border-box;

        .tag {
            color: white;
            background-color: #409eff;
            cursor: pointer;
        }

        .sjx-inner {
            border-right: 6px solid #409eff;
        }
    }

}


.blog-type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
}

.recommend-blog {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-left: 20px;
    padding-right: 20px;

    a {
        border-bottom: 1px solid rgba(34, 36, 38, .15);
        line-height: 40px;
        display: block;
        text-decoration: none;
        color: black;
        cursor: pointer;
    }

    a:hover {
        color: #3a8ee6;
    }
}

.total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: larger;
    font-weight: bold;

    .title {
        display: flex;
        align-items: center;

        .el-icon-back {
            font-weight: bolder;
            color: #3a8ee6;
            margin-right: 10px;
        }

        .el-icon-back:hover {
            cursor: pointer;
        }
    }
}

.blog-content:hover {
    /*border-left: 5px solid #3a8ee6;*/
    /*border-right: 5px solid #3a8ee6;*/
    background-color: rgba(58, 142, 230, 0.3);
    cursor: pointer;

    .el-tag {
        color: white;
        background-color: #3a8ee6;
    }
}

.blog-content {
    padding: 10px;
    height: auto;
    border-bottom: 1px solid rgb(199, 163, 92);
    /*border-bottom: 1px solid rgba(34, 36, 38, .15);*/
    transition: .3s;


    .el-image {
        border-radius: 5px;
        box-sizing: border-box;
        flex-shrink: 0;
    }

    .blog-info {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, .4);
        font-size: 10px;

        .user-info {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-right: 15px;

            .el-avatar {
                margin-right: 5px;
                width: 22px;
                height: 22px;
            }

            .nickname {
                text-decoration: none;
                color: #3a8ee6;
                font-weight: bold;
            }
        }

        .blog-date {
            margin-right: 15px;
        }

        .blog-type {
            margin-left: auto;
        }
    }
}

.description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
}

@media screen and (max-width: 768px) {
    .blog-date {
        display: none;
    }

    .welcome {
        width: 100%;

        .border {
            display: none;
        }

        .tit {
            font-size: 2rem;
            width: 100%;
            line-height: 50px;
            letter-spacing: 2px;
            height: auto;
        }

        .intro {
            font-size: 1rem;
            line-height: 30px;
        }
    }

    .el-pagination {
        width: 100%;
    }
}
</style>
