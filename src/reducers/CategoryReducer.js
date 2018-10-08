/**
 * Created by hea on 8/27/18.
 */

const initialState = [];
//set current msg
function CategoryReducer(preState = initialState, action) {
    switch (action.type) {
        case "getCategory":
            console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default CategoryReducer;