app.service("sellerService", ["$http", "domain", "baseService", function ($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/seller";
    let headers = { crossDomain: true };

    angular.extend(this, new baseService(urlPrefix));

    this.changeStatus = function (id, status) {
        var params = { id: id, status: status };
        // return $http.post(`${urlPrefix}/updateStatus.do`,   params );
        return $http.get(`${urlPrefix}/updateStatus.do`, { params, headers, withCredentials: true });
    }

}]);