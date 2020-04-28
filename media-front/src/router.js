import Vue from 'vue'
import Router from 'vue-router'
import display from './views/Diplay.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: "/", redirect: '/display' },
    { path: "/login", component: () => import('./views/Login.vue')},
    {
      path: "/display", component: display, name: "home", meta: { title: '#' }, redirect: "/home", children: [
        // 二级路由
        { path: "/home", meta: { title: '首页' }, component: () => import('./views/Home.vue') },
        { path: "/meidiaAnalysis", meta: { title: '媒体分析' }, component: () => import('./components/media/MediaPage.vue') },
        // Excel
        { path: "/importexcel", meta: { title: 'Excel导入' }, component: () => import('./components/Excel/Importexcel.vue') },
        { path: "/exportexcel", meta: { title: 'Excel导出' }, component: () => import('./components/Excel/Exportexcel.vue') },
		//记者页面
		{ path: "/reporter", meta: { title: '记者画像' }, component: () => import('./components/reporter/ReporterPage.vue') },
        // nav
        { path: "/nav1", meta: { title: '导航1' }, component: () => import('./components/nav/Nva1.vue') },
        { path: "/nav2", meta: { title: '导航2' }, component: () => import('./components/nav/Nav2.vue') }
      ]
    },
    { path: "/header", component: () => import('./components/Header.vue') },
    { path: "/error", component: () => import('./views/Error.vue') },
    {
      path: "/sidebar", component: () => import('./components/Sidebar.vue')
    },

    { path: "*", redirect: "/error", hidden: true }
  ]
})



export default router
