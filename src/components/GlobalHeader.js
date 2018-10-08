/**
 * Created by hea on 8/2/18.
 */

import React, {Component} from 'react';

import SearchFilter from '../components/SearchFilter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openDialog, toggleMenu}from '../actions/index';
class GlobalHeader extends Component {
    constructor(props){
        super(props);

        this.renderSearch = this.renderSearch.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.renderNavigation = this.renderNavigation.bind(this);
    }


    renderSearch(){
        if(this.props.router.location.pathname&&(this.props.router.location.pathname ==='/'||this.props.router.location.pathname==='/signin'||this.props.router.location.pathname==='signup')){
            return null
        }

        return <SearchFilter/>
    }

    renderMenu(){
        if(this.props.router.location.pathname&&(this.props.router.location.pathname ==='/'||this.props.router.location.pathname==='/signin'||this.props.router.location.pathname==='signup')){
            return null
        }else{
            return <div className="menu-icon"><i className="fas fa-bars" onClick={()=> this.props.toggleMenu(!this.props.menu.isOpen)}></i></div>
        }
    }

    renderNavigation(){
        if(this.props.router.location.pathname&&this.props.router.location.pathname ==='/shopping'){
            return  <div className="second-row"><span>Shopping</span><span>My Cart</span><span>Tracking Order</span></div>;
        }else {
            return null;
        }
    }

    render() {
        return <div className="global-header">
            <div className="first-row">
                <h1><i className="fas fa-store"></i>My Store</h1>
                <div className="right-icons">
                    {this.renderSearch()}
                    {this.renderMenu()}
                </div>
            </div>
            {this.renderNavigation()}

        </div>;
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({openDialog: openDialog, toggleMenu: toggleMenu}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {menu: state.menu, router: state.router};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);