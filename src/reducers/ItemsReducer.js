/**
 * Created by hea on 7/27/18.
 */


//const initialState = null;
const initialState = [];

function ItemsReducer(preState = initialState, action) {
    switch (action.type) {
        case "getAllItems":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default ItemsReducer;