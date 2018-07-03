app.service("itemCatService", ["$http", "baseService", function($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/itemCat";
    let headers = { crossDomain: true };
    
    angular.extend(this, new baseService(urlPrefix));

    this.findByParentId = function (id) {
        var params =id;
        // return $http.post(`${urlPrefix}/updateStatus.do`,   params );
        return $http.get(`${urlPrefix}/findByParentId.do`, { params, headers, withCredentials: true });
    }

}]);