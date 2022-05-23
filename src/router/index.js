import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/AboutView.vue')
  },
  {
    path: '/about/operationalstructure',
    name: 'operationalstructure',
    component: () => import('../views/about/OperationalView.vue')
  },
  {
    path: '/about/executiveboard',
    name: 'executiveboard',
    component: () => import('../views/about/BoardView.vue')
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/news/NewsView.vue')
  },
  {
    path: '/news/:newsId',
    name: 'newscontent',
    component: () => import('../views/news/NewsContentView.vue')
  },
  // {
  //   path: '/news/news1',
  //   name: 'news1',
  //   component: () => import('../views/news/contents/News1View.vue')
  // },
  // {
  //   path: '/news/news2',
  //   name: 'news2',
  //   component: () => import('../views/news/contents/News2View.vue')
  // },
  // {
  //   path: '/news/news3',
  //   name: 'news3',
  //   component: () => import('../views/news/contents/News3View.vue')
  // },
  {
    path: '/news/videos',
    name: 'videos',
    component: () => import('../views/news/VideosView.vue')
  },
  {
    path: '/news/publication',
    name: 'publication',
    component: () => import('../views/news/PublicationView.vue')
  },
  {
    path: '/casestudies',
    name: 'casestudies',
    component: () => import('../views/case-studies/CasestudiesView.vue')
  },
  {
    path: '/casestudies/:caseID',
    name: 'case',
    component: () => import('../views/case-studies/CaseView.vue')
  },
  // {
  //   path: '/casestudies/case1',
  //   name: 'case1',
  //   component: () => import('../views/case-studies/Case1View.vue')
  // },
  // {
  //   path: '/casestudies/case2',
  //   name: 'case2',
  //   component: () => import('../views/case-studies/Case2View.vue')S
  // },
  // {
  //   path: '/casestudies/case3',
  //   name: 'case3',
  //   component: () => import('../views/case-studies/Case3View.vue')
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/developers',
    name: 'developers',
    component: () => import('../views/DevelopersView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),

  routes
})

export default router
