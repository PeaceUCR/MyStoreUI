/**
 * Created by hea on 7/27/18.
 */


import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addItem, getAllItems, closeDialog, openDialog }from '../actions/index';
import {constant} from '../constants';
import axios from 'axios';

// if this.props.dialog.data means edit or new
class ItemAddDialog extends Component {
    constructor(props){
        super(props);

        this.name =React.createRef();
        this.brand =React.createRef();
        this.price =React.createRef();
        this.img =React.createRef();
        this.quantity = React.createRef();
        this.specifications =React.createRef();

        this.fileLable =React.createRef();
        this.dialog =React.createRef();


        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddSpecification =this.handleAddSpecification.bind(this);
        this.reset =this.reset.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.preload = this.preload.bind(this);

        this.renderSpecifiations = this.renderSpecifiations.bind(this);

        this.renderAttachments = this.renderAttachments.bind(this);

        this.removeSpecificationsAt = this.removeSpecificationsAt.bind(this);

        this.validateDialogData = this.validateDialogData.bind(this);

        this.renderCategory = this.renderCategory.bind(this);
        this.enableCategoryItem = this.enableCategoryItem.bind(this);
        this.handleClickCategoryItem = this.handleClickCategoryItem.bind(this);

        //initialization empty
        this.state = {
            name: "",
            brand: "",
            price: "",
            quantity: "",
            attachmentUrls: [],
            specifications: [],
            itemCategory: [],
            isLoading: false
        }
    }

    preload(){
        if(this.props.dialog.data){
            this.name.current.value = this.props.dialog.data.name;
            this.brand.current.value = this.props.dialog.data.brand;
            this.price.current.value = this.props.dialog.data.price;
            this.quantity.current.value = this.props.dialog.data.quantity;
        }
    }


    renderAttachments(){
        let that= this;
        if(that.props.dialog.data){
            return that.props.dialog.data.attachmentUrls.map(function (item, index, items) {
                return <a key={index+"attachment"} href={item} target="_blank" >{(index+1)+".attachment"} </a>
            })
        }else{
            return that.state.attachmentUrls.map(function (item, index, items) {
                return <a key={index+"attachment"} href={item} target="_blank" >{(index+1)+".attachment"} </a>
            })
        }
    }


    renderSpecifiations(){
        let that= this;
       if(that.props.dialog.data){
           return that.props.dialog.data.specifications.map(function (item, index, items) {
               return <span key={index+"specification"}>{(index+1)+"."+item} <i className="fas fa-trash" onClick={()=>{that.removeSpecificationsAt(index)}}></i></span>
           })
       }else{
           return that.state.specifications.map(function (item, index, items) {
               return <span key={index+"specification"}>{(index+1)+"."+item} <i className="fas fa-trash" onClick={()=>{that.removeSpecificationsAt(index)}}></i></span>
           })
       }
    }


    renderCategory(){
        //console.log(this.props.category);
        if(this.props.category.length>0){
            return this.props.category.map(function (item, index, items) {
                return <span key={"category"+index} className={this.enableCategoryItem(item)?"selected":""} onClick={()=>{this.handleClickCategoryItem(index)}}>{item.name}<i className="fas fa-check-circle"></i></span>
            },this)
        }else{
            return <p>Sorry, no category here!</p>
        }
    }

    enableCategoryItem(item){
        if(this.props.dialog.data){
            return this.checkArrayContatins(this.props.dialog.data.itemCategory, item)>-1;
            /*
            for(let i=0; i<this.props.dialog.data.itemCategory.length; i++){
                if(this.props.dialog.data.itemCategory[i].name === item.name){
                    return true;
                }
            }
            return false;
            */
        }else{
            return this.checkArrayContatins(this.state.itemCategory, item)>-1;
            /*
            for(let i=0; i<this.state.itemCategory.length; i++){
                if(this.state.itemCategory[i].name === item.name){
                    return true;
                }
            }
            return false;
            */
        }

    }

    handleClickCategoryItem(index){
        console.log(index);
        if(this.props.dialog.data){
            let temp = JSON.parse(JSON.stringify(this.props.dialog.data));
            //check if exist
            let itemIndex = this.checkArrayContatins(temp.itemCategory, this.props.category[index]);
            if(itemIndex>-1){
                //if exist
                temp.itemCategory.splice(itemIndex, 1)
            }else{
                temp.itemCategory.push(this.props.category[index]);
            }
            //this.props.dialog.data.itemCategory = temp;
            this.props.openDialog(temp);
        }else{
            //console.log(JSON.stringify(this.state.itemCategory));
            let temp = this.state.itemCategory.length>0?JSON.parse(JSON.stringify(this.state.itemCategory)):[];
            //check if exist
            let itemIndex = this.checkArrayContatins(temp, this.props.category[index]);
            if(itemIndex>-1){
                //if exist
                temp.splice(itemIndex, 1)
            }else{
                temp.push(this.props.category[index]);
            }
            this.setState({itemCategory:temp});
        }

    }
    //return index
    checkArrayContatins(array, item){
        for(let i=0;i<array.length; i++) {
            if (array[i].name === item.name) {
                return i;
            }
        }
        return -1;

    }

    render() {
        //console.log(this.state);
        // the default only work once, use preload instead
        // https://stackoverflow.com/questions/30146105/react-input-defaultvalue-doesnt-update-with-state
        this.preload();

        return <div className={this.props.dialog.isOpen? "show item-dialog":"hide item-dialog"}  ref={this.dialog}>
            <h1 className="title">{this.props.dialog.data?"Edit your product here":"Add new product here"}</h1>
            <div className="name form-field"><label>Name:</label><input ref ={this.name} type="text" /></div>
            <div className="brand form-field"><label>Brand:</label><input ref ={this.brand} type="text" /></div>
            <div className="price form-field"><label>Price:</label><div><span>&#36;</span><input ref ={this.price}  type="text" /></div></div>
            <div className="quantity form-field"><label>Quantity:</label><input ref= {this.quantity} type="text" /></div>
            <div className="img file-upload"><label htmlFor="fileupload" ref ={this.fileLable}>Add Image Attachments</label><input id="fileupload" ref = {this.img} type="file" onChange={this.handleFileUpload} multiple/></div>
            <div className="attachment-item">
                {this.renderAttachments()}
            </div>
            <div className="specifications form-field"><label>Specification:</label><div><input ref ={this.specifications} type="text"/><i onClick={this.handleAddSpecification} className="fas fa-plus-circle"></i></div></div>
            <div className="specifications-item">
                {this.renderSpecifiations()}
            </div>
            <div className="category-item">
                {this.renderCategory()}
            </div>
            <div className="submit"><button onClick={this.handleSubmit}>Submit</button><button onClick={this.handleCancel}>Cancel</button></div>
        </div>;
    }


    //https://github.com/PeaceUCR/FileSysDemo/blob/master/public/javascripts/index.js
    //unlike in jquery
    handleFileUpload(e){
            //console.log(e.target.files[0]);

            this.setState({isLoading: true});
            let that = this;
            let promises = [];
            for(let i=0;i<e.target.files.length;i++){
                let myFormData = new FormData();
                myFormData.append('file',e.target.files[i]);
                promises.push( axios.post(constant.server+'/files/addFile',
                    myFormData,{
                        headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer "+that.props.token}
                    }));
                /*
                axios.post(constant.server+'/files/addFile',
                    myFormData,{
                    headers: { "Content-Type": "multipart/form-data"}
                }).then(function (response) {
                    console.log(response);
                }, function (err) {
                    console.log(err);
                });
                */
            }


            Promise.all(promises).then(function (responses) {

                let attchement = [];
                for(let j=0; j<responses.length; j++){
                    console.log(responses[j].data);
                    attchement.push(responses[j].data.url);
                }
                if(that.props.dialog.data){
                    let temp = JSON.parse(JSON.stringify(that.props.dialog.data));
                    temp["attachmentUrls"] = attchement;
                    that.props.openDialog(temp);
                }else{
                    that.setState({attachmentUrls: attchement,isLoading: false});
                }
                that.fileLable.current.innerHTML = responses.length+" files added success";
            });
    }

    handleAddSpecification(){
        if(this.props.dialog.data){
            if(this.specifications.current.value.trim().length>0){
                let temp = JSON.parse(JSON.stringify(this.props.dialog.data));
                temp.specifications.push(this.specifications.current.value.trim());
                this.props.openDialog(temp);

            }
        }else{
            if(this.specifications.current.value.trim().length>0){
                this.setState({specifications:[...this.state.specifications,this.specifications.current.value.trim()]});
                this.specifications.current.value = "";
            }
        }

    }

    handleSubmit(){
       // console.log(this.name.current);
        if(this.validateDialogData()){
            if(this.props.dialog.data){
                let temp = JSON.parse(JSON.stringify(this.props.dialog.data));
                temp.name = this.name.current.value;
                temp.brand = this.brand.current.value;
                temp.price =  this.price.current.value;
                temp.quantity = this.quantity.current.value;

                this.props.addItem(temp);

                this.reset();

                this.props.closeDialog();
            }else{
                console.log({
                    "name": this.name.current.value,
                    "brand": this.brand.current.value,
                    "price": this.price.current.value,
                    "quantity": this.quantity.current.value,
                    //"dateAdded": new Date().toISOString(),
                    "attachmentUrls": this.state.attachmentUrls,
                    "specifications": this.state.specifications,
                    "itemCategory": this.state.itemCategory
                });

                if(this.validateDialogData){
                    this.props.addItem({
                        "name": this.name.current.value,
                        "brand": this.brand.current.value,
                        "price": this.price.current.value,
                        "quantity": this.quantity.current.value,
                        //"dateAdded": new Date().toISOString(),
                        "attachmentUrls": this.state.attachmentUrls,
                        "specifications": this.state.specifications,
                        "itemCategory": this.state.itemCategory
                    });

                    this.reset();
                }

            }
        }

    }

    validateDialogData(){
        if(this.name.current.value.trim().length>0&&this.brand.current.value.trim().length>0&&this.price.current.value.trim().length>0&&this.quantity.current.value.trim().length>0){
            return true;
        }
        return false
    }

    reset(){
        this.name.current.value ="";
        this.brand.current.value ="";
        this.price.current.value ="";
        this.quantity.current.value ="";
        this.fileLable.current.innerHTML ="Add Image Attachments";

        this.setState({
            name: "",
            brand: "",
            price: "",
            quantity: "",
            attachmentUrls: [],
            specifications: [],
            itemCategory: [],
            isLoading: false
        });
    }

    handleCancel(){
        let that = this;
        setTimeout(function () {
            that.reset();
        }, 1000);

        this.props.closeDialog();
    }

    //https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    removeSpecificationsAt(index){
        console.log(index);
        if(this.props.dialog.data){
            let temp = JSON.parse(JSON.stringify(this.props.dialog.data));
            //temp.specifications = temp.specifications.splice(index, 1);
            temp.specifications.splice(index, 1)
            this.props.openDialog(temp)
        }else{
           //let temp = this.state.specifications.splice(index, 1);
           let temp = JSON.parse(JSON.stringify(this.state.specifications));
            temp.splice(index, 1);
           this.setState({specifications:temp});
        }
    }

}

//use this to call action creater in class by props
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addItem:addItem,getAllItems:getAllItems, closeDialog: closeDialog, openDialog: openDialog}, dispatch);
}

//use this to get app state in class by props
function mapStateToProps(state) {
    return {user: state.user, dialog: state.dialog, token: state.token, category: state.category};//just maintain only one level of state/ otherwise you can't get the child obj props
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ItemAddDialog);
//export default connect(null, null, null, {withRef: true})(ItemAddDialog);