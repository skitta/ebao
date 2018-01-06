<template>
<div>
  <div v-if="activeItem.name">
    <div class="top-btn">
      <b-button variant="outline-danger" size="sm" class="btn-left" @click="deleteItem">删除</b-button>
      <b-button variant="outline-danger" size="sm" class="btn-left" @click="deleteSelectedItemDrugs">删除所选</b-button>
      <b-button variant="outline-primary" size="sm"  class="btn-right" @click="printPreview">打印预览</b-button>
      <div class="clear-fix"></div>
    </div>
    <div class="detail">
      <h1 class="text-center">{{activeItem.name}}</h1>
      <b-card-group columns>
        <b-card no-body header="<b>乙类药品</b>" v-if="activeItem.drugB.length != 0">
          <table class="table table-sm text-center">
            <thead>
              <tr>
                <th>选择</th>
                <th>药品名称</th>
                <th>开嘱时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(drug, index) in activeItem.drugB" :key="index">
                <td>
                  <input type="checkbox" :value="drug" v-model="selectedDrugB">
                </td>
                <td>{{drug.name}}</td>
                <td>{{drug.time}}</td>
              </tr>
            </tbody>
          </table>
        </b-card>
        <b-card header="<b>自费药品</b>" v-if="activeItem.drugC.length != 0">
          <table class="table table-sm text-center">
            <thead>
              <tr>
                <th>选择</th>
                <th>药品名称</th>
                <th>开嘱时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(drug, index) in activeItem.drugC" :key="index">
                <td>
                  <input type="checkbox" :value="drug" v-model="selectedDrugC">
                </td>
                <td>{{drug.name}}</td>
                <td>{{drug.time}}</td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </b-card-group>
    </div>
  </div>
  <div class="notice" v-else>
    <span>点击列表项目可查看详情</span>
    <span>点击添加按钮可添加案例</span>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'detail-view',

  data () {
    return {
      selectedDrugB: [],
      selectedDrugC: []
    }
  },

  methods: {
    ...mapActions([
      'deleteItem'
    ]),

    deleteSelectedItemDrugs (event) {
      this.$store.dispatch('deleteActiveItemDrugB', this.selectedDrugB)
      this.$store.dispatch('deleteActiveItemDrugC', this.selectedDrugC)
      this.selectedDrugB = []
      this.selectedDrugC = []
      this.$store.dispatch('modifyItem')
    },

    printPreview (event) {
      this.$router.push({name: 'print-page'})
    }
  },

  computed: {
    ...mapState({
      'activeItem': state => state.case.activeItem
    })
  }
}
</script>

<style scoped>
.top-btn {
  margin: 10px 20px;
}

.btn-left {
  float: left;
  margin-right: 10px;
}

.btn-right {
  float: right;
}

.clear-fix {
  clear: both;
  border-bottom: 1px solid rgba(102, 102, 102, 0.2);
  height: 10px;
}

.detail {
  padding: 0 55px;
  height: 539px;
  overflow: auto;
}

.card-columns {
  column-count: 1;
}

.notice {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
}

.notice span {
  color: #666;
}
</style>
