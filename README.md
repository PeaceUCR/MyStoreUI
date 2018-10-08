UI part for https://github.com/PeaceUCR/MyStore

in LoginForm.js the request will based on username/email test for CORS access in Spring-POSTGRES


Please check line 47 set username/email based on server
    
    //get child component ref when child is exported connected component
    //https://stackoverflow.com/questions/41554365/react-ref-returns-a-connect-object-instead-of-dom/41554546
    //if ref is export connect component,
    //need some special treatment
    handleOpenDialog(){
        this.dialog.current.getWrappedInstance().setState({
            isOpen: true
        });
    }
    export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})(ItemAddDialog);

