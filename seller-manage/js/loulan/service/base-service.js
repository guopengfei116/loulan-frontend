
app.factory("baseService", ["$http", function($http) {

    // 返回一个构造器，用于创造公共service
    return function(urlPrefix) {

        // 分页查询
        this.findPage = function(page, size, entity) {
            var params = {page: page, size: size};
            return $http.post(`${urlPrefix}/search.do`, entity, {params});
        };

        // 查询
        this.findOne = function(id) {
            let params = {id: id};
            return $http.get(`${urlPrefix}/findOne.do`, {params});
        };

        // 新增
        this.add = function(entity) {
            return $http.post(`${urlPrefix}/add.do`, entity);
        };

        // 更新
        this.update = function(entity) {
            return $http.post(`${urlPrefix}/update.do`, entity);
        };

        // 批量删除
        this.delIds = function(ids) {
            let params = {ids: ids.toString()};
            return $http.get(`${urlPrefix}/deleteByIds.do`, {params});
        };

    };

}]);