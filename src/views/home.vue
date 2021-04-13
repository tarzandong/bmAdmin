<template>
  <div style='width:100%;height:100%;display:block;'>
    <el-row class='bgHeader' style="height:80px;" type='flex' align='middle'  >
      <el-col :span="3" >
        <el-row type='flex' align='middle' justify='center'>
          <i class="el-icon-user-solid" style='font-size:32px;'></i>管理员
        </el-row>
      </el-col>
      <el-col :span="13"></el-col>
      <el-col :span="3" >
        <el-row type='flex' align='middle' justify='center' class='buttonBorder'>
          <i class="el-icon-edit" style='font-size:32px;'></i>修改密码
        </el-row>
      </el-col>
      <el-col :span="3" :offset='1' @click="toLogin">
        <el-row type='flex' align='middle' justify='center' class='buttonBorder'>
          <img src='/@/assets/images/quit.png' class='icon32' /> 退出
        </el-row>
      </el-col>
    </el-row>
    <div class='flexR' :style="'height:'+($store.state.fullHeight-80)+'px;' ">
      <div class='bgHeader w150 flexR' style='width:200px;'>
        <div class='mt' style='width:100%'>
          <menuList></menuList>
        </div>
      </div>
      <div class='bgMain f1'>
        <div class="whitePage">
          <router-view name="content"></router-view>
        </div>
      </div>
    </div>
    
  </div>
  
</template>

<script>
  import menuList from '../components/menu/menuList.vue'

  export default{
    components:{
      menuList,
    },
    methods: {
      toLogin(){
        this.$store.commit('logout')
        this.$router.push('/login')
      }
    },
    mounted(){
      let tempInfo=JSON.parse(localStorage.getItem('userInfo'))
      this.$store.commit('login',tempInfo)
    }
  }
</script>

<style lang="scss">
  
</style>