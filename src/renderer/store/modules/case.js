const state = {
  items: [],
  activeItem: {}
}

const mutations = {
  ADD_ITEM (state, item) {
    state.items.push(item)
    state.activeItem = item
  },

  DELETE_ITEM (state) {
    for (let i in state.items) {
      if (state.items[i] === state.activeItem) {
        state.items.splice(i, 1)
        state.activeItem = {}
      }
    }
  },

  SET_ACTIVE_ITEM (state, item) {
    state.activeItem = item
  }
}

const actions = {
  addItem ({commit}, item) {
    const readline = require('readline')
    const fs = require('fs')
    const iconv = require('iconv-lite')

    let buffer = Buffer.from(fs.readFileSync(item.filePath, {encoding: 'binary'}), 'binary')
    fs.writeFileSync('tmp.txt', iconv.decode(buffer, 'gbk'), 'utf8')

    const rl = readline.createInterface({
      input: fs.createReadStream('tmp.txt'),
      output: process.stdout,
      terminal: false
    })

    let drugList = []
    let isRepeat = false
    rl.on('line', (line) => {
      let drug = {}
      let data = line.split('\t')
      let name = data[3]
      let type = data[5]
      let time = data[6].split(' ')[0]
      let isSelfDrug = data[39]
      if (type === '药物') {
        if (isSelfDrug === '0') {
          for (let i in drugList) {
            if (name === drugList[i].name) {
              isRepeat = true
            }
          }
          if (!isRepeat) {
            drug.name = name
            drug.time = time
            drugList.push(drug)
          }
        }
      }
      isRepeat = false
    }).on('close', () => {
      const papa = require('papaparse')
      papa.parse(require('fs').createReadStream('base.csv'), {
        complete: (result) => {
          let drugB = []
          let drugC = []
          let base = result.data
          for (let i in drugList) {
            for (let k in base) {
              if (drugList[i].name === base[k][0]) {
                drugList[i].price = base[k][1]
                drugList[i].type = base[k][2]
                if (drugList[i].type === '乙类') {
                  drugB.push(drugList[i])
                }
                if (drugList[i].type === '自费') {
                  drugC.push(drugList[i])
                }
              }
            }
          }
          item.drugB = drugB
          item.drugC = drugC
          commit('ADD_ITEM', item)
        }
      })
    })
  },

  deleteItem ({commit}) {
    commit('DELETE_ITEM')
  },

  updateActiveItem ({commit}, item) {
    commit('SET_ACTIVE_ITEM', item)
  }
}

export default {
  state,
  mutations,
  actions
}
