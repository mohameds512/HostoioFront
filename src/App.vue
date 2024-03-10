<template>
  <div id="app">
    <router-link to="/" class="btn btn-sm btn-danger m-2">Category</router-link>
    <router-link to="/tree" class="btn btn-sm btn-success">Tree</router-link>

    <router-view></router-view>
    <!-- <Category/> -->
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Category from './components/category.vue';
export default {
  name: 'App',
  components: {
    // HelloWorld,
    // Category
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
