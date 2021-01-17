({
   
    getData : function(component, event, helper){
        var action = component.get("c.financialAccountsOnLoad");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                if(response.getReturnValue().length > 0){
        			var records =response.getReturnValue();
                   	component.set("v.SortOrder","Name (a to z)");
                	component.set("v.financialAccounts", records);
        		}else{
        
        		}
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        
    },
    
    getFilteredAccounts : function(component, event, helper){
        
        var action = component.get("c.getFilteredFinancialAccounts");
        action.setParams({ searchkeyWord : component.get("v.searchKeyWord") });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                component.set("v.financialAccounts", records);
                component.set("v.SortOrder","Name (a to z)");
                if(!(records.length > 0)){
                    
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    handleSort: function(component, event, helper) {
        var sortOrderSelected = component.get("v.sortOrder");
        var sortField = '';
        var sortOrderBy = '';
        if(sortOrderSelected.split(" ")[0] =='Name'){
            if(sortOrderSelected.split(" ")[1] =='(a'){
                sortOrderBy = 'Asc';
            }else{
                sortOrderBy = 'Desc';
            }
			sortField = 'Name';            
        }else{
            if(sortOrderSelected.split(" ")[1] =='(a'){
                sortOrderBy = 'Asc';
            }else{
                sortOrderBy = 'Desc';
            }
            sortField = 'Owner.Name';   
        }
        var action = component.get("c.sortFilteredFinancialAccounts");
        action.setParams({ searchkeyWord : component.get("v.searchKeyWord"),
                          sortByField :sortField,
                          sortOrder: sortOrderBy});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                component.set("v.financialAccounts", records);
                //component.set("v.SortOrder","Name (a to z)");
                if(!(records.length > 0)){
                    
                }
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    prepopulateValues : function (component, event, helper, selectedRecordId){
        var accounts = component.get("v.financialAccounts");
        for(var i=0; i<accounts.length;i++){
            if(accounts[i].Id == selectedRecordId){
                component.find("PopupName").set("v.value", accounts[i].Name);
        		component.find("PopupPhone").set("v.value", accounts[i].Phone);
        		component.find("PopupWebsite").set("v.value", accounts[i].Website);
        		component.find("PopupRevenue").set("v.value", accounts[i].AnnualRevenue);
            }
        }
    }
})
