<template>
  <div class="side-nav">
    <b-card no-body header-tag="header">
      <h6 slot="header" class="mb-0">病人列表</h6>
      <div class="add-btn" slot="header">
        <b-button variant="link" size="sm" @click="gotoAddForm">添加</b-button>
      </div>
      <div class="list-content">
        <b-list-group flush>
          <b-list-group-item class="d-flex justify-content-between align-items-center" href="#" v-for="item in items" :key="item.patientId" :active="activeItem === item" @click="updateActiveItem(item)">
            {{item.name}}
            <b-badge variant="primary" pill>{{item.bedNum}}床</b-badge>
          </b-list-group-item>
        </b-list-group>
      </div>
    </b-card>
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
  .list-content {
    height: 554px;
    overflow: auto;
  }

  .add-btn {
    float: right;
    position:absolute;
    top: 5.5px;
    right: 10px;
  }
</style>
