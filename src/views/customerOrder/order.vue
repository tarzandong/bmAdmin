<template>
  <div class="whitePage">
    <el-row>
      <el-col :span='6' class='mt' >
        <div class="contentTitle">订单管理</div>
      </el-col>
    </el-row>

    <el-row class='mt' type='flex' align='bottom'>
      <el-col :span='3' :offset='1'>
        <el-select v-model="body.orderState" placeholder="选择订单状态" >
          <el-option
            v-for="item in orderStatus"
            :key="'state'+item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="body.categoryId" clearable placeholder="请选择商品类型" >
          <el-option
            v-for="item in typeList"
            :key="item.value+'type'"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
       <el-select v-model="body.brandId" clearable placeholder="请选择品牌" >
          <el-option
            v-for="item in brandList"
            :key="item.value+'brand'"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
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

    <el-divider></el-divider>
    <div class='mt' v-if='result'>
      <el-table
        :data="result.targetList"
        style="width: 100%"
        header-row-class-name='tableHead'
        class='pl'
        :row-class-name="orderState">
        <el-table-column
          prop="name"
          label="商品名"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
          align='center'
          width="90" >
        </el-table-column>
        <el-table-column
          label="单价"
          align='center'
          width="90" >
          <template #default="scope" >
            <span class='textH'>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label='订单数量'
          align='center'
          width="90" >
          <template #default="scope" >
            <span class='textH1'>{{scope.row.orderNumber+' '+scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='amount'
          label="总价"
          width="90" >
        </el-table-column>
        <el-table-column
          label="客户"
          width="180" >
          <template #default="scope">
            <span >{{scope.row.nickName+' '+scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop='createTime'
          label="下单时间"
          align='center'>
        </el-table-column>
        <el-table-column
          prop='remark'
          label="备注"
          align='center'>
        </el-table-column>
        <el-table-column label="订单状态" align='center'>
          <template #default="scope">
            <span class='mr' style="white-space:pre;">{{orderStatus[scope.row.orderState].label}}</span>
            <el-button
              size="mini" type='warning'
              @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.orderState==0 || scope.row.orderState==3 ||scope.row.orderState==4">{{dialog1(scope.row.orderState).button}}</el-button>
          </template>
        </el-table-column>
      </el-table> 
    </div>
    <div  v-else>
        <loading-view></loading-view>
    </div>
        
    <!-- <el-row>
      <el-col :span='2' :offset='1'>
        <el-button type="warning" round @click='createVisible = true'>增加商品</el-button>
      </el-col>
    </el-row> -->

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
    :title="dialog1(copy.orderState).title"
    v-model="updateVisible"
    width="30%">
      <el-row type='flex' justify='center' align='middle' class='mt' v-if='dialog1(copy.orderState).state==0'>
        <el-radio v-model="updateBody.orderState" :label='1' :key="'radio'+n">不同意</el-radio>
        <el-radio v-model="updateBody.orderState" :label='3' :key="'radio'+n">同意</el-radio>
      </el-row>
      <el-row type='flex' justify='center' align='middle' class='mt' v-else>
        <el-radio v-for='n in 3' v-model="updateBody.orderState" :label="n+1" :key="'radio'+n">{{orderStatus[n+1].label}}</el-radio>
      </el-row>
      <el-row type='flex' justify='center' align='middle' class='mt'>
        <el-input placeholder="输入备注" v-model="updateBody.remark" style="width:300px;">
          <template #prepend>备注：</template>
        </el-input>
      </el-row>
      <el-divider></el-divider>
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
import {toRefs,defineComponent, reactive,getCurrentInstance} from 'vue'
import loadingView from '../../components/loading/loading.vue'
import request from '/@/network/request.js'

export default defineComponent({
  components: { loadingView },
  setup(){
    
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
    const option=reactive({orderStatus:[
      {value:0,label:'购物车   '} ,
      {value:1,label:'已下单   '},
      {value:2,label:'已发货   '},
      {value:3,label:'已取消   '},
      {value:4,label:'已完成   '},
      {value:5,label:'申请取消'},
      {value:null,label:'未指定'}
    ],})
    state.urls.s='/build/admin/order/list'
    // state.urls.c='/build/admin/commodity/add'
    // state.urls.r='/build/admin/commodity/delete'
    state.urls.u='/build/admin/order/orderProcessing'
    state.body.zoneCode='86'
    state.getList()
    const orderState=({row, rowIndex})=>{
      // console.log(row.orderState)
      if (row.orderState==1 || row.orderState==5) return 'bgW'
      if (row.orderState==3) return 'bgF'
      if (row.orderState==4) return 'bgS'
    }
    const dialog1=(orderState)=>{
      let temp={}
      if (orderState==5) {
        temp.state=0
        temp.title='审核'
        temp.button='审核'
      }
      else {
        temp.state=1
        temp.title='更改状态为：'
        temp.button='更改'
      }
      return temp
    }
    return {
      ...toRefs(state),...toRefs(option),...toRefs(listMap),orderState,dialog1
    }
  }
}) 

</script>

<style lang='scss'>
  
</style>