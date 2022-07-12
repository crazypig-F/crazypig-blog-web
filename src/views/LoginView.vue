<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import { useCookies } from "vue3-cookies";
import { useRouter } from 'vue-router';
const { cookies } = useCookies();
const router = useRouter();
let waiting = ref(false)
let account = ref("")
let password = ref("")

let loginHandle = () => {
  console.log(account, password);
  if (account.value === "" || password.value === "") {
    ElMessage("请填写用户名和密码")
    return;
  }
  // 向后端发送登录参数
  waiting.value = true;
  // axios.post(url, loginParma).then(xxx).catch(xxx)
  // 使用setTimeout进行模拟
  let loginParma = {
    account: account.value,
    password: password.value,
  }
  setTimeout(() => {
    let expireTime = 1000 * 60 * 60 * 24; // 一天
    cookies.set("vue-session", "token_header." + account.value, expireTime)
    waiting.value = false;
    router.push("/admin")
  }, 1000)
}
</script>
<template>
  <div class="login-view">
    <!-- <component is="link" rel="stylesheet" href="https://fastly.jsdelivr.net/npm/@fortawesome/fontawesome-free@6/css/all.min.css"></component>
    <component is="script" src="https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js"></component> -->
    <div class="login" id="login" v-loading="waiting">
      <!-- 背景图 -->
      <div class="log-bg">
        <div class="log-cloud cloud1"></div>
        <div class="log-cloud cloud2"></div>
        <div class="log-cloud cloud3"></div>
        <div class="log-cloud cloud4"></div>

        <div class="log-logo">Welcome!</div>
        <div class="log-text">crazypig blog后台登录页面</div>
      </div>
      <!-- 输入区 -->
      <div class="log-email">
        <input type="text" placeholder="Email" :class="'log-input' + (account == '' ? ' log-input-empty' : '')"
          v-model="account">
        <input type="password" placeholder="Password" :class="'log-input' + (password == '' ? ' log-input-empty' : '')"
          v-model="password">
        <a href="javascript:;" class="log-btn" @click="loginHandle()">Login</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/img/bg-page.jpg);
  background-size: cover;
}

.login {
  position: fixed;
  overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -350px;
  width: 500px;
  min-height: 555px;
  z-index: 10;
  right: 140px;
  background: #fff;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  -webkit-box-shadow: 0px 3px 16px -5px #070707;
  box-shadow: 0px 3px 16px -5px #070707
}

.log-close {
  display: block;
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 1;
}

.log-close:hover .icons {
  transform: rotate(180deg);
}

.log-close .icons {
  opacity: 1;
  transition: all .3s
}

.log-cloud {
  background-image: url(../assets/img/login-cloud.png);
  width: 63px;
  height: 40px;
  position: absolute;
  z-index: 1
}

.login .cloud1 {
  top: 21px;
  left: -30px;
  transform: scale(.6);
  animation: cloud1 20s linear infinite;
}

.login .cloud2 {
  top: 87px;
  right: 20px;
  animation: cloud2 19s linear infinite;
}

.login .cloud3 {
  top: 160px;
  left: 5px;
  transform: scale(.8);
  animation: cloud3 21s linear infinite;
}

.login .cloud4 {
  top: 150px;
  left: -40px;
  transform: scale(.4);
  animation: cloud4 19s linear infinite;
}

.log-bg {
  background: url(../assets/img/login-bg3.jpg);
  background-size: cover;
  width: 100%;
  height: 312px;
  overflow: hidden;
}

.log-logo {
  height: 80px;
  margin: 120px auto 25px;
  text-align: center;
  color: #ffeb73
    /* #1fcab3 */
  ;
  font-weight: bold;
  font-size: 40px;
}

.log-text {
  color: #57d4c3;
  font-size: 13px;
  text-align: center;
  margin: 0 auto;
}

.log-logo,
.log-text {
  z-index: 2
}

.icons {
  background: url(../assets/img/icons.png) no-repeat;
  display: inline-block;
}

.close {
  height: 16px;
  width: 16px;
  background-position: -13px 0;
}

.login-email {
  height: 17px;
  width: 29px;
  background-position: -117px 0;
}

.log-btns {
  padding: 15px 0;
  margin: 0 auto;
}

.log-btn {
  width: 402px;
  display: block;
  text-align: left;
  line-height: 50px;
  margin: 0 auto 15px;
  height: 50px;
  color: #fff;
  font-size: 13px;
  -webkit-border-radius: 5px;
  background-color: #3B5999;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
  position: relative;
}

.log-btn.tw {
  background-color: #13B4E9
}

.log-btn.email {
  background-color: #50E3CE
}

.log-btn:hover,
.log-btn:focus {
  color: #fff;
  opacity: .8;
}

.log-email {
  text-align: center;
  margin-top: 20px;
}

.log-email .log-btn {
  background-color: #50E3CE;
  text-align: center;
}

.log-input-empty {
  border: 1px solid #f37474 !important;
}

.isloading {
  background: #d6d6d6
}

.log-btn .icons {
  margin-left: 30px;
  vertical-align: middle;
}

.log-btn .text {
  left: 95px;
  line-height: 50px;
  text-align: left;
  position: absolute;
}

.log-input {
  width: 370px;
  overflow: hidden;
  padding: 0 15px;
  font-size: 13px;
  border: 1px solid #EBEBEB;
  margin: 0 auto 15px;
  height: 48px;
  line-height: 48px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
  border-radius: 5px;
}

.log-input.warn {
  border: 1px solid #f88787
}

@-webkit-keyframes cloud1 {
  0% {
    left: 200px
  }

  100% {
    left: -130px;
  }
}

@keyframes cloud1 {
  0% {
    left: 200px
  }

  100% {
    left: -130px;
  }
}

@-webkit-keyframes cloud2 {
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@keyframes cloud2 {
  0% {
    left: 500px;
  }

  100% {
    left: -90px;
  }
}

@-webkit-keyframes cloud3 {
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud3 {
  0% {
    left: 620px;
  }

  100% {
    left: -70px;
  }
}

@-webkit-keyframes cloud4 {
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}

@keyframes cloud4 {
  0% {
    left: 100px;
  }

  100% {
    left: -70px;
  }
}
</style>