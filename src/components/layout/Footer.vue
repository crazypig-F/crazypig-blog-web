<template>
    <div class="bottombar">
        <span class="bottom__year">© 2022</span>
        <span class="bottom__name">
            <el-icon size="20px">
                <Sunny />
            </el-icon>
            <span>CrazyPig</span>
            <el-icon size="20px">
                <Sunny />
            </el-icon>
        </span>
        <span class="bottom__beian">
            <a href="http://www.beian.miit.gov.cn/">浙ICP备20018492号</a>
        </span>
    </div>
</template>

<style>

.bottombar {
    width: 100%;
    height: 60px;
    background-color: rgba(0, 0, 0, .95);
    text-align: center;
    color: #e1e1e1;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    bottom: 0;
}

.bottom__year {
    padding: 0 20px;
}

.bottom__name {
    padding: 0 20px;
    border-left: 2px solid #fff;
    border-right: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.bottom__name i {
    color: #FFBD87;
    padding: 0 5px;
}

.bottom__beian {
    padding: 0 20px;
}

.bottom__beian a {
    color: #e1e1e1;
    text-decoration: none;
}

.bottom__beian a:hover {
    color: #fff;
}
</style>
