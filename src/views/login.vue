<template>
  <div class="bg flexC">
    <el-space direction="vertical">
      <h2>中山建材管理中心</h2>
      <el-card class="box-card" style="waccountth: 350px;">
        <el-space direction="vertical" :size='20' class='pt'>
          <el-input v-model="body.account" placeholder='请输入账户名' class='w300'>
            <template #prepend>账户：</template>
          </el-input>
          <el-input v-model="password" placeholder='请输入密码' show-password  class='w300'>
            <template #prepend>密码：</template>
          </el-input>
          <el-row class='w200'>
            <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-row>
          <!-- <el-row class='w200' type="flex" justify="space-between">
            <el-radio v-model="body.userType" label="0">管理员</el-radio>
            <el-radio v-model="body.userType" label="1">客服</el-radio>
          </el-row> -->
          <el-button type="primary" round @click='test'>登录</el-button>
        </el-space>
        
      </el-card>
    </el-space>
    
  </div>
</template>

<script>
  import {getCurrentInstance, defineComponent, ref} from 'vue'
  import {useRouter} from "vue-router"
  import {useStore} from 'vuex'
  import md5 from 'js-md5'
  import request from '/@/network/request.js'
  import { ElMessage } from 'element-plus'
  // import {check} from '/@/utils/utils.js'

  export default defineComponent ({
    setup(props,context) {
      const store = useStore();
      const router=useRouter();
      const body=ref({account:'',password:'',userType:'AU'})
      const password=ref('')
      const checked=ref(false)
      let userInfo=JSON.parse(localStorage.getItem('userInfo')) 
      if ( userInfo && userInfo.rememmber) {
        console.log('checked')
        body.value.account=userInfo.account
        password.value=window.atob(userInfo.password)
        checked.value=true
      }
      const test=()=>{
        body.value.password=md5(password.value)
        request.post('/build/admin/adminUser/login',body.value).then((data)=>{
          console.log(data)
          if (checked.value){
            data.password=window.btoa(password.value)
            data.rememmber=true
          }
          else {
            // console.log(checked)
            data.rememmber=false
            data.password=''
          } 
          
          data.account=body.value.account
          data.logTime=Date.now(),
          store.commit('login',data)
          router.replace('/home').then(()=>{
            ElMessage.success('登录成功')
          })
        })
      }
      return {
        password,
        body,
        test,
        checked
        }
    },
  })
  
</script>


<style lang="scss">
  
</style>