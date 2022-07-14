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
            { path: '/blogInfo', component: () => import("../components/Article.vue") },
            { path: '/project', component: () => import("../components/Project.vue") },
            { path: '/comment', component: () => import("../components/Comment.vue") },
            { path: '/essay', component: () => import("../components/Essay.vue") },
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
            const adminInfo = JSON.parse(window.sessionStorage.getItem('admin'))
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
            { path: '/admin/type', component: () => import('../components/admin/Type.vue') },
            { path: '/admin/tag', component: () => import('../components/admin/Tag.vue') },
            { path: '/admin/comment', component: () => import('../components/admin/Comment.vue') },
            { path: '/admin/essay', component: () => import('../components/admin/Essay.vue') },
            { path: '/admin/project', component: () => import('../components/admin/Project.vue') },
            { path: '/admin/user', component: () => import('../components/admin/User.vue') },
            { path: '/admin/picture', component: () => import('../components/admin/Picture.vue') }
        ]
    }
]

// 配置router对象
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router
