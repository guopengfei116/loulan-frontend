app.service("typeTemplateService", ["$http", "domain", "baseService", function ($http, domain, baseService) {

    // 请求前缀
    let urlPrefix = domain + "/typeTemplate";
    let headers = { crossDomain: true };

    angular.extend(this, new baseService(urlPrefix));

    this.brandList = function () {
        return $http.get(`${domain}/brand/selectOptionList.do`, { withCredentials: true });
    }

    this.specificationList = function () {
        return $http.get(`${domain}/specification/selectOptionList.do`, { headers, withCredentials: true });
    }

}]);