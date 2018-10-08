/**
 * Created by hea on 8/3/18.
 */

const initialState = null;
//set current msg
function MsgReducer(preState = initialState, action) {
    switch (action.type) {
        case "setMsg":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default MsgReducer;