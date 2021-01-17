({
    init: function(component, event, helper) {
        helper.getData(component, event, helper);
        
    },

    searchKeyChange : function(component, event, helper){
        var getInputkeyWord = component.get("v.searchKeyWord");
        helper.getFilteredAccounts(component, event, helper);
    },
    
    sortRecords : function(component,event, helper){
        debugger;
        var SortOrder = component.find('sortDropDown').get('v.value');
        component.set("v.sortOrder",SortOrder);
        helper.handleSort(component,event, helper);
    },
    
    handleEditRecord : function(component, event, helper){
        var accountSelected = event.getSource().get("v.name");
        if(accountSelected){
            component.set("v.financialAccountModificationId",accountSelected);
            component.set("v.isModalOpen", true);
           
            helper.prepopulateValues(component, event, helper,accountSelected);
        }
    },
    
    closeModel : function(component, event, helper){
    	component.set("v.isModalOpen", false);
        component.set("v.financialAccountModificationId","");
        
        helper.handleSort(component, event, helper);
	},
    
    handleOnLoad : function(component, event, helper) {
          
    },
      
    handleOnSubmit : function(component, event, helper) {
          //event.preventDefault(); //Prevent default submit
    },
      
    handleOnSuccess : function(component, event, helper) {
        
        component.set("v.isModalOpen", false);
        component.set("v.financialAccountModificationId","");
        
        var param = event.getParams(); //get event params
        var fields = param.response.fields; //get all field info
        var childRelationships = param.response.childRelationships; //get child relationship info
        var recordTypeInfo = param.response.recordTypeInfo; //get record type info
        var recordId = param.response.id; //get record id
         
        console.log('Param - ' + JSON.stringify(param)); 
        console.log('Fields - ' + JSON.stringify(fields)); 
        console.log('Child Relationship - ' + JSON.stringify(childRelationships)); 
        console.log('Record Type Info - ' + JSON.stringify(recordTypeInfo)); 
        console.log('Record Id - ' + JSON.stringify(recordId)); 
        
        helper.getData(component, event, helper);
    },
    handleOnError : function(component, event, helper) {
          
    },
})
