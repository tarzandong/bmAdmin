import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/@/views/home.vue'
import HelloWorld from '/@/components/HelloWorld.vue'
import login from '/@/views/login.vue'
import category from '/@/views/merchandise/category.vue'
import commodity from '/@/views/merchandise/commodity.vue'
import brand from '/@/views/merchandise/brand.vue'
import order from '/@/views/customerOrder/order.vue'
import constValue from '/@/views/setting/constValue.vue'
import mantainer from '/@/views/setting/mantainer.vue'
import customer from '/@/views/customerOrder/customer.vue'
import utils from '/@/utils/utils.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      components:{
        master: login
      },
      
      meta:{
        title:'管理员/客服 登录'
      }
    },
    {
      path:'/home',
      components:{
        master: Home
      },
      
      meta:{
        title:'中山建材后台管理系统'
      },
      children:[
        {
          path:'/category',
          components:{
            content: category
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/commodity',
          components:{
            content: commodity
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/brand',
          components:{
            content: brand
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/order',
          components:{
            content: order
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/const',
          components:{
            content: constValue
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/mantainer',
          components:{
            content: mantainer
          },
          meta:{
            keepAlive:false
          },
        },

        {
          path:'/customer',
          components:{
            content: customer
          },
          meta:{
            keepAlive:false
          },
        }
        
      ]
    },
    
  ]
})

router.beforeEach((to,from,next)=>{
  console.log(to.path)
  if (to.path=='/login'){
    // console.log(utils.lsAvailable)
    if (utils.lsAvailable()){
      next('/home')
    }
    else next()
  }
  else next()
})
export default router