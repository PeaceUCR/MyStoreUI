/**
 * Created by hea on 9/6/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect }from '../actions/index';

class ShoppingPageSlider extends Component {
    constructor(props){
        super(props);
        console.log(props.data);

    }


    render() {
        return    <div class={this.props.currentIndex? "slide active":"slide"}>
            <div class="slide__bg"></div>
            <div class="slide__content">
                <svg class="slide__overlay" viewBox="0 0 720 405" preserveAspectRatio="xMaxYMax slice">
                    <path class="slide__overlay-path" d="M0,0 150,0 500,405 0,405" />
                </svg>
                <div class="slide__text">
                    <h2 class="slide__text-heading">{this.props.data.title}</h2>
                    <p class="slide__text-desc">{this.props.data.details}</p>
                    <a class="slide__text-link">{this.props.data.link}</a>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPageSlider);