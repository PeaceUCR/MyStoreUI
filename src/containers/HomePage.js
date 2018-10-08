/**
 * Created by hea on 8/30/18.
 */
import React, {Component} from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { redirect }from '../actions/index';

class HomePage extends Component {
    constructor(props){
        super(props);

    }


    render() {
        return <div className="home-page">
            <div className="container">
                <div className="shadow-wrapper">
                    <div className="shadow">
                        <div></div>
                    </div>
                </div>
                <div className="box-wrapper">
                    <div className="box-faces">
                        <div className="box-face box-face--is-front">
                            <p className="option" onClick={()=>this.props.redirect('/shopping')}>
                                <i className="fas fa-shopping-cart"></i>Shopping
                            </p>
                        </div>
                        <div className="box-face box-face--is-top">&nbsp;</div>
                        <div className="box-face box-face--is-bottom">&nbsp;</div>
                        <div className="box-face box-face--is-left">
                            <p className="option" onClick={()=>this.props.redirect('/tracking')}><i className="fas fa-thumbtack"></i>Tracking Order</p>
                        </div>
                        <div className="box-face box-face--is-back">
                            <p className="option" onClick={()=>this.props.redirect('/repository')}>
                                <i className="fas fa-cogs"></i>Manage Repository
                            </p>
                        </div>
                        <div className="box-face box-face--is-right">
                            <p>If you encounter any bug/error,</p>
                            <p>please contact </p>
                            <p><i className="fas fa-user-astronaut"></i>PingHe/Peace/Adam.</p>
                            <p><i className="fas fa-phone"></i>(+1)9512376173</p>
                            <p><i className="fas fa-envelope"></i>peace940814202@gmail.com</p>
                            <p><i className="fas fa-envelope"></i>phe004@ucr.edu</p>
                            <p><i className="fas fa-envelope"></i>adam.he@cdk.com</p>
                        </div>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);