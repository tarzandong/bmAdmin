import { createStore } from 'vuex'

const store = createStore({
  state: {
    msg:'by Tarzan',

    fullHeight:0,
    fullWidth:0,

    baseUrl:'http://203.135.96.136:8860/',

    menu:[
      // {title:'首页',icon:'el-icon-s-home'},
      {
        title:'商品管理',icon:'el-icon-sell',
        children:[{title:'商品分类',path:'/category'},{title:'品牌管理',path:'/brand'},{title:'商品发布',path:'/commodity'}]
      },
      {
        title:'客户订单',icon:'el-icon-s-order',
        children:[{title:'客户',path:'/customer'},{title:'订单',path:'/order'}]
      },
      {
        title:'运维管理',icon:'el-icon-s-tools',
        children:[{title:'运维人员',path:'/mantainer'},{title:'系统常量',path:'/const'}]
      },
    ],

    goodsType:['水泥','瓷砖','钢材'],

    

    userInfo:{},
    hasLogin:false,
  },
  getters: {

  },
  mutations: {
    shrinkMenu(state){
      state.menu.map((item)=>{
        item.extend=false
        return item
      })
    },
    setFW(state,i){
			state.fullWidth=i
		},
		setFH(state,i){
			state.fullHeight=i
    },
    login(state,provider){
      state.userInfo=provider
      // console.log(state.userInfo)
      state.hasLogin=true
      localStorage.setItem('userInfo',JSON.stringify(provider))
    },
    logout(state){
      let tempInfo=JSON.parse(localStorage.getItem('userInfo')) 
      tempInfo.token=''
      localStorage.setItem('userInfo',JSON.stringify(tempInfo))
    }
  },
  actions: {

  },
  modules: {

  }
})

export default store