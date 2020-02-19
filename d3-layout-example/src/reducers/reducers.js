/*

Reducers 指定了应用状态的变化如何响应 actions 并发送到 store 的，记住 actions 只是描述了有事情发生了这一事实，并没有描述应用如何更新 state。

*/

import * as type from '../actions/actionType';
import initialState from './initialState';
const actionsCase = () => {
  const change_page = (state, action) => {
    return Object.assign({}, state, {
      page: action.payload
    });
  };
  return new Map([
    [type.CHANGE_PAGE, change_page],
  ])
}
function reducer(state = initialState, action) {
  const actionFunction = actionsCase().get(action.type);
  if (typeof actionFunction === 'function') {
    return actionFunction(state, action);
  }
  else {
    return state;
  }
}

export default reducer
