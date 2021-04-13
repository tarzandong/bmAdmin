<template>
  <div>
    <menuitem v-for="n in mainItems.length" :key="n" :prop='mainItems[n-1]'></menuitem>
  </div>
</template>

<script>
  import menuitem from './menuitem.vue'
  export default {
    name:'menulist',
    components:{
      menuitem
    },
    computed:{
      mainItems(){
        return this.$store.state.menu
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>