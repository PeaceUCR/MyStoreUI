/**
 * Created by hea on 4/1/18.
 */

import axios from 'axios';
import {push} from 'react-router-redux';
import {constant} from '../constants';


export const addItem = function (itemData) {
    return function (dispatch, getState) {
        dispatch(startLoading());

        let config = {
            headers:{'Authorization': "Bearer ".concat(getState().token),'Content-Type': 'application/json'}
        };
        return axios.post(constant.server+'/items/add',itemData, config).then(function (res) {
            dispatch(getAllItems());
        }).catch(error => {
            console.log(error.response);
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}


export const getAllItems = function () {
    return function (dispatch, getState) {
        dispatch(startLoading());
        //constant.server+'/items/getAll'
        //'http://localhost:8080/items/getAll'

        let config = {
            headers:{Authorization: "Bearer ".concat(getState().token)}
        };
        console.log(config);
        return axios.get(constant.server+'/items/getAll', config).then(function (res) {
            console.log(res);
            dispatch({
                type: "getAllItems",
                payload: res.data
            });
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error.response);
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}


export const deleteItem = function (itemData) {
    return function (dispatch, getState) {
        dispatch(startLoading());
        let config = {
            headers:{Authorization: "Bearer ".concat(getState().token)}
        };
        return axios.post(constant.server+'/items/delete', itemData,config).then(function (res) {
            dispatch(getAllItems());
        }).catch(error => {
            console.log(error.response);
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}


export const getItemsByCategory = function (categoty) {
    return function (dispatch, getState) {
        dispatch(startLoading());
        //constant.server+'/items/getAll'
        //'http://localhost:8080/items/getAll'

        let config = {
            headers:{Authorization: "Bearer ".concat(getState().token)}
        };
        console.log(config);
        return axios.get(constant.server+'/items/getByCategory?category='+categoty, config).then(function (res) {
            console.log(res);
            dispatch({
                type: "getAllItems",
                payload: res.data
            });
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error.response);
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}

export const getAllCategory = function () {
    return function (dispatch, getState) {
        dispatch(startLoading());
        //constant.server+'/items/getAll'
        //'http://localhost:8080/items/getAll'

        let config = {
            headers:{Authorization: "Bearer ".concat(getState().token), 'Content-Type': 'text/plain'}
        };
        console.log(config);
        return axios.get(constant.server+'/category/getAll', config).then(function (res) {
            console.log(res);
            dispatch({
                type: "getCategory",
                payload: res.data
            });
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error.response);
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}

export const startLoading = function () {
    return function (dispatch) {
         dispatch({
                type: "startLoading",
                payload: true
        });
    }
}

export const stopLoading = function () {
    return function (dispatch) {
        dispatch({
            type: "stopLoading",
            payload: false
        });
    }
}

export const openDialog = function (payload) {
    return function (dispatch) {
        dispatch({
            type: "openDialog",
            payload: payload
        });
    }
}

export const closeDialog = function () {
    return function (dispatch) {
        dispatch({
            type: "closeDialog",
            payload: null
        });
    }
}

export const toggleMenu = function (payload) {
    return function (dispatch) {
        dispatch({
            type: "toggleMenu",
            payload: payload
        });
    }
}


export const userSignin = function (userData) {
    return function (dispatch) {
        dispatch(setMsg(null));
        dispatch(startLoading());
        //constant.server+'/items/getAll'
        //'http://localhost:8080/items/getAll'
        return axios.post(constant.server+'/users/signin',userData, {
            headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json"}
        }).then(function (res) {
            console.log(res);
            dispatch(setToken(res.data));

            dispatch(setUser());

            localStorage.setItem("token", res.data);

            dispatch(redirect("/repository"));
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error);
            dispatch(setMsg({
                type: "error",
                text:JSON.stringify(error)
            }));
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}


export const userSignup = function (userData) {
    return function (dispatch) {
        dispatch(setMsg(null));
        dispatch(startLoading());
        //constant.server+'/items/getAll'
        //'http://localhost:8080/items/getAll'
        return axios.post(constant.server+'/users/signup',userData, {
            headers: { "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json"}
        }).then(function (res) {
            console.log(res);
            //dispatch(setToken(res.data));

            //localStorage.setItem("token", res.data);

            dispatch(setMsg({
                type: "green",
                text:"Sign up success, Please sign in!"
            }));

            //dispatch(redirect("/repository"));
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error);
            dispatch(setMsg({
                type: "error",
                text:JSON.stringify(error)
            }));
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    }
}

export const setToken = function (token ) {
    return function (dispatch) {
        dispatch({
            type: "setToken",
            payload: token
        });
    };
}


export const setUser = function () {
    return function (dispatch, getState){
        dispatch(startLoading());
        let config = {
            headers:{Authorization: "Bearer ".concat(getState().token)}
        };

        return axios.get(constant.server+'/users/me', config).then(function (res) {
            console.log(res);
            dispatch({
                type: "setUser",
                payload: res.data
            });
            //dispatch(stopLoading());
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        }).catch(error => {
            console.log(error.response);
            setTimeout(function () {
                dispatch(stopLoading());
            },1000);
        });
    };
}

//handle redirect instead of using a tag href
//https://stackoverflow.com/questions/44246856/redux-loses-state-when-navigating-to-another-page
export  const redirect = function (url) {
    return function (dispatch, getState) {
        dispatch(push(url));
    };
}

export const setMsg= function(error) {
    return function (dispatch) {
        dispatch({
            type: "setMsg",
            payload: error
        });
    }
}

export const setSearchKeyword= function(keyword) {
    return function (dispatch) {
        dispatch({
            type: "setSearchKeyword",
            payload: keyword
        });
    }
}