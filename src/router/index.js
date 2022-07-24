// 导入 router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/error',
        name: 'error',
        component: () => import('../components/Error.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/',
        component: () => import("../views/IndexView.vue"),
        redirect: '/index',
        children: [
            { path: '/index', component: () => import("../components/Index.vue") },
            { path: '/about', component: () => import("../components/About.vue") },
            { path: '/article/:id', component: () => import("../components/Article.vue") },
        ]
    },
    {
        path: '/admin',
        component: () => import('../views/HomeView.vue'),
        // 挂载路由导航守卫
        beforeEnter: (to, from, next) => {
            // to 将要访问的路径
            // from 代表从哪个路径跳转而来
            // next 是一个函数，表示放行
            // next() 放行  next('login') 强制跳转
            const adminInfo = JSON.parse(window.localStorage.getItem('admin'))
            if (!adminInfo) return next('/error')
            else {
                const administrator = adminInfo.administrator
                if (!administrator) return next('/error')
                next()
            }
        },
        redirect: '/admin/index',
        children: [
            { path: '/admin/index', component: () => import('../components/admin/Index.vue') },
            { path: '/admin/blog', component: () => import('../components/admin/Blog.vue') },
            { path: '/admin/blog-input', component: () => import('../components/admin/BlogInput.vue') },
            { path: '/admin/administrator', component: () => import('../components/admin/Administrator.vue') },
            { path: '/admin/type', component: () => import('../components/admin/type/Type.vue') },
            { path: '/admin/tag', component: () => import('../components/admin/tag/Tag.vue') },
            { path: '/admin/user', component: () => import('../components/admin/User.vue') },
        ]
    }
]

// 配置router对象
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
