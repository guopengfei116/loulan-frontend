app.service("specificationService", ["$http", "baseService", function($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/specification";
    
    angular.extend(this, new baseService(urlPrefix));
    
}]);