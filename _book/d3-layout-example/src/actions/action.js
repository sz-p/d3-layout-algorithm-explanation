

/**
 * Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 *store.dispatch() 将 action 传到 store。
 */
import { createAction } from 'redux-actions';

import * as type from './actionType';
import * as api from '../api/api';


export const get_Category = createAction(type.GET_CATEGORY, api.getCategory);
export const get_AllItem = createAction(type.GET_ITEM, api.getItem);
export const get_RelaodIntroduction = (params) => createAction(type.GET_RELAODINTRODUCTION, api.get_RelaodIntroduction)(params);