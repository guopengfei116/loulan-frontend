app.service("specificationService", ["$http", "domain", "baseService", function($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/specification";
    
    angular.extend(this, new baseService(urlPrefix));
    
}]);