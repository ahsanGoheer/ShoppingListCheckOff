(function(){
'use strict';

angular.module("ShoppingListCheckOff",[])
.controller("ToBuyListController",ToBuyListController)
.controller("AlreadyBoughtListController",AlreadyBoughtListController)
.service("ShoppingListCheckOffService",ShoppingListCheckOffService);

ToBuyListController.$inject=["ShoppingListCheckOffService"];
function ToBuyListController(ShoppingListCheckOffService)
{
    var toBuyList=this;
    
    toBuyList.items=ShoppingListCheckOffService.getItemsToBuy();
    toBuyList.itemBought=function(itemIndex)
    {
        ShoppingListCheckOffService.buyItem(itemIndex);
    }
    toBuyList.isEverythingBought=function()
    {
        return ShoppingListCheckOffService.checkToBuyList();
    }

}


AlreadyBoughtListController.$inject=["ShoppingListCheckOffService"];
function AlreadyBoughtListController(ShoppingListCheckOffService)
{

    var AlreadyBoughtList=this;
    AlreadyBoughtList.isEmpty = function()
    {
        return ShoppingListCheckOffService.checkBoughtItems();
    }
    AlreadyBoughtList.items=ShoppingListCheckOffService.getBoughtItems(AlreadyBoughtList.hasData);
        
    
}

function ShoppingListCheckOffService()
{
    var service = this;
    service.isBoughtEmpty=true;
    var ToBuyitems = [
        {name:"Cookie",quantity:10},
        {name:"Crisps",quantity:5},
        {name:"Crackers",quantity:15},
        {name:"Coke",quantity:12},
        {name:"Chocolates",quantity:5}
    ];
    var boughtItems=[];

    service.getItemsToBuy= function()
    {
        return ToBuyitems;
    }
    service.buyItem=function(itemIndex)
    {
        var itemBought=ToBuyitems.splice(itemIndex,1);
        boughtItems.push(itemBought[0]);
        service.isBoughtEmpty=false;
    }
    service.getBoughtItems=function()
    {
        return boughtItems;
    }
   service.checkBoughtItems=function()
   {
    return service.isBoughtEmpty;
   }
   service.checkToBuyList=function()
   {
    return ToBuyitems.length===0;
   }

}







})();