/**
 * Created by hea on 9/6/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect }from '../actions/index';

import ShoppingPageSliderContainer from '../components/ShoppingPageSliderContainer'

class ShoppingPage extends Component {
    constructor(props){
        super(props);
    }


    render() {
        return <div className="shopping-page">
            <ShoppingPageSliderContainer
                sample = {[
                            {title: "Shopping Ads Here", details:"Put your items here for highlights~", link: "Learn more"},
                            {title: "View and Compare", details:"Currently I am working on the web crawler, to provide the item information from Amazon , Walmart, Costco......", link: "Learn more"}
            ]}/>
        </div>;
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({redirect: redirect }, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {menu: state.menu};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPage);