<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">管理员列表</div>
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
          prop="userName"
          label="名称"
          width="180" >
        </el-table-column>
        <el-table-column
          label="是否有效"
          width="180" >
          <template #default="scope" >
            <span class='textH'>{{scope.row.status==1? '是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="180" >
        </el-table-column>
                
        <el-table-column label="操作" align='center'>
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </div>
    <div  v-else>
        <loading-view></loading-view>
    </div>
        
    <el-row>
      <el-col :span='2' :offset='1'>
        <el-button type="warning" round @click='createVisible = true'>增加管理员</el-button>
      </el-col>
    </el-row>

    <el-dialog
    title="增加管理员"
    v-model="createVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="createBody.userName" placeholder='请输入名称' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        
        <el-input v-model="createBody.password" placeholder='请输入密码' show-password class='w300 mt'>
          <template #prepend>密码：</template>
        </el-input>

        
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    title="修改密码"
    v-model="updateVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="updateBody.userName" class='w300' disabled>
          <template #prepend>名称：</template>
        </el-input>
        
        

        <el-input v-model="updateBody.password" show-password placeholder="请输入新密码"  class='w300 mt'>
          <template #prepend>新密码：</template>
        </el-input>

        
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    
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
    state.deleteItem='userName'
    state.urls.s='/build/admin/adminUser/list'
    state.urls.c='/build/admin/adminUser/add'
    state.urls.r='/build/admin/adminUser/delete'
    state.urls.u='/build/admin/adminUser/update'
    state.getList()
    return {
      ...toRefs(state)
    }
  }
}) 

</script>