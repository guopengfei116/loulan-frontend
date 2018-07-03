app.service("sellerService", ["$http", "baseService", function ($http, baseService) {

    let domain = "http://loulan.com";
    let urlPrefix = domain + "/seller";
    let headers = { crossDomain: true };

    angular.extend(this, new baseService(urlPrefix));

    this.changeStatus = function (id, status) {
        var params = { id: id, status: status };
        // return $http.post(`${urlPrefix}/updateStatus.do`,   params );
        return $http.get(`${urlPrefix}/updateStatus.do`, { params, headers, withCredentials: true });
    }

}]);