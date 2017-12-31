import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'print-page',
      component: require('@/components/PrintPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/form',
      name: 'form-page',
      component: require('@/components/FormPage').default
    }
  ]
})
