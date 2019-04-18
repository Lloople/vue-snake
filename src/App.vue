<template>
  <div id="app">
    <h2>Snake game made with Vue</h2>
    <grid :width="20" :height="20" />
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
  margin: 30px auto 0 auto;
}
</style>
