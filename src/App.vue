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


<style>
  @font-face {
    font-family: cjs;
    src: url('./assets/font/cjs.ttf');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: shs;
    src: url('./assets/font/shs.ttf');
    font-weight: normal;
    font-style: normal;
  }
</style>