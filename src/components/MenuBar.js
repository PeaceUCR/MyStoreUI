/**
 * Created by hea on 8/28/18.
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllItems , getItemsByCategory}from '../actions/index';
class MenuBar extends Component {
    constructor(props){
        super(props);

        this.renderUserSection = this.renderUserSection.bind(this);
        this.renderCategoryList = this.renderCategoryList.bind(this);
        this.handleCategoryClick = this.handleCategoryClick.bind(this);

        this.state = { selected : "All" };
    }

    renderUserSection(){
        if(this.props.user){
            return <div className="user-section">
                        <i className="avatar">{this.props.user.username.charAt(0)}</i>
                        <div>
                            <p>{this.props.user.username}</p>
                            <p>{this.props.user.email}</p>
                        </div>
                    </div>
        }else{
            return <p>Unknown User?</p>;
        }
    }


    renderCategoryList(){
        if(this.props.category.length>0){
            return <div className="category-list">
                <p className={this.state.selected ==="All"? "selected": ""} onClick={()=>this.handleCategoryClick("All")}>All</p>
                {this.props.category.map(function (item, index, items) {
                    return <p key={"category-item-menu"+index} onClick={()=>this.handleCategoryClick(item)} className={this.state.selected === item.name? "selected": ""}>{item.name}</p>
                }, this)}
            </div>
        }else{
            return <p>No Category</p>;
        }
    }

    handleCategoryClick(category){
        console.log(category);
        if(category ==="All"){
            if(this.state.selected !=="All"){
                this.props.getAllItems();
                this.setState({
                    selected: "All"
                });
            }
        }else{
            if(this.state.selected!==category.name){
                this.props.getItemsByCategory(category.name);
                this.setState({
                    selected: category.name
                });
            }
        }
    }


    render() {
        return <div className={this.props.menu.isOpen?"menu-bar":"menu-bar hide"}>
                {this.renderUserSection()}
                {this.renderCategoryList()}
        </div>;
    }
    /*
     //https://stackoverflow.com/questions/41554365/react-ref-returns-a-connect-object-instead-of-dom/41554546
     //if ref is export connect component,
     //need some special treatment
     handleOpenDialog(){
     this.dialog.current.getWrappedInstance().setState({
     isOpen: true
     });
     }
     */

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getAllItems: getAllItems, getItemsByCategory: getItemsByCategory}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, menu: state.menu, category: state.category};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
