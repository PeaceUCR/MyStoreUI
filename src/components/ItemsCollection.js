/**
 * Created by hea on 7/27/18.
 */

import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem, getAllItems, getAllCategory }from '../actions/index';

import ItemSection from './ItemSection';

class ItemsCollection extends Component {
    constructor(props){
        super(props);

        //this.menu =React.createRef();

        //this.props.getAllItems();
        //this.state ={showNotif: false};
        this.props.getAllItems();

        this.props.getAllCategory();
        this.renderItems = this.renderItems.bind(this);
    }

    renderItems(){
        if(this.props.items){
            return this.props.items.map(function (item, index, items) {
                if(this.props.searchKeyword&&this.props.searchKeyword.trim().length>0){

                    let key = this.props.searchKeyword.trim().toLowerCase();
                    let name = item.name.trim().toLowerCase();
                    if(name.indexOf(key)>-1){
                        return <ItemSection key={"item"+index} item = {item}/>;
                    }else{
                        return null;
                    }
                }

                return <ItemSection key={"item"+index} item = {item}/>
            }, this);
        }else {
            return <p>No Items Here</p>
        }
    }

    render() {
        return <div className="items-collection">
            {this.renderItems()}
        </div>;
    }


}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addItem: addItem, getAllItems: getAllItems, getAllCategory: getAllCategory}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {items: state.items, searchKeyword: state.searchKeyword};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsCollection);