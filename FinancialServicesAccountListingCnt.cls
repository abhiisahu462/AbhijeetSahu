/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-15-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   01-15-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public without sharing class FinancialServicesAccountListingCnt {
   
    
    @AuraEnabled
    public static List<Account> financialAccountsOnLoad(){
    	return [SELECT Id, Name, OwnerId, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = 'Financial Services' ORDER By Name];
    }
    
    @AuraEnabled
    public static List<Account> getFilteredFinancialAccounts(String searchkeyWord){
        String temp = '';
        if(String.isNotBlank(searchkeyWord)){
            temp = '%'+searchkeyWord+'%';
            return [SELECT Id, Name, OwnerId, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = 'Financial Services' AND Name Like :temp ORDER By Name];
        }else{
             return [SELECT Id, Name, OwnerId, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = 'Financial Services' ORDER By Name];
        }
    }
    
    @AuraEnabled
    public static List<Account> sortFilteredFinancialAccounts(String searchkeyWord, String sortByField, String sortOrder){
        String temp = '';
        String queryStr = 'SELECT Id, Name, OwnerId, Owner.Name, Phone, Website, AnnualRevenue FROM Account WHERE Industry = \'Financial Services\' ';
        if(String.isNotBlank(searchkeyWord)){
            queryStr += 'AND NAME Like \'%'+searchkeyWord+'%\' ';
        }
        queryStr += 'ORDER BY '+sortByField+' '+sortOrder;
        system.debug('Query Str------------>'+queryStr);
        List<Account> queryResults = new List<Account>();
        queryResults = Database.query(queryStr);
        return queryResults;
        
    }
    
}