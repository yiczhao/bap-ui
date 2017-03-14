/**
 * @author: zjh.
 * @date: 2017/3/14.
 */
import { CHANGE_TITLE } from '../title-types'
// initial state
const state = {
  titles: '',
}

export const mutations = {
  [CHANGE_TITLE] (state,n) { state.titles = n },
}

export default {
  state,mutations
}
