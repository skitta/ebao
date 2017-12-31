<template>
  <form @submit.prevent="validateBeforeSubmit">
    <div class="inline-form">
      <input v-model="name" v-validate="'required'" :class="{'is-danger': errors.has('name')}" name="name" type="text" style="width: 30%" placeholder="姓名">
      <input v-model="bedNum" v-validate="'required'" :class="{'is-danger': errors.has('bedNum')}" name="bedNum" type="text" style="width: 20%" placeholder="床号">
      <input v-model="patientId" v-validate="'required'" :class="{'is-danger': errors.has('patientId')}" name="patientId" type="text" style="width: 30%" placeholder="住院号">
    </div>
    <div class="vertical-form">
      <label>
        <span>医保类型：</span>
        <select name="type" id="type" disabled>
          <option value="0">黄石居民医保</option>
          <option value="1">大冶居民医保</option>
        </select>
      </label>
      <label>
        <span>医嘱单：</span>
        <input type="text" v-model="filePath" disabled>
      </label>
      <label>
        <span>申请原因：</span>
        <textarea v-model="reasons" v-validate="'required'" :class="{'is-danger': errors.has('reasons')}" name="reasons" placeholder="输入用药原因"></textarea>
      </label>
    </div>
    <div class="bigbtn">
      <button type="submit">确定</button>
    </div>
    <div class="validate-errors" v-if="errors.all().length">
      <p class="help">请正确填写表单</p>
    </div>
  </form>
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
        filePath: path.join(remote.app.getPath('desktop'), '/in.txt'),
        reasons: ''
      }
    },

    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            var item = {}
            item.name = this.name
            item.bedNum = this.bedNum
            item.patientId = this.patientId
            item.reasons = this.reasons
            item.filePath = this.filePath

            this.$store.dispatch('addItem', item)
            this.$router.push({name: 'print-page'})
            return
          }
          alert('请完整填写表单！')
        })
      }
    }
  }
</script>

<style scoped>
  input, select, textarea {
    padding: 10px;
    height: 30px;
    outline: none;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    box-shadow: inset 1px 1px 2px rgba(238, 238, 238, 0.2);
    box-sizing: border-box;
    background: #fbfbfb;
    color: #555;
    font-size: 14px;
    line-height: 15px;
    transition: all .2s ease;
  }

  input:hover, select:hover, textarea:hover {
    border-color: #111;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #104cfb;
  }

  .inline-form {
    display: flex;
    padding: 40px 30px 0 30px;
  }

  .inline-form input {
    margin-right: 50px;
    display: inline-block;
  }

  .inline-form input:last-child {
    margin-right: 0;
  }

  .vertical-form {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
    color: #666;
    font-size: 12px;
    padding: 20px 30px;
  }

  .vertical-form label {
    display: block;
    margin: 0 0 5px;
  }

  .vertical-form label>span {
    float: left;
    margin-top: 10px;
    color: #5e5e5e;
  }

  .vertical-form input,
  .vertical-form select,
  .vertical-form textarea {
    margin-top: 4px;
    width: 100%;
  }

  .vertical-form textarea {
    height: 130px;
  }

  .bigbtn {
    display: flex;
    padding: 0 30px;
  }

  .bigbtn button {
    height: 40px;
    width: 100%;
    font-size: 14px;
  }

  .is-danger {
    border-color: red;
  }

  .validate-errors {
    color: rgba(255, 0, 0, 0.8);
    margin: 20px 30px;
    border: 1px solid rgba(255, 0, 0, 0.5);
    border-radius: 5px;
    padding: 10px;
    background-color: rgba(255, 240, 90, 0.5);
  }

  .help {
    text-align: center;
  }
</style>