/**
 * Created by hea on 8/2/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect , userSignup, setMsg}from '../actions/index';
class SignupForm extends Component {
    constructor(props){
        super(props);
        this.handleSignup =this.handleSignup.bind(this);
        this.renderMsg = this.renderMsg.bind(this);
        this.validate = this.validate.bind(this);
        this.name =React.createRef();
        this.password =React.createRef();
        this.email =React.createRef();
    }

    componentWillMount(){
        this.props.setMsg(null);
    }

    render() {
        return <div className="gate-form">
            <h1 className="title">Signup</h1>
            <div className="form-field"><i className="fas fa-envelope"></i><input ref={this.email} placeholder="Email" type="email"/></div>
            <div className="form-field"><i className="fas fa-user"></i><input ref={this.name} placeholder="Username" type="text"/></div>
            <div className="form-field"><i className="fas fa-unlock-alt"></i><input ref={this.password} placeholder="Password" type="password"/></div>
            {this.renderMsg()}
            <div><button onClick={this.handleSignup}>Signup</button></div>
            <div>Or <span onClick={()=>{this.props.redirect("/signin")}}>Sign in now</span></div>
        </div>;
    }

    renderMsg(){
        if(this.props.msg){
            return <div className={this.props.msg.type ==="error"?"error":"green"}>{this.props.msg.text}</div>
        }
    }

    handleSignup(){

        if(this.validate()){
            this.props.userSignup({
                "username": this.name.current.value,
                "password": this.password.current.value,
                "email": this.email.current.value,
                "role":"admin"
            });
        }else{
            this.props.setMsg({
                type: "error",
                text: "Invalid Input!"
            });
        }

    }

    validate(){
        if(this.name.current.value.trim().length>0&&this.password.current.value.trim().length>0&&this.validateEmail(this.email.current.value.trim())){
            return true;
        }

        return false;
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({redirect: redirect, userSignup: userSignup, setMsg:setMsg}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {msg: state.msg};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);