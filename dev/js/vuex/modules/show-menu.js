
// initial state
const state = {
  menuShow: [
    {isshow:false},
    {isshow:false},
    {isshow:false},
    {isshow:false},
    {isshow:false},
    {isshow:false},
    {isshow:false}
  ]
}

export const mutations = {
  ['SHOW_MENU'] (state,index) {
    state.menuShow[index].isshow = !state.menuShow[index].isshow
  },
}

export default {
  state,
  mutations
}
