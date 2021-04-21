<template>
  <div class="whitePage">
    <el-row >
      <el-col :span='6' class='mt' >
        <div class="contentTitle">商品发布管理</div>
      </el-col>
    </el-row>
    <el-row type='flex' align="middle" class="mt">
      <el-col :span="6" :offset="1" >
        
        <div style='display:inline-block;' class='primaryC'>是否上架：</div>
        <el-radio-group v-model="body.isPut" >
          <el-radio  :label="1">是</el-radio>
          <el-radio  :label="0">否</el-radio>
          <el-radio  :label="''" >不指定</el-radio>
        </el-radio-group>
        
        
      </el-col>
      <el-col :span="5" :offset="1">
        <el-select v-model="body.categoryId" clearable placeholder="请选择商品类型" >
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="1">
       <el-select v-model="body.brandId" clearable placeholder="请选择品牌" >
          <el-option
            v-for="item in brandList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
    <el-divider></el-divider>
    <div class='mt' v-if='result'>
      <el-table
        :data="result.targetList"
        stripe
        style="width: 100%"
        header-row-class-name='tableHead'
        class='pl'>
        <el-table-column
          prop="name"
          label="商品名"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="商品类型"
          align='center'
          width="90" >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
          align='center'
          width="90" >
        </el-table-column>
        <el-table-column
          prop="norms"
          label="规格"
          align='center'
          width="90" >
        </el-table-column>
        <el-table-column
          label="单价(元/吨)"
          align='center'
          width="120" >
          <template #default="scope" >
            <span class='textH'>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="库存数量"
          align='center'
          width="90" >
          <template #default="scope">
            <span class='textH1'>{{scope.row.stock+' '+scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否上架"
          align='center'
          width="90" >
          <template #default="scope">
            <span>{{scope.row.isPut? '是':'否'}}</span>
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
        <el-button type="warning" round @click='createVisible = true'>增加商品</el-button>
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
    title="增加商品"
    v-model="createVisible"
    width="40%" >
      <div class='flexC'>
        <el-input v-model="createBody.name" placeholder='请输入商品名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        <div class="flexR mt" style="align-items:center;">
          <div class="w100 primaryC" style="text-align:center;">品名：</div>
          <el-select v-model="createBody.categoryId" placeholder="请选择商品类型" style="width:270px;">
            <el-option
              v-for="item in typeList"
              :key="item.value+'type'"
              :label="item.label"
              :value="item.value">
              
            </el-option>
          </el-select>
        </div>
        <div class="flexR mt" style="align-items:center;">
          <div class="w100 primaryC">品牌：</div>
          <el-select v-model="createBody.brandId" placeholder="请选择品牌" style="width:270px;">
            <el-option
              v-for="item in brandList"
              :key="item.value+'brand'"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-input v-model="createBody.norms" placeholder='请输入规格' class='w300 mt'>
          <template #prepend>规格：</template>
        </el-input>
        <div class='flexR'>
          <el-input v-model="createBody.price"  placeholder='请输入单价' class='mt' style="width:180px;">
            <template #prepend>单价：</template>
          </el-input>
        
          <el-input v-model="createBody.unit" placeholder='请输入单位' class=' mt' style="width:170px;">
            <template #prepend>元/</template>
          </el-input>
        </div>
        <div class="flexR mt">
          <el-input v-model="createBody.stock"  placeholder='请输入可售库存' style="width:250px;">
            <template #prepend>库存：</template>
          </el-input>
          <div class="w100" style="line-height:40px;">{{createBody.unit}}</div>
        </div>
        
        
        <el-input v-model="createBody.remark" placeholder='请输入备注' class='mt w300' >
          <template #prepend>备注：</template>
        </el-input>
        <div   class='flexR mt'>
          
          <div class="w100 primaryC">是否上架：</div>
          <div class="flexR " style="justify-content: space-around;width:250px;" >
            <el-radio v-model="createBody.isPut" :label="1" >是</el-radio>
            <el-radio v-model="createBody.isPut" :label="0" >否</el-radio>
          </div>
        </div>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
    title="修改商品"
    v-model="updateVisible"
    width="40%">
      <div class='flexC'>
        <el-input v-model="updateBody.name" placeholder='请输入商品名' class='w300'>
          <template #prepend>名称：</template>
        </el-input>
        <div class="flexR mt" style="align-items:center;">
          <div class="w100 primaryC" style="text-align:center;">品名：</div>
          <el-select v-model="updateBody.categoryId" placeholder="请选择商品类型" style="width:270px;">
            <el-option
              v-for="item in typeList"
              :key="item.value+'type'"
              :label="item.label"
              :value="item.value">
              
            </el-option>
          </el-select>
        </div>
        <div class="flexR mt" style="align-items:center;">
          <div class="w100 primaryC">品牌：</div>
          <el-select v-model="updateBody.brandId" placeholder="请选择品牌" style="width:270px;">
            <el-option
              v-for="item in brandList"
              :key="item.value+'brand'"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-input v-model="updateBody.norms" placeholder='请输入规格' class='w300 mt'>
          <template #prepend>规格：</template>
        </el-input>
        <div class='flexR'>
          <el-input v-model="updateBody.price"  placeholder='请输入单价' class='mt' style="width:180px;">
            <template #prepend>单价：</template>
          </el-input>
        
          <el-input v-model="updateBody.unit" placeholder='请输入单位' class=' mt' style="width:170px;">
            <template #prepend>元/</template>
          </el-input>
        </div>
        <div class="flexR mt">
          <el-input v-model="updateBody.stock"  placeholder='请输入可售库存' style="width:250px;">
            <template #prepend>库存：</template>
          </el-input>
          <div class="w100" style="line-height:40px;">{{updateBody.unit}}</div>
        </div>
        
        
        <el-input v-model="updateBody.remark" placeholder='请输入备注' class='mt w300' >
          <template #prepend>备注：</template>
        </el-input>
        <div   class='flexR mt'>
          
          <div class="w100 primaryC">是否上架：</div>
          <div class="flexR " style="justify-content: space-around;width:250px;" >
            <el-radio v-model="updateBody.isPut" :label="1" >是</el-radio>
            <el-radio v-model="updateBody.isPut" :label="0" >否</el-radio>
          </div>
        </div>
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
import request from '/@/network/request.js'
  
export default defineComponent({
  components: { loadingView },
  setup(){
    // const { ctx } = getCurrentInstance()
    const state=reactive(useCrus())
    const listMap=reactive({typeList:[],brandList:[]})

    request.post('/build/admin/brand/list',{pageIndex:1,pageSize:50}).then((data)=>{
      data.targetList.map((item)=>{
        listMap.brandList.push({'value':item.id,'label':item.brandName})
      })
      listMap.brandList.push({'value':'','label':''})
      console.log(listMap.brandList)
    })

    request.post('/build/admin/category/list',{pageIndex:1,pageSize:50}).then((data)=>{
      data.targetList.map((item)=>{
        listMap.typeList.push({'value':item.id,'label':item.name,'type':item.type})
      })
      listMap.typeList.push({'value':'','label':''})
    })
    state.createBody.isPut=1
    state.createBody.categoryId=4
    // state.createBody.isTop=0
    state.createBody.price=0
    state.createBody.stock=0
    // state.createBody.unit='吨'
    state.createBody.remark=''
    state.deleteItem='name'
    state.urls.s='/build/admin/commodity/list'
    state.urls.c='/build/admin/commodity/add'
    state.urls.r='/build/admin/commodity/delete'
    state.urls.u='/build/admin/commodity/update'
    state.body.categoryId=4
    state.getList()
    return {
      ...toRefs(state),...toRefs(listMap)
    }
  }
}) 

</script>

<style scoped>
  .w300{
    width:350px;
  }
</style>