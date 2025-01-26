<template>
  <div id="app">
    <router-view /> <!-- MainLayout.vue will handle the layout -->
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global styles for the entire application */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}
</style>
