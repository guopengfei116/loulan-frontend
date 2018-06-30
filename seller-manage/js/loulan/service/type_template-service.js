app.service("type_templateService", ["$http", "baseService", function($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/typeTemplate";

    angular.extend(this, new baseService(urlPrefix));

    this.brandList = function(){
        return $http.get(`${domain}/brand/selectOptionList.do`);
    }
    
    this.specificationList = function(){
        return $http.get(`${domain}/specification/selectOptionList.do`);
    }
    
}]);