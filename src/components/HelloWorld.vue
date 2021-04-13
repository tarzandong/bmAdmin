<template>
  <h1 class="test">{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <el-button>test</el-button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <el-alert
    title="成功提示的文案"
    type="success">
  </el-alert>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style lang="scss">
  
</style>
