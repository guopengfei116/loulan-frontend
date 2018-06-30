app.controller("baseController", ["$scope", function($scope) {
    // 分页插件配置
    $scope.paginationConfig = {
        currentPage: 1,  // 当前页码
        totalItems: 10,  // 总数
        itemsPerPage: 10, // 每页大小
        perPageOptions: [10, 20, 30, 40, 50], // 可选每页大小
        onChange: () => $scope.reloadList()   // 上来就调用方法进行查询
    };

    $scope.reloadList = function() {
        $scope.findPage($scope.paginationConfig.currentPage, $scope.paginationConfig.itemsPerPage);
    };

    // 待删除列表
    $scope.delIds = [];

    // 多选框切换
    $scope.delChange = function(e, id) {
        if(e.target.checked) {
            $scope.delIds.push(id);
        }else {
            $scope.delIds = $scope.delIds.filter(v => v != id);
        }
    };
}]);