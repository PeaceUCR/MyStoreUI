/**
 * Created by hea on 3/30/18.
 */

import {combineReducers} from 'redux'
import UserReducer from './UserReducer'
import MsgReducer from './MsgReducer'
import ItemsReducer from './ItemsReducer'
import LoadingReducer from './LoadingReducer'
import DialogReducer from './DialogReducer'
import MenuReducer from './MenuReducer'
import TokenReducer from './TokenReducer'
import SearchKeywordReducer from  './SearchKeywordReducer'
import CategoryReducer from './CategoryReducer'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
    user: UserReducer,
    items: ItemsReducer,
    msg: MsgReducer,
    loading: LoadingReducer,
    dialog: DialogReducer,
    token: TokenReducer,
    searchKeyword: SearchKeywordReducer,
    category: CategoryReducer,
    menu: MenuReducer,
    router: routerReducer
});

export default appReducer;