app.service("brandService", ["$http", "baseService", function($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/brand";

    angular.extend(this, new baseService(urlPrefix));
    
}]);