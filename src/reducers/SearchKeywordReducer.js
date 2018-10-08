/**
 * Created by hea on 8/20/18.
 */

const initialState = null;
//set current error
function SearchKeywordReducer(preState = initialState, action) {
    switch (action.type) {
        case "setSearchKeyword":
            //console.log(action.payload);
            return action.payload;
        default:
            return preState;
    }
}

export default SearchKeywordReducer;