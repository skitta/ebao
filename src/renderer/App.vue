<template>
  <div id="app">
    <div class="left-side">
      <side-nav></side-nav>
    </div>
    <div class="right-side">
      <router-view></router-view>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
  import SideNav from './components/SideNav'
  export default {
    name: 'ebao',
    components: {SideNav}
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

  .left-side {
    float: left;
    width: 30%;
  }

  .right-side {
    float: left;
    width: 70%;
    height: 600px;
    overflow: auto;
  }

  .clearfix {
    clear: both;
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
    }

    @page {
      size: 195mm 270mm;
      margin: 26mm 17mm;
    }

    .left-side {
      display: none;
    }
  }
</style>
