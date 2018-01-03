<template>
  <div>
    <div class="left-side">
      <side-nav></side-nav>
    </div>
    <div class="right-side">
      <detail-view></detail-view>
    </div>
  </div>
</template>

<script>
import SideNav from './SideNav'
import DetailView from './DetailView'
export default {
  name: 'index-page',
  components: {
    SideNav,
    DetailView
  }
}
</script>

<style scoped>
.left-side {
    float: left;
    width: 30%;
    overflow: auto;
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
</style>
