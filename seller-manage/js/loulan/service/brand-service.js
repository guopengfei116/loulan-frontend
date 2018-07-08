app.service("brandService", ["$http", "domain", "baseService", function($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/brand";

    angular.extend(this, new baseService(urlPrefix));
    
}]);