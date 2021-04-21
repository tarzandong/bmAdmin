<template>
  <div class='textC shs'>
    <div  @click="extendmenu" >
      <el-row class="mainbar"  :style="{'background-color': extend? 'rgba(255,255,255,0.2)':''}" type='flex' align='middle'>
        
        <el-col :span='4'>
          <i :class='prop.icon'></i>
        </el-col>
        <el-col :span='12'> 
          <span class="title" >{{title}}</span>
        </el-col>
        <el-col :span='8'>
          <i :class="'el-icon-arrow-right '+(extend? 'arrow':'') " style='transition:transform 0.2s;' v-if='prop.children'></i>
        </el-col>
        
      </el-row>
    </div>

    <div :style="extend? 'height:'+(prop.children.length*43)+'px;' : 'height:0;' " class="submenu" v-if='prop.children'>
      <el-row :class="'brandbar '+(currentItem==n? 'lightText':'') "   v-for="n in prop.children.length" :key="'submenu'+n"  @click="setCurr(n)">
        <el-col  >
          
          {{prop.children[n-1].title}}
        </el-col>
        
        
      </el-row>
    </div>
    
  </div>
</template>

<script>
  export default {
    name:'menuitem',
    data(){
      return{
          
      }
    },
    props:{
      prop:''
    },
    computed:{
      extend(){
        return this.prop.extend
      },
      currentItem(){
        return this.prop.current
      },
      title(){
        if (this.prop) {
          return this.prop.title
        }
      },
      
      
    },
    methods:{
      extendmenu(){
        this.$store.commit('shrinkMenu')
        this.prop.extend=true
        if (!this.prop.children) {
          this.$store.commit('resetMenuItem')
          this.$router.push(this.prop.path)
        }
      },
      setCurr(i){
        this.$store.commit('resetMenuItem')
        this.prop.current=i
        console.log(this.prop.children[i-1])
        this.$router.push(this.prop.children[i-1].path)
        // this.$router.push('/'+this.prop+'/'+this.children.path[i-1])
        // this.$store.commit('setH',false)

      }
    }
  }
</script>

<style scoped>
  
  .mainbar{
    /* color: #fff; */
    font-size:20px;
    font-weight:bold;
    cursor: pointer;
    padding-top: 15px;
    padding-bottom: 15px;
    text-align:start;
    padding-left:20px;
    /* width:100%; */
  }
  .mainbar:hover{
    background-color: rgba(255,255,255,0.2);
  }
  .title{
    font-size: 16px;
    
  }
  
  .arrow{
    transform: rotate(90deg);
    transition: transform 0.2s;
  }
  .brandbar{
    width:100%;
    /* color:#fff; */
    font-size: 16px;
    cursor: pointer;
    padding-top: 12px;
    padding-bottom: 12px;
  }
  .brandbar:hover{
    color: #fff;
  }
  .submenu{
    display:block;
    overflow: hidden;
    text-align:start;
    padding-left:50px;
    border-left: 2px solid #fff;
    transition: height 0.5s;
  }
  
</style>