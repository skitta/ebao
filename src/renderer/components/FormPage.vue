<template>
<div>
  <b-button variant="outline-primary" size="sm" class="back-btn" @click="backToIndex">返回</b-button>

  <b-form @submit="onSubmit" class="form-main">
    <b-form-group horizontal label="姓名" label-for="name" label-size="sm">
      <b-form-input type="text" name="name" size="sm" required placeholder="姓名" v-model="name"></b-form-input>
    </b-form-group>
    
    <b-form-group horizontal label="床号" label-for="bedNum" label-size="sm">
      <b-form-input type="text" name="bedNum" size="sm" required placeholder="床号" v-model="bedNum"></b-form-input>
    </b-form-group>

    <b-form-group horizontal label="住院号" label-for="patientId" label-size="sm">
      <b-form-input type="text" name="patientId" size="sm" required placeholder="住院号" v-model="patientId"></b-form-input>
    </b-form-group>

    <b-form-group horizontal label="医保类型" label-for="payType" label-size="sm">
      <b-form-select name="payType" size="sm" :options="options" v-model="selected"></b-form-select>
    </b-form-group>

    <b-form-group horizontal label="医嘱单" label-for="inFile" label-size="sm">
      <b-form-input type="text" name="inFile" size="sm" required disabled v-model="filePath"></b-form-input>
    </b-form-group>

    <b-form-group horizontal label="申请原因" label-for="reasons" label-size="sm">
      <b-form-textarea id="reasons" name="reasons" size="sm" required placeholder="用药原因" :rows="6" v-model="reasons"></b-form-textarea>
    </b-form-group>
    <b-button type="submit" variant="primary" block>确定</b-button>
  </b-form>
</div>
</template>

<script>
  import path from 'path'
  import { remote } from 'electron'

  export default {
    name: 'form-page',

    data () {
      return {
        name: '',
        bedNum: '',
        patientId: '',
        selected: 'a',
        options: [
          {value: 'a', text: '大冶居民医保'},
          {value: 'b', text: '黄石居民医保'}
        ],
        filePath: path.join(remote.app.getPath('desktop'), '/in.txt'),
        reasons: ''
      }
    },

    methods: {
      backToIndex (event) {
        this.$router.push({name: 'index-page'})
      },
      onSubmit (event) {
        event.preventDefault()
        let item = {}
        item.name = this.name
        item.bedNum = this.bedNum
        item.patientId = this.patientId
        item.reasons = this.reasons
        item.filePath = this.filePath

        this.$store.dispatch('addItem', item)
        this.$router.push({name: 'index-page'})
      }
    }
  }
</script>

<style scoped>
  .back-btn {
    margin: 10px 30px;
  }

  .form-main {
    max-width: 550px;
    margin: 20px auto;
  }

  .custom-select {
    padding: 4px 8px;
  }
</style>