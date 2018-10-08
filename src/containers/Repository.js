/**
 * Created by hea on 6/18/18.
 */
import React, {Component} from 'react';
import ItemsCollection from '../components/ItemsCollection';
import ItemAddDialog from '../components/ItemAddDialog';
import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openDialog ,  redirect}from '../actions/index';
class Repository extends Component {
    constructor(props){
        super(props);

        this.handleOpenDialog = this.handleOpenDialog.bind(this);

        this.dialog =React.createRef();
    }

    componentWillMount(){
        if(this.props.token){

        }else{
            this.props.redirect("/signin");
        }
    }

    render() {
        return <div className="main-body">
            <i id = "addBtn" onClick={this.handleOpenDialog} className="fas fa-plus-circle shine-animate"></i>
            <ItemAddDialog ref={this.dialog}/>
            <ItemsCollection/>
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
    handleOpenDialog(){
      this.props.openDialog();
    }
}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({openDialog: openDialog, redirect:redirect}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {token: state.token};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
