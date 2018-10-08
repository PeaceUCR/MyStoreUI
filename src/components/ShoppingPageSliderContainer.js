/**
 * Created by hea on 9/6/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect }from '../actions/index';

import ShoppingPageSlider from './ShoppingPageSlider';

class ShoppingPageSliderContainer extends Component {
    constructor(props){
        super(props);


        this.state = {
            current: 0
        }

        this.container =React.createRef();

        let that = this;
        /*
        setInterval(function () {
            that.setState({toggle: !that.state.toggle})
        },4000)
        */

        setInterval(function () {
            let index = that.state.current;
            index++;
            that.setState({current:index})
        },6000)

    }

    /* <ShoppingPageSlider data ={this.props.sample[1]} isCurrent={!this.state.toggle}/>
    *   <ShoppingPageSlider data ={this.props.sample[0]}  isCurrent={this.state.toggle}/>
    * */

    componentDidUpdate(){
        let that = this;

        that.container.current.classList.add("animating");

        that.container.current.style.transform = "translate3d("+ (-(that.state.current%2)*100) +"%,0,0)";

        //console.log(that.container.current.querySelectorAll(".slide__bg").length);
        let nodeList = that.container.current.querySelectorAll(".slide__bg");
        for(let i= 0; i<nodeList.length; i++){
            nodeList[i].style.transform = "translate3d("+ (that.state.current%2)*50 +"%,0,0)";
        }

        //that.container.current.querySelectorAll(".slide__bg").style.transform = "translate3d("+ (that.state.current%2)*50 +"%,0,0)";

        setTimeout(function() {
            that.container.current.classList.remove("animating");
        }, 2000);
    }

    render() {
        //console.log(this.state.current)
        return <div className="shopping-slider-container" >
                <div className="slider-rotator" ref={this.container}>
                    <ShoppingPageSlider data ={this.props.sample[0]}  currentIndex ={this.state.current%2===0}/>
                    <ShoppingPageSlider data ={this.props.sample[1]}  currentIndex ={this.state.current%2===1}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingPageSliderContainer);