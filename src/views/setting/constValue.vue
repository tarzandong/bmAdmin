<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">系统常量</div>
      </el-col>
    </el-row>

    <div class='mt' v-if='result'>
      <el-table
        :data="result.getConstInfoList"
        stripe
        style="width: 100%"
        header-row-class-name='tableHead'
        class='pl'>
        <el-table-column
          prop="key"
          label="常量名"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="value"
          label="常量值"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="description"
          label="常量描述"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180" >
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
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table> 
    </div>
    <div  v-else>
        <loading-view></loading-view>
    </div>
        
    <el-row>
      <el-col :span='2' :offset='1'>
        <el-button type="warning" round @click='createVisible = true'>增加常量</el-button>
      </el-col>
    </el-row>

    <div class='mt'>
      <el-pagination v-if='result'
      @size-change="sizeChange"
      @current-change="pageChange"
      v-model:currentPage="result.pageIndex"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="result.pageSize"
        layout="prev, pager, next,sizes"
        :total="result.sumCount">
      </el-pagination>
    </div>

    <el-dialog
    title="增加常量"
    v-model="createVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="createBody.key" placeholder='请输入常量名' class='w300'>
          <template #prepend>常量名：</template>
        </el-input>
        
        <el-input v-model="createBody.value" placeholder='请输入常量值' class='w300 mt'>
          <template #prepend>常量值：</template>
        </el-input>

        <el-input v-model="createBody.description" placeholder='请输入描述' class='w300 mt'>
          <template #prepend>常量描述：</template>
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
    title="修改常量"
    v-model="updateVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="updateBody.key" class='w300' disabled>
          <template #prepend>常量名：</template>
        </el-input>
        
        

        <el-input v-model="updateBody.value"   class='w300 mt'>
          <template #prepend>常量值：</template>
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
    state.deleteItem='key'
    state.urls.s='/build/admin/const/list'
    state.urls.c='/build/admin/const/add'
    state.urls.r='/build/admin/const/delete'
    state.urls.u='/build/admin/const/update'
    state.getList()
    return {
      ...toRefs(state)
    }
  }
}) 

</script>