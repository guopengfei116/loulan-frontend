app.controller("brandController", ["$controller", "$scope", "brandService", function($controller, $scope, brandService) {
    // 继承
    $controller("baseController", {$scope});

    // 品牌实体对象
    $scope.brandSearch = {
        name: "",
        firstChar: ""
    };
    $scope.brand = {
        id: "",
        name: "",
        firstChar: ""
    };

    // 分页条件查询
    $scope.findPage = function(page, size) {
        brandService.findPage(page, size, $scope.brandSearch)
            .then(resp => {
                $scope.list = resp.data.list;
                $scope.paginationConfig.totalItems = resp.data.total;
            });
    };

    // 保存 => 新增 || 修改
    $scope.save = function() {
        // 如果实体对象中有id，那么证明是编辑
        let method = $scope.brand.id? "update": "add";
        brandService[method]($scope.brand)
            .then(resp => {
                alert(resp.data.message);
                if(resp.data.success) {
                    $scope.reloadList();
                    $scope.brand = {name: "", firstChar: "", id: ""};
                }
            });
    };

    // 数据回显
    $scope.findOne = function(id) {
        brandService.findOne(id)
            .then(resp => {
                $scope.brand = resp.data;  // 请求回来的数据进行回显编辑
            });
    };

    // 删除
    $scope.delete = function() {
        if($scope.delIds.length < 1) {
            alert("请选择要删除的记录"); 
            return;
        }

        if(confirm("你确定要删除吗")) {
            brandService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if(resp.data.success) {
                        $scope.delIds = [];
                        $scope.reloadList();
                    }
                });
        }
    };
}]);