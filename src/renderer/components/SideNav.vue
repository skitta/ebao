<template>
  <div class="side-nav">
    <div class="title">List</div>
    <div class="content">
      <div class="item-list" v-if="items">
        <ul class="list-group">
            <li v-for="item in items" :key="item.patientId" :class="{ active: activeItem === item }" @click="updateActiveItem(item)">
              <p>{{item.name}}</p>
            </li>
        </ul>
      </div>
      <div class="add-btn">
        <button @click="gotoAddForm">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'side-nav',
    data () {
      return {
        items: this.$store.state.case.items
      }
    },
    methods: {
      gotoAddForm (event) {
        this.$router.push({name: 'form-page'})
      },
      ...mapActions([
        'updateActiveItem'
      ])
    },
    computed: {
      ...mapState({
        activeItem: state => state.case.activeItem
      })
    }
  }
</script>

<style scoped>
  .side-nav {
    height: 600px;
    background-color: rgb(37, 37, 38);
    box-shadow: 0 1px 1px black;
  }

  .title {
    background-color: rgb(56, 56, 56);
    padding: 2px 8px;
    color: rgb(204, 204, 204);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    box-shadow: 0 1px 1px black;
    height: 20px;
  }

  .content {
    height: 576px;
    overflow: auto;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    height: 28px;
    cursor: pointer;
  }

  .active {
    background-color: rgb(63, 63, 71);
    transition: all .5s;
  }

  p {
    margin: 0;
    padding: 5px 20px;
    color: rgb(204, 204, 204);
  }

  .add-btn {
    display: flex;
    padding: 20px;
  }

  .add-btn button {
    height: 30px;
    width: 100px;
  }
</style>
