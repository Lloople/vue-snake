<template>
  <div id="app">
    <h1>Snake Arena 2000</h1>
    <grid :width="25" :height="25" />
  </div>
</template>

<script>
import Grid from './components/Grid.vue';

export default {
  name: 'app',
  components: {
    Grid
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto 0 auto;
}
</style>
