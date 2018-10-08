/**
 * Created by hea on 8/28/18.
 */

const initialState = {isOpen: false};
//set dialog open/hide and preload data in dialog
function MenuReducer(preState = initialState, action) {
    switch (action.type) {
        case "toggleMenu":
            return {
                isOpen: action.payload
            };
        default:
            return preState;
    }
}

export default MenuReducer;