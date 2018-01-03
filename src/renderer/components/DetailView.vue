<template>
<div>
  <div v-if="activeItem.name">
    <div class="top-btn">
      <button class="btn-left" @click="deleteItem">删除</button>
      <button class="btn-right" @click="printPreview">打印预览</button>
      <div class="clear-fix"></div>
    </div>
    <div class="detail">
      <h2>{{activeItem.name}}</h2>
      <p>{{activeItem.bedNum}}床</p>
      <p>乙类药品</p>
      <ul>
        <li v-for="(drug, key) in activeItem.drugB" :key="key">{{drug.name}}</li>
      </ul>
      <p>自费药品</p>
      <ul>
        <li v-for="(drug, key) in activeItem.drugC" :key="key">{{drug.name}}</li>
      </ul>
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

  methods: {
    ...mapActions([
      'deleteItem'
    ]),

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

.top-btn>button {
  padding: 10px 20px;
}

.btn-left {
  float: left;
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
  max-width: 400px;
  margin: 40px auto;
}

.detail>h2 {
  text-align: center;
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
