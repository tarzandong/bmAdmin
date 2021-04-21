<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">商品类别列表</div>
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
          prop="name"
          label="类别名"
          width="180" >
        </el-table-column>
        <el-table-column
          label="是否上架"
          align='center'
          width="180" >
          <template #default="scope">
            <span>{{scope.row.isPut? '是':'否'}}</span>
          </template>  
        </el-table-column>
        <el-table-column
          align='center'
          label="是否置顶"
          width="180" >
          <template #default="scope">
            <span>{{scope.row.isTop? '是':'否'}}</span>
          </template>  
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注" 
          align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center'>
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              disabled>编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </div>
    <div  v-else>
        <loading-view></loading-view>
    </div>
        
    <el-row>
      <el-col :span='2' :offset='1'>
        <el-button type="warning" round @click='createVisible = true' disabled>增加类别</el-button>
      </el-col>
    </el-row>

    <el-dialog
    title="增加类别"
    v-model="createVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="createBody.name" placeholder='请输入类别名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        <el-row type='flex' justify='center' class='mt'>
          <view>是否上架：</view>
          <el-radio v-model="createBody.isPut" :label="1">是</el-radio>
          <el-radio v-model="createBody.isPut" :label="0">否</el-radio>
        </el-row>
        <el-row type='flex' justify='center' class='mt'>
          <view>是否置顶：</view>
          <el-radio v-model="createBody.isTop" :label="1">是</el-radio>
          <el-radio v-model="createBody.isTop" :label="0">否</el-radio>
        </el-row>
        <el-input v-model="createBody.remark" placeholder='请输入备注' class='w300 mt'>
          <template #prepend>备注：</template>
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
    title="修改类别"
    v-model="updateVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="updateBody.name" placeholder='请输入类别名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        <el-row type='flex' justify='center' class='mt'>
          <view>是否上架：</view>
          <el-radio v-model="updateBody.isPut" :label="1">是</el-radio>
          <el-radio v-model="updateBody.isPut" :label="0">否</el-radio>
        </el-row>
        <el-row type='flex' justify='center' class='mt'>
          <view>是否置顶：</view>
          <el-radio v-model="updateBody.isTop" :label="1">是</el-radio>
          <el-radio v-model="updateBody.isTop" :label="0">否</el-radio>
        </el-row>
        <el-input v-model="updateBody.remark" placeholder='请输入备注' class='w300 mt'>
          <template #prepend>备注：</template>
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
// import crus from '/@/mixin/crus.js'
// export default {
//   mixins:[crus],
//   methods:{
//     // otherThing(){
//     //   state.createBody.isPut=0
//     //   state.createBody.isTop=0
//     //   state.createBody.type++
//     // }
//   },
//   mounted(){
//     // state.createBody.name=''
    // state.createBody.isPut=0
    // state.createBody.isTop=0
    // // state.createBody.type=3
    // state.createBody.remark=''
    // state.urls.s='/build/admin/category/list'
    // state.urls.c='/build/admin/category/add'
    // state.urls.r='/build/admin/category/delete'
    // state.urls.u='/build/admin/category/update'
    // state.getList()
//   }
// }

import useCrus from '/@/mixin/useCrus.js'
import {toRefs,defineComponent, reactive} from 'vue'
import loadingView from '../../components/loading/loading.vue'

export default defineComponent({
  components: { loadingView },
  setup(){
    const state=reactive(useCrus()) 
    state.createBody.isPut=0
    state.createBody.isTop=0
    state.createBody.remark=''
    state.deleteItem='name'
    state.urls.s='/build/admin/category/list'
    state.urls.c='/build/admin/category/add'
    state.urls.r='/build/admin/category/delete'
    state.urls.u='/build/admin/category/update'
    state.getList()
    return {
      ...toRefs(state)
    }
  },
  // mounted(){
  //   console.log(this.$router.options.history.state.back=='/welcome')
  // }
}) 

</script>