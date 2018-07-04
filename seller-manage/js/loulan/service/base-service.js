app.factory("baseService", ["$http", function ($http) {

    // 跨域认证请求头
    let headers = { crossDomain:true };

    // 返回一个构造器，用于创造公共service
    return function(urlPrefix) {

        // 分页查询
        this.findPage = function(page, size, entity) {
            var params = {page: page, size: size};
            return $http.post(`${urlPrefix}/findPageByWhere.do`, entity, {params, headers, withCredentials: true});
        };

        // 查询
        this.findOne = function(id) {
            let params = {id: id};
            return $http.get(`${urlPrefix}/findOne.do`, {params, headers, withCredentials: true});
        };

        // 新增
        this.add = function(entity) {
            return $http.put(`${urlPrefix}/add.do`, entity, {headers, withCredentials: true});
        };

        // 更新
        this.update = function(entity) {
            return $http.post(`${urlPrefix}/update.do`, entity, {headers, withCredentials: true});
        };

        // 批量删除
        this.delIds = function(ids) {
            let params = {ids: ids.toString()};
            return $http.delete(`${urlPrefix}/deleteMore.do`, {params, headers, withCredentials: true});
        };

    };

}]);