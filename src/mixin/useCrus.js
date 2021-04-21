import {nextTick,reactive,toRefs } from 'vue'
import request from '/@/network/request.js'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus'
import md5 from 'js-md5'
  
export default function useCrus(){
  
  
  // console.log(request,nextTick)

  const state= reactive({
    deleteItem:'',
    createVisible:false,
    createBody:{},
    updateVisible:false,
    updateBody:{},
    copy:{},
    body:{
      pageIndex:1,
      pageSize:10,
    },
    urls:{
      c:'',
      r:'',
      u:'',
      s:''
    },
    result:null,
  })

  const getList=()=>{
    nextTick(()=>{
      request.post(state.urls.s,state.body)
      .then(data=>{
        state.result=data
        // state.otherThing()
      })
    })
  }
  const confirmAdd=()=>{
    if (state.createBody.password) {
      state.createBody.password=md5(state.createBody.password)
      console.log(state.createBody.password)
    }

    nextTick(()=>{
      request.post(state.urls.c,state.createBody).then(data=>{
        console.log(data)
        state.createVisible=false
        getList()
        ElMessage.success('添加成功')
      })
    })
  }
  const confirmEdit=()=>{
    // console.log(state.updateBody)
    if (state.updateBody.password) {
      state.updateBody.password=md5(state.updateBody.password)
      // console.log(state.updateBody.password)
    }
    nextTick(()=>{
      request.post(state.urls.u,state.updateBody).then(data=>{
        console.log(data)
        state.updateVisible=false
        getList()
        ElMessage.success('修改成功')
      })
    })
  }
  const handleEdit=(i,item)=>{
    state.updateBody={...item}
    state.copy={...item}
    state.updateVisible=true
    console.log(item)
  }
  const handleDelete=(i,item)=>{
    console.log(state)
    ElMessageBox.confirm('确定删除'+item[state.deleteItem], '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(()=>{
      nextTick(()=>{
        request.post(state.urls.r,{id:item.id}).then(data=>{
          console.log(data)
          getList()
          ElMessage.success('删除成功')
        })
      })
    })
  }

  const pageChange=(i)=>{
    state.body.pageIndex=i
    // console.log('changesize')
    getList()
  }

  const sizeChange=(i)=>{
    state.body.pageSize=i
    getList()
  }


  return {
    ...toRefs(state),
    getList,confirmAdd,confirmEdit,handleDelete,handleEdit,pageChange,sizeChange
  }
  
}