<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">客户列表</div>
      </el-col>
    </el-row>

    <el-row class='mt' type='flex' align='bottom'>
      <el-col :span='5' :offset='1'>
        <el-input v-model="body.phone" placeholder='请输入用户手机号' >
          <template #prepend>手机号：</template>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-row  >
          <el-col :span="10">
            <el-button icon="el-icon-search" type='success' circle @click="getList"></el-button>
          </el-col>
          <el-col :span="8" style="line-height:40px;">搜索</el-col>
          
        </el-row>
        
      </el-col>
    </el-row>
    <div class='mt' v-if='result'>
      <el-table
        :data="result.targetList"
        stripe
        style="width: 100%"
        header-row-class-name='tableHead'
        class='pl'>
        <el-table-column
          prop="nickName"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号" >
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="注册时间">
        </el-table-column>
      </el-table> 
    </div>
    <div  v-else>
        <loading-view></loading-view>
    </div>

    <div class='mt'>
      <el-pagination v-if='result'
      @size-change="sizeChange"
      @current-change="pageChange"
      v-model:currentPage="result.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="result.pageSize"
        layout="total,prev, pager, next,sizes"
        :total="result.sumCount">
      </el-pagination>
    </div>    
    
    
  </div> 
</template>

<script>

import useCrus from '/@/mixin/useCrus.js'
import {toRefs,defineComponent, reactive} from 'vue'
import loadingView from '../../components/loading/loading.vue'
// import {useStore} from 'vuex'

export default defineComponent({
  components: { loadingView },
  setup(){
    const state=reactive(useCrus()) 
    // console.log(useStore().state)
    // state.deleteItem='userName'
    state.urls.s='/build/admin/user/list'
    // state.urls.c='/build/admin/adminUser/add'
    // state.urls.r='/build/admin/adminUser/delete'
    // state.urls.u='/build/admin/adminUser/update'
    state.body.zoneCode='86'
    
    state.getList()
    return {
      ...toRefs(state)
    }
  }
}) 

</script>