app.service("item_catService", ["$http", "baseService", function($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/item_cat";
    
    angular.extend(this, new baseService(urlPrefix));
    
}]);