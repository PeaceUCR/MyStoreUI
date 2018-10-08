/**
 * Created by hea on 8/2/18.
 */

const initialState = null;

function TokenReducer(preState = initialState, action) {
    switch (action.type) {
        case "setToken":
            console.log(action.payload);
            return action.payload;
        case "clearToken":
            return null;
        default:
            return preState;
    }
}

export default TokenReducer;