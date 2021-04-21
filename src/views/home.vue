<template>
  <div style='width:100%;height:100%;display:flex;flex-direction:column;'>
    <el-row class='bgHeader' style="height:80px;" type='flex' align='middle'  >
      <el-col :span="3" >
        <el-row type='flex' align='middle' justify='center'>
          <i class="el-icon-user-solid" style='font-size:32px;'></i>管理员{{account}}
        </el-row>
      </el-col>
      <el-col :span="16">
        <div class='home-title' >
          中山建材管理后端
        </div>
      </el-col>
      <!-- <el-col :span="3" >
        <el-row type='flex' align='middle' justify='center' class='buttonBorder'>
          <i class="el-icon-edit" style='font-size:32px;'></i>修改密码
        </el-row>
      </el-col> -->
      <el-col :span="3"  @click="toLogin">
        <el-row type='flex' align='middle' justify='center' class='buttonBorder'>
          <img src='/@/assets/images/quit.png' class='icon32' /> 退出
        </el-row>
      </el-col>
    </el-row>
    <div class='flexR f1' >
      <div class='bgHeader w150' style='width:200px;'>
        <div class='mt' style='width:100%'>
          <menuList></menuList>
        </div>
      </div>
      <div class='bgMain f1'>
        
        
          <router-view name="content" v-slot="{ Component }">
            <transition :name="transName">
              <component :is="Component" />
            </transition>
          </router-view>
        
        
      </div>
    </div>
    
  </div>
  
</template>

<script>
  import menuList from '../components/menu/menuList.vue'

  export default{
    // data(){
    //   transName:'ss',
    // },
    // watch:{
    //   '$route' (to, from) {
        
    //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    //   }
    // },
    components:{
      menuList,
    },
    methods: {
      toLogin(){
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    },
    computed:{
      account(){
        return this.$store.state.userInfo.account
      },
      transName(){
        return this.$store.state.transName
      }
    },
    mounted(){
      let tempInfo=JSON.parse(localStorage.getItem('userInfo'))
      this.$store.commit('login',tempInfo)
    }
  }
</script>

<style lang="scss">
  .home-title{
    color: #f8f8f8 ;
    font-size:30px;
    font-weight:bold;
    text-shadow: -1px -1px 1px #000, 1px 1px 1px #fff;
  }
</style>