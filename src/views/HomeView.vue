<script setup>
import { ref, reactive } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const adminInfo = JSON.parse(window.localStorage.getItem("admin"));
let menulist = reactive([
    { id: 0, path: "/admin/index", authName: "后台首页" },
    { id: 1, path: "/admin/blog", authName: "博客管理" },
    { id: 2, path: "/admin/user", authName: "用户管理" },
    { id: 3, path: "/admin/blog-input", authName: "撰写博客" },
    { id: 4, path: "/admin/type", authName: "分类管理" },
    { id: 5, path: "/admin/tag", authName: "标签管理" },
    { id: 6, path: "/admin/administrator", authName: "个人中心" },
]);
let isCollapse = ref(false);
// 被激活的动态地址
let activePath = ref("");

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};

let logout = () => {
    window.localStorage.removeItem('admin')
    router.push("/login")
}
</script>
<template>
    <el-container style="width: 100%; max-width: 100%">
        <el-aside :width="calculateStyle + 'px'">
            <el-menu :default-active="activePath" class="el-menu-vertical-demo" unique-opened :collapse="isCollapse"
                :collapse-transition="false" router active-text-color="#409FFF">
                <!--            一级菜单-->
                <el-menu-item :index="item.path" v-for="item in menulist" :key="item.id">
                    <span>{{ item.authName }}</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <div style="width: 100%">
            <el-header>
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <div>
                    <span>博客后台管理系统</span>
                </div>
                <div class="loginInfo">
                    <el-avatar :src="adminInfo.avatar"></el-avatar>
                    <div class="user-option">
                        <h3 class="web-font nickname">{{ adminInfo.nickName }}</h3>
                        <p class="logout" @click="logout">退出登录</p>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </div>
    </el-container>
</template>

<style lang="less" scoped>
.el-header {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid #d8dce5;
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;
    }

    img {
        height: 40px;
    }

    span {
        margin-left: 15px;
    }
}

.el-aside {
    transition: 1s;
    background-color: #333744;
    color: #304156;
    text-align: center;
    line-height: 200px;
    min-height: 100vh;
    /*默认有边框，会使右边对不齐，要去掉边框*/

    .el-menu {
        border: none;
        background-color: #333744;

        .el-menu-item {
            color: white;
            background-color: #333744;
        }

        .el-menu-item:hover {
            background-color: #222222;
        }
    }
}

.el-main {
    background-color: #f0f2f5;
    color: #333;
    text-align: center;
    min-height: 100vh;
}

.iconfont {
    margin-right: 10px;
}

.toggle-button {
    line-height: 20px;
    font-size: 10px;
    color: black;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}

.loginInfo {
    flex-shrink: 0;
    color: white;
    height: 60px;
    border: none;
    width: 160px;
    position: relative;

    .el-avatar {
        width: 36px;
        height: 36px;
        margin: 0 auto;
        z-index: 3000;
    }

    .user-option {
        position: absolute;
        top: 60px;
        width: 150px;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        background-color: #fff;
        opacity: 0;
        visibility: hidden;
        color: #333;
        box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
        border: 1px solid #eee;
        border-radius: 5px;
        z-index: 2000;
    }

    .logout {
        margin: 10px auto;
        padding: 0;
        width: 100%;
    }

    .logout:hover {
        background-color: #eee;
    }
}

.loginInfo:hover {
    cursor: pointer;

    .el-avatar {
        transform: translate(0, 50%) scale(1.5);
        transition: 0.3s;
    }

    .user-option {
        visibility: visible;
        opacity: 1;
        transition: 0.4s;
    }
}

@media screen and (max-width: 768px) {
    .el-aside {
        position: absolute;
        z-index: 2000;
        top: 60px;
        transition: all 0.2s;
        width: 100%;
        min-height: 0;
        background-color: transparent;

        ::-webkit-scrollbar {
            width: 0;
        }

        .el-menu {
            width: 100%;
            display: flex;
            height: auto;
            background-color: white;

            .el-menu-item {
                color: #303133;
                background-color: white;
            }
        }
    }

    .el-main {
        padding-top: 80px;
    }
}
</style>
