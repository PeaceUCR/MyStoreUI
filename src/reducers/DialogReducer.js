/**
 * Created by hea on 7/31/18.
 */

const initialState = {isOpen: false, data: null};
//set dialog open/hide and preload data in dialog
function DialogReducer(preState = initialState, action) {
    switch (action.type) {
        case "openDialog":
            return {
                isOpen: true,
                data: action.payload
            };
        case "closeDialog":
            return  {
                isOpen: false,
                data: action.payload
            };
        default:
            return preState;
    }
}

export default DialogReducer;