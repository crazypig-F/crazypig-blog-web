<script setup>
import { ref, reactive, markRaw } from "vue";
import { User, Timer, Ticket, Comment, Postcard } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

// 使用路由判断当前处于那个导航
const router = useRouter();
// 导航栏
let navList = reactive([
    {
        id: 1,
        icon: markRaw(User),
        path: "/index",
        name: "首页",
    },
    {
        id: 2,
        icon: markRaw(Timer),
        path: "/timeline",
        name: "归档",
    },
    {
        id: 3,
        icon: markRaw(Comment),
        path: "/message",
        name: "留言板",
    },
    {
        id: 4,
        icon: markRaw(Ticket),
        path: "/recommand",
        name: "推荐",
    },
    {
        id: 5,
        icon: markRaw(Postcard),
        path: "/about",
        name: "关于我",
    },
]);
// 搜索内容
let searchVal = ref("");
// 搜索处理
let searchHandler = () => {
    ElMessage({
        message: "搜索服务还没开放",
        type: "warning",
    });
};
</script>

<template>
    <el-header class="header">
        <div class="logo">
            <div class="logo_name">
                <h3 class="animated fadeIn">crazypig</h3>
            </div>
        </div>
        <ul class="menu animated flipInX">
            <li v-for="(navItem, idnex) in navList" :key="idnex"
                :class="{ active: router.currentRoute.value.fullPath == navItem.path }">
                <router-link class="nav_link" :to="navItem.path">
                    <i class="icon">
                        <el-icon size="20px">
                            <component :is="navItem.icon"></component>
                        </el-icon>
                        <span>{{ navItem.name }}</span>
                    </i>
                </router-link>
            </li>
        </ul>
        <div class="search_input">
            <el-input class="input" v-model="searchVal" placeholder="Search" />
            <el-button type="primary" @click="searchHandler">搜索</el-button>
        </div>
        <div class="github">
            <a href="https://github.com" target="_blank"><img src="../../assets/img/github.png" width="40" /></a>
        </div>
    </el-header>
</template>

<style lang="less">
.header {
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;

    .logo {
        width: 100px;
        height: 100%;

        .logo_name {
            width: 100px;
            padding: 10px 0;
            border-top: 2px solid #fff;
            border-bottom: 2px solid #fff;
            margin-top: 5px;
            animation: logoBorder 1s linear;

            h3 {
                text-align: center;
                color: #ffd04b;
                animation-delay: 0.8s;
                font-size: 20px;
            }
        }
    }

    .menu {
        list-style: none;
        display: flex;
        animation-delay: 0.5s;

        .active {
            background-color: lightsalmon;
        }

        li {
            width: 80px;
            height: 30px;
            margin: 0 2px;
            border-radius: 8px;
            display: block;

            .nav_link {
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 30px;
                text-decoration: none;
                color: #fff;
                font-size: 16px;
            }

            .icon {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    padding-left: 5px;
                    font-style: normal;
                }
            }
        }

        li:hover {
            background-color: lightsalmon;
        }
    }

    .search_input {
        width: 400px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .input {
            width: 300px;
        }
    }

    .github {
        width: 40px;
        height: 40px;
        margin-right: 20px;

        a {
            display: block;
            width: 40px;
            height: 40px;
            text-decoration: none;
        }
    }
}

.header::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid #fff;
    border-top: 20px solid #fff;
    border-bottom: 10px solid transparent;
    top: 0;
    left: 5px;
}
</style>
