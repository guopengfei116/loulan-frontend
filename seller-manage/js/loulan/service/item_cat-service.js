app.service("itemCatService", ["$http", "domain", "baseService", function($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/itemCat";
    let headers = { crossDomain: true };
    
    angular.extend(this, new baseService(urlPrefix));

    this.findByParentId = function (id) {
        var params =id;
        // return $http.post(`${urlPrefix}/updateStatus.do`,   params );
        return $http.get(`${urlPrefix}/findByParentId.do`, { params, headers, withCredentials: true });
    }

    this.templateList = function () {
        return $http.get(`${domain}/typeTemplate/selectOptionList.do`, { withCredentials: true });
    }

}]);