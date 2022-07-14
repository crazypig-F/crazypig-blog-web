<script setup>
import { ref, reactive, markRaw } from 'vue'
import { User, EditPen, Ticket, Comment, Postcard } from '@element-plus/icons-vue'
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'
import axios from 'axios'
// 用户信息
let loadUserInfo = () => {
    const internalInstance = getCurrentInstance()
    const internalData = internalInstance.appContext.config.globalProperties
    const user = internalData.$cookies.get('userInfo')
    if (user != null)
        return reactive(
            user
        )
    else return reactive({
        nickName: '',
        avatar: '',
        administrator: false,
        logined: false
    })
}

let userInfo = loadUserInfo()
let userInfoReset = () => {
    userInfo.avatar = ''
    userInfo.nickName = ''
    userInfo.administrator = false
    userInfo.logined = false
}

// 使用路由判断当前处于那个导航
const router = useRouter();
// 导航栏
let navList = reactive(
    [{
        id: 1,
        icon: markRaw(User),
        path: "/index",
        name: "首页"
    },
    {
        id: 2,
        icon: markRaw(EditPen),
        path: "/essay",
        name: "随笔"
    },
    {
        id: 3,
        icon: markRaw(Ticket),
        path: "/project",
        name: "项目"
    },
    {
        id: 4,
        icon: markRaw(Comment),
        path: "/comment",
        name: "留言"
    },
    {
        id: 5,
        icon: markRaw(Postcard),
        path: "/about",
        name: "关于我"
    }]
)
// 搜索内容
let searchVal = ref("")
// 搜索处理
let searchHandler = () => {
    ElMessage({
        message: "搜索服务还没开放",
        type: 'warning',
    })
}

// 表单数据绑定对象
let loginForm = reactive({
    userName: '',
    password: ''
})

let loginFormReset = () => {
    loginForm.userName = ''
    loginForm.password = ''
}
// 表单验证规则对象
let loginFormRules = reactive({
    // 验证用户是否合法
    userName: [
        // 必填，提示消息，鼠标焦点消失时触发
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 15, message: "长度在3-15个字符之间" }
    ],
    // 验证密码是否合法
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ]
})

// 注册表单数据绑定对象
let registerForm = reactive({
    nickName: '',
    userName: '',
    password: '',
    email: '',
    avatar: ''
})
let imageUrlVal = ref(null)
let registerFormReset = () => {
    registerForm.nickName = ''
    registerForm.userName = ''
    registerForm.password = ''
    registerForm.email = ''
    registerForm.avatar = ''
    imageUrlVal.value = null
}
// 注册表单验证规则对象
let registerFormRules = reactive({
    // 验证用户是否合法
    userName: [
        // 必填，提示消息，鼠标焦点消失时触发
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 15, message: "长度在3-15个字符之间" }
    ],
    // 验证用户是否合法
    nickName: [
        // 必填，提示消息，鼠标焦点消失时触发
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 3, max: 15, message: "长度在3-15个字符之间" }
    ],
    // 验证密码是否合法
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ],

    email: [
        { required: true, message: "请输入邮箱", trigger: "blur" },
    ],

    avatar: [
        { required: true, message: "请上传头像", trigger: "blur" },
    ],
})
// 登陆注册 弹出框控制
let loginVisible = ref(false)
let registerVisible = ref(false)
// 登录操作
let showLogin = () => {
    loginVisible.value = true
}
let loginClose = () => {
    loginFormReset()
    loginVisible.value = false
}
let resetLoginForm = () => {
    loginClose()
}
let userLogin = () => {
    axios.post("http://127.0.0.1:8000/api/v1/user/login", loginForm).then((res) => {
        if (res.data.status === 200) {
            if ($cookies.isKey("userInfo")) {
                $cookies.remove("userInfo")
            }
            userInfo.nickName = res.data.data.user.nickName
            userInfo.avatar = res.data.data.user.avatar
            userInfo.administrator = res.data.data.user.administrator
            userInfo.logined = true
            // 设置cookies的日期为一天
            $cookies.config("1d")
            // 设置cookies
            $cookies.set("userInfo", userInfo);
            ElMessage({
                message: '登录成功',
                type: 'success',
            })
            loginClose()
        } else {
            ElMessage({
                message: '用户名密码错误，请重新登录',
                type: 'error',
            })
        }
    }).catch((error) => {
        ElMessage({
            message: error.code,
            type: 'error',
        })
    })
}
// 注册操作
let registerDisabled = ref(true) //注册按钮状态
let showRegister = () => {
    registerVisible.value = true
}
let registerClose = () => {
    registerFormReset()
    // 注册按钮禁用
    registerDisabled.value = true
    registerVisible.value = false
}
let resetRegisterForm = () => {
    registerClose()
}
let userRegister = () => {
    axios.post("http://127.0.0.1:8000/api/v1/user/register", registerForm).then((res) => {
        if (res.data.status === 200) {
            ElMessage({
                message: '注册成功',
                type: 'success',
            })
            registerClose()
        } else {
            ElMessage({
                message: '输入内容有误，请检查并重新输入',
                type: 'error',
            })
        }
    }).catch((error) => {
        ElMessage({
            message: error.code,
            type: 'error',
        })
    })
}
let handleAvatarSuccess = (response, uploadFile) => {
    registerForm.avatar = response.url
    registerDisabled.value = false
    imageUrlVal.value = URL.createObjectURL(uploadFile.raw)
}
let beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG or PNG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

// 前往管理系统
let admin = () => {
    router.push('/login')
}
// 退出操作
let logout = () => {
    if ($cookies.isKey("userInfo")) {
        $cookies.remove("userInfo")
    }
    userInfoReset()
}
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
                <router-link class="nav_link" :to=navItem.path>
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
        <div class="right">
            <div class="github">
                <a href="https://github.com" target="_blank"><img src="../../assets/img/github.png" width="40"></a>
            </div>
            <div v-if="!userInfo.logined" style="margin-right: 50px">
                <el-button size="small" effect="light" type="primary" @click="showLogin">登录</el-button>
                <el-button size="small" effect="light" type="warning" @click="showRegister">注册</el-button>
            </div>
            <div v-else class="loginInfo">
                <el-avatar class="avatar" :src="userInfo.avatar"></el-avatar>
                <h3 class="nickName">{{ userInfo.nickName }}</h3>
                <el-button v-if="userInfo.administrator" size="small" effect="light" type="primary" @click="admin">管理博客
                </el-button>
                <el-button size="small" effect="light" type="warning" @click="logout">退出</el-button>
            </div>
        </div>
    </el-header>
    <el-dialog v-model="loginVisible" title="请登录" width="400px" center @close="loginClose">
        <el-form :model="loginForm" :rules="loginFormRules" label-width="60px">
            <!--用户名-->
            <el-form-item prop="userName" label="账号">
                <el-input v-model="loginForm.userName">
                </el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button @click="resetLoginForm">取消</el-button>
                <el-button type="primary" @click="userLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog v-model="registerVisible" title="请注册" @close="registerClose" width="400px" center>
        <el-form :model="registerForm" :rules="registerFormRules" label-width="80px" label-position="left">
            <!--昵称-->
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="registerForm.nickName"></el-input>
            </el-form-item>
            <!--用户名-->
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="registerForm.userName"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password"></el-input>
            </el-form-item>
            <!--密码-->
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <!--头像-->
            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="http://127.0.0.1:8000/api/v1/upload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrlVal" :src="imageUrlVal" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetRegisterForm">取消</el-button>
                <el-button type="primary" @click="userRegister" :disabled="registerDisabled">注册</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<style lang="less">
.header {
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, .5);
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
        width: 300px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .input {
            width: 200px;
        }
    }

    .right {
        min-width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;

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

        .loginInfo {
            flex-shrink: 0;
            /*background-color: #545c64;*/
            color: white;
            height: 60px;
            border: none;
            width: 260px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            .avatar {
                margin-right: 8px;
            }

            .avatar:hover {
                cursor: pointer;

                +.nickName {
                    visibility: visible;
                    opacity: 1;
                    transition: opacity .4s;
                }
            }

            .nickName {
                position: absolute;
                top: 60px;
                width: 150px;
                left: 40%;
                transform: translate(-50%, 0);
                font-size: 14px;
                text-align: center;
                line-height: 30px;
                background-color: #fff;
                visibility: hidden;
                opacity: 0;
                color: #333;
                box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
                border: 1px solid #eee;
                border-radius: 5px;
            }
        }
    }
}

.header::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid #fff;
    border-top: 20px solid #fff;
    border-bottom: 10px solid transparent;
    top: 0;
    left: 5px;
}

.avatar-uploader {
    width: 78px;
    height: 78px;
    display: block;
    border: 1px dashed lightblue;
    border-radius: 6px;
    cursor: pointer;

    avatar {
        width: 78px;
        height: 78px;
        display: block;
    }
}

.avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    text-align: center;
}
</style>
