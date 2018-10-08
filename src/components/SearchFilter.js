/**
 * Created by hea on 8/16/18.
 */

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openDialog, setSearchKeyword }from '../actions/index';
class SearchFilter extends Component {
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);

        this.handleChange = this.handleChange.bind(this);

        this.input =React.createRef();

        this.state = {
            expand : false
        }
    }

    render() {
        return <div className="search-filter">
            <i onClick={this.toggle} className="fas fa-search"></i>
            <input ref={this.input} type="text" className={this.state.expand?"":"shrink"} onChange={this.handleChange} />
        </div>;
    }

    componentDidUpdate(){
        if(this.state.expand){
            this.input.current.focus();
        }
    }


    handleChange(){
        //console.log(this.input.current.value);
        this.props.setSearchKeyword(this.input.current.value);
    }

    toggle(){
        this.setState({
            expand: !this.state.expand
        })
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({openDialog: openDialog,  setSearchKeyword: setSearchKeyword}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter);