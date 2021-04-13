

export default{
  data() {
    return {
      createVisible:false,
      createBody:{},
      updateVisible:false,
      updateBody:{},
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
      result:{},
    }

  },
  methods: {
    getList(){
      this.$nextTick(()=>{
        this.$request.post(this.urls.s,this.body).then(data=>{
          this.result=data
          // this.otherThing()
        })
      })
    },
    confirmAdd(){
      this.$nextTick(()=>{
        this.$request.post(this.urls.c,this.createBody).then(data=>{
          console.log(data)
          this.createVisible=false
          this.getList()
        })
      })
    },
    confirmEdit(){
      console.log(this.updateBody)
      this.$nextTick(()=>{
        this.$request.post(this.urls.u,this.updateBody).then(data=>{
          console.log(data)
          this.updateVisible=false
          this.getList()
        })
      })
    },
    handleEdit(i,item){
      this.updateBody=item
      this.updateVisible=true
    },
    handleDelete(i,item){
      this.$confirm('确定删除'+item.name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        this.$nextTick(()=>{
          this.$request.post(this.urls.r,{id:item.id}).then(data=>{
            console.log(data)
            this.getList()
          })
        })
      })
    }
  },
}