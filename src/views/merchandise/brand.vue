<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">商品品牌列表</div>
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
          prop="brandName"
          label="品牌名"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属商品类型"
          align='center'
          width="180" >
        </el-table-column>
        
        <el-table-column label="操作" align='center'>
          <template #default="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-button type="warning" round @click='createVisible = true'>增加品牌</el-button>
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
    title="增加品牌"
    v-model="createVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="createBody.brandName" placeholder='请输入品牌名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        
        <el-select v-model="createBody.categoryId" placeholder="请选择商品类型" class="w300 mt">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    title="修改品牌"
    v-model="updateVisible"
    width="30%">
      <div class="flexC">
        <el-input v-model="updateBody.brandName" placeholder='请输入品牌名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        
        <el-select v-model="updateBody.categoryId" placeholder="请选择商品类型" class="w300 mt">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
    // state.urls.s='/build/admin/brand/list'
    // state.urls.c='/build/admin/brand/add'
    // state.urls.r='/build/admin/brand/delete'
    // state.urls.u='/build/admin/brand/update'
    // state.getList()
//   }
// }

import useCrus from '/@/mixin/useCrus.js'
import {toRefs,defineComponent, reactive} from 'vue'
import loadingView from '../../components/loading/loading.vue'
import request from '/@/network/request.js'

export default defineComponent({
  components: { loadingView },
  setup(){
    const listMap=reactive({typeList:[],brandList:[]})

    request.post('/build/admin/brand/list',{pageIndex:1,pageSize:50}).then((data)=>{
      data.targetList.map((item)=>{
        listMap.brandList.push({'value':item.id,'label':item.brandName})
      })
      // listMap.brandList.push({'value':null,'label':'不指定'})
      console.log(listMap.brandList)
    })

    request.post('/build/admin/category/list',{pageIndex:1,pageSize:50}).then((data)=>{
      data.targetList.map((item)=>{
        listMap.typeList.push({'value':item.id,'label':item.name,'type':item.type})
      })
      // listMap.typeList.push({'value':null,'label':'不指定'})
    })
    const state=reactive(useCrus()) 
    state.createBody.categoryType=2
    state.deleteItem='brandName'
    state.urls.s='/build/admin/brand/list'
    state.urls.c='/build/admin/brand/add'
    state.urls.r='/build/admin/brand/delete'
    state.urls.u='/build/admin/brand/update'
    state.getList()
    return {
      ...toRefs(state),...toRefs(listMap)
    }
  }
}) 

</script>