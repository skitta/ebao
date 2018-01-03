<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
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
  }

  button {
    margin: auto;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: rgb(81, 140, 228);
    color: #fff;
  }

  button:hover {
    background-color: #2a4cbe;
  }

  button:active {
    background-color: rgb(81, 140, 228);
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
      background: none;
    }

    @page {
      size: 195mm 270mm;
      /* margin: 20mm 17mm; */
    }
  }
</style>
