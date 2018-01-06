<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'ebao'
  }
</script>

<style>
  /* CSS */
  body {
    margin: 0;
    padding: 0;
    background: #f8f8f8;
    font-size: 14px;
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
      background: none;
    }

    @page {
      size: 195mm 270mm;
      margin: 20mm 17mm;
    }
  }
</style>
