/*
* Reducer数据处理
* */
import { type } from '../action'
const initialState = {
    menuName: '首页'
}

export default (state=initialState, action)=>{
    switch (action.type) {
        case type.SWITCH_MENU:
            let obj = {
                ...state,
                menuName: action.menuName
            }
            return obj
            break;
        default:
            return {
                ...state
            }
            break;
    }
}