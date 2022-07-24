import { createApp } from 'vue'
import App from './App.vue'

import "./assets/css/reset.css"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import VueMarkdownEditor from '@kangc/v-md-editor';
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import 'animate.css/animate.min.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store'
import VueCookies from 'vue-cookies'


import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
}, createHighlightLinesPlugin());


const app = createApp(App)
app.config.globalProperties.$cookies = VueCookies
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus).use(VueCookies).use(VueMarkdownEditor).use(store)


app.mount('#app')


