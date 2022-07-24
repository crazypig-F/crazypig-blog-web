<script setup>
import { reactive, onMounted, onUpdated } from 'vue'
import Header from "../components/layout/Header.vue"
import Footer from "../components/layout/Footer.vue"
const data = reactive({
    imgList: [],
    imgRefs: []
})

const setImgRef = (el) => {
    data.imgRefs.push(el)
}

const changebg = () => {
    let idx = 0
    window.setInterval(() => {
        idx++
        if (idx === data.imgRefs.length) idx = 0
        if (idx === 0) data.imgRefs[data.imgRefs.length - 1].classList.remove("active")
        else data.imgRefs[idx - 1].classList.remove("active")
        data.imgRefs[idx].classList.add("active")
    }, 20000)
}

onMounted(() => {
    for (let index = 1; index <= 11; index++) {
        data.imgList.push({
            backgroundImage: `url(http://asaki-m.com/oldblog/indexBg/${index}.jpg)`,
            opacity: 0,
        })
    }
    data.imgList[0].opacity = 1
    window.setTimeout(() => {
        data.imgList[0].opacity = 0
    }, 20000)
    changebg()
})

</script>

<template>
    <div class="bg" v-for="(img, index) in data.imgList" :key="img.backgroundImage" :style="img" :ref="setImgRef"></div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>

<style scoped>
.bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: -999;
    background-image: url(http://asaki-m.com/oldblog/indexBg/1.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
}

.bg.active {
    animation: show 5s;
    animation-fill-mode: forwards;
}

@keyframes show {
    from {
        opacity: 0.6;
    }

    to {
        opacity: 1;
        display: block;
    }
}
</style>
