/**
 * Created by hea on 7/27/18.
 */


import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem, getAllItems,deleteItem, openDialog }from '../actions/index';

class ItemSection extends Component {
    constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    /*
    render() {
        if(this.props.item){
            return <div className="item-div">
                <div className="name"><span>{this.props.item.name}</span></div>
                <div className="brand"><span>{this.props.item.brand}</span></div>
                <div className="price"><span>{this.props.item.price}</span></div>
                <div className="img"><span>{this.props.item.attachmentUrls.map(function (item, index, items) {
                    return <img key={"img"+index} src={item}></img>;
                })}</span></div>
            </div>
        }else{
            return <p>No Item Information Available</p>
        }
    }
    */
    render() {
        if(this.props.item){
            return <div className="item-div">
                <div className="icons"><i onClick={this.handleEdit} className="fas fa-edit"></i><i onClick={this.handleDelete} className="fas fa-trash"></i></div>
                <div className="name"><span>{this.props.item.name}</span></div>
                <div className="brand"><span>{this.props.item.brand}</span></div>
                <div className="price"><span>&#36;</span><span>{this.props.item.price}</span></div>
                <div className="img"><img src={this.props.item.attachmentUrls[0]}></img></div>
                <div className="specifications-item">{this.props.item.specifications.map(function (item, index, items) {
                    return <span key={index+"specification"}>{item} </span>
                })}</div>
                <div className="addDate">{new Date(this.props.item.dateCreated).toLocaleString()}</div>
            </div>
        }else{
            return <p>No Item Information Available</p>
        }
    }

    handleDelete(){
        this.props.deleteItem({"id": this.props.item.id});
    }

    handleEdit(){
        this.props.openDialog(this.props.item);
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteItem: deleteItem, openDialog: openDialog}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSection);