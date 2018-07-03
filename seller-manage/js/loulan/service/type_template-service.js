app.service("typeTemplateService", ["$http", "baseService", function ($http, baseService) {

    let domain = "http://loulan.com";
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