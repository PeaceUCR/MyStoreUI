/**
 * Created by hea on 8/2/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect, userSignin, setMsg}from '../actions/index';
class LoginForm extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderMsg = this.renderMsg.bind(this);
        this.validate = this.validate.bind(this);

        this.name =React.createRef();
        this.password =React.createRef();
    }

    renderMsg(){
        console.log(this.props.msg);
        if(this.props.msg){
            return <div className={this.props.msg.type ==="error"?"error":"green"}>{this.props.msg.text}</div>
        }
    }

    componentWillMount(){
        this.props.setMsg(null);
    }

    render() {
        return <div className="gate-form">
            <h1 className="title">Login</h1>
            <div className="form-field"><i className="fas fa-user"></i><input ref={this.name} placeholder="Username" type="text"/></div>
            <div className="form-field"><i className="fas fa-unlock-alt"></i><input ref={this.password} placeholder="Password" type="password"/></div>
            {this.renderMsg()}
            <div><button onClick={this.handleLogin}>Login</button></div>
            <div>Or <span onClick={()=>{this.props.redirect("/signup")}}>Sign up now</span></div>
        </div>;
    }

    handleLogin(){

        if(this.validate()){
            this.props.userSignin({
                //"username": this.name.current.value,
                "email": this.name.current.value,
                "password": this.password.current.value
            });
        }else{
            this.props.setMsg({
               type: "error",
                text: "Invalid Input!"
            });
        }

    }

    validate(){
        if(this.name.current.value.trim().length>0&&this.password.current.value.trim().length>0){
            return true;
        }

        return false;
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({redirect: redirect, userSignin: userSignin, setMsg: setMsg}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {msg: state.msg};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);