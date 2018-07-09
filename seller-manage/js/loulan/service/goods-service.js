app.service("goodsService", ["$http", "domain", "baseService", function($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/goods";
    let headers = { crossDomain: true };
    
    angular.extend(this, new baseService(urlPrefix));

    this.changeStatus = function (ids, status) {
        var params = { ids: ids, status: status };
        return $http.post(`${urlPrefix}/updateMoreStatus.do`, null, {params, headers, withCredentials: true} );
    }
}]);