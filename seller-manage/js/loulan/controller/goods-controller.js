app.controller("goodsController", ["$controller", "$scope", "goodsService", function ($controller, $scope, goodsService) {
    // 继承
    $controller("baseController", { $scope });

    $scope.goodsSearch = {
        page: 1,
        size: 10,
        goodsSearch: ""
    }

    // 列表初始化

    $scope.findPage = function () {
        goodsService.findPage($scope.goodsSearch.page, $scope.goodsSearch.size, $scope.goodsSearch.goodsSearch)
            .then(resp => {
                $scope.list = resp.data.list;
                $scope.paginationConfig.totalItems = resp.data.total;
            });
    };

    // 删除
    $scope.delete = function () {
        if ($scope.delIds.length < 1) {
            alert("请选择要删除的记录");
            return;
        }

        if (confirm("你确定要删除吗")) {
            // 保存成功，刷新列表，清除数据
            goodsService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if (resp.data.success) {
                        $scope.findPage();
                    }
                });
        }
    };

    // 改变商家状态
    $scope.changeStatus = function(status){
        console.log($scope.delIds.length)
        if ($scope.delIds.length  < 1 ) {
            alert("请选择至少 1 条记录");
            return;
        }
        let ids = $scope.delIds;
        goodsService.changeStatus(ids, status)
        .then(resp => {
            alert(resp.data.message);
            if(resp.data.success) {
                alert("修改成功");
                $scope.reloadList();
            }
        });
    };


    $scope.findPage()

}]);
