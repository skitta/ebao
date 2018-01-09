<template>
<div>
  <div class="fixed-btn">
    <b-button variant="outline-primary" size="sm" class="btn-left" @click="backToIndex">返回</b-button>
    <b-button variant="outline-primary" size="sm" class="btn-right" @click="printToPdf">打印</b-button>
  </div>
  <div class="printable-table" v-if="activeItem.name">
    <h2>黄石市四医院基本医疗保险</h2>
    <h3>特殊用药、特殊治疗和特殊检查知情同意书</h3>

    <div class="table-head">
      <table>
        <tr>
          <td>姓名</td>
          <td class="underline">{{ activeItem.name }}</td>
          <td>科室</td>
          <td class="underline">儿科</td>
          <td>床号</td>
          <td class="underline">{{ activeItem.bedNum }}</td>
          <td>住院号</td>
          <td class="underline">{{ activeItem.patientId }}</td>
        </tr>
      </table>
    </div>

    <div>
      <table border="1" class="table-main">
        <tr>
          <td colspan="5" class="table-reason">
            <div>申请原因：</div>
            <div class="table-reason-content">{{ activeItem.reasons }}</div>
            <div class="table-reason-sign">医生签名:</div>
          </td>
        </tr>
        <tr>
          <td style="width:17%">类别</td>
          <td style="width:36%">名称</td>
          <td style="width:13%">单价(元)</td>
          <td style="width:16%">患者及家属签字</td>
          <td style="width:18%">时间</td>
        </tr>
        <tr v-if="activeItem.drugB.length > 6" v-for="(drug, index) in activeItem.drugB" :key="index">
          <td :rowspan="activeItem.drugB.length" v-if="index === 0">(乙类)
            <br>自费10%</td>
          <td>{{drug.name}}</td>
          <td>{{drug.price}}</td>
          <td></td>
          <td>{{drug.time}}</td>
        </tr>
        <tr v-if="activeItem.drugB.length <= 6" v-for="i in 6" :key="i">
          <td rowspan="6" v-if="i === 1">(乙类)
            <br>自费10%</td>
          <td v-if="i <= activeItem.drugB.length">{{activeItem.drugB[i-1].name}}</td>
          <td v-if="i <= activeItem.drugB.length">{{activeItem.drugB[i-1].price}}</td>
          <td></td>
          <td v-if="i <= activeItem.drugB.length">{{activeItem.drugB[i-1].time}}</td>
          <td v-if="i > activeItem.drugB.length" class="drug"></td>
          <td v-if="i > activeItem.drugB.length"></td>
          <td v-if="i > activeItem.drugB.length"></td>
        </tr>
        <tr v-if="activeItem.drugC.length > 3" v-for="(drug, index) in activeItem.drugC" :key="index">
          <td :rowspan="activeItem.drugC.length" v-if="index === 0">(丙类)
            <br>完全自费</td>
          <td>{{drug.name}}</td>
          <td>{{drug.price}}</td>
          <td></td>
          <td>{{drug.time}}</td>
        </tr>
        <tr v-if="activeItem.drugC.length <= 3" v-for="k in 3">
          <td rowspan="3" v-if="k === 1">(丙类)
            <br>完全自费</td>
          <td v-if="k <= activeItem.drugC.length">{{activeItem.drugC[k-1].name}}</td>
          <td v-if="k <= activeItem.drugC.length">{{activeItem.drugC[k-1].price}}</td>
          <td></td>
          <td v-if="k <= activeItem.drugC.length">{{activeItem.drugC[k-1].time}}</td>
          <td v-if="k > activeItem.drugC.length" class="drug"></td>
          <td v-if="k > activeItem.drugC.length"></td>
          <td v-if="k > activeItem.drugC.length"></td>
        </tr>
        <tr>
          <td>超限价部分</td>
          <td class="drug"></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  methods: {
    printToPdf (event) {
      const ipc = require('electron').ipcRenderer
      ipc.send('print')
    },
    backToIndex (event) {
      this.$router.push({name: 'index-page'})
    }
  },

  computed: {
    ...mapState({
      activeItem: state => state.case.activeItem
    })
  }
}
</script>

<style scoped>
button {
  opacity: .2;
}

button:hover {
  opacity: 1;
}

table {
  text-align: center;
  margin: auto;
}

.fixed-btn {
  margin: 10px 20px;
}

.btn-left {
  float: left;
}

.btn-right {
  float: right;
}

.printable-table {
  margin: auto;
  height: 250mm;
  width: 178mm;
  text-align: center;
}

.table-head {
  margin-top: 10mm;
  margin-bottom: 8mm;
}

.table-head td:nth-child(odd) {
  padding-left: 8mm;
}

.table-head td:first-child {
  padding: 0;
}

.underline {
  border-bottom: 1px solid;
  min-width: 20mm;
}

.table-main {
  width: 90%;
}

.table-main td {
  padding: 2mm;
}

.table-reason {
  text-align: left;
}

.table-reason-content {
  height: 56mm;
  text-indent: 2em;
  text-align: justify;
}

.table-reason-sign {
  text-align: right;
  margin-right: 20mm;
}

.drug {
  height: 36px;
}

@media print {
  .fixed-btn {
    display: none;
  }
}
</style>

