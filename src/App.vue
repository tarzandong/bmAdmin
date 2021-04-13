<template>
  <div :style="'height:'+$store.state.fullHeight+'px;'+'width:'+$store.state.fullWidth+'px;' ">
    <router-view name="master"></router-view>
  </div>
  <div id="toast"></div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  // components: {
  //   // HelloWorld
  // },
  mounted(){
    console.log('mounted')
    this.$store.commit('setFH',window.innerHeight)
    this.$store.commit('setFW',window.innerWidth)
    window.onresize=()=>{
      this.$store.commit('setFH',window.innerHeight)
      this.$store.commit('setFW',window.innerWidth)
    }

  },
}
</script>
