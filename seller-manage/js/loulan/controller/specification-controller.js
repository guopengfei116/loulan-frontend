app.controller("specificationController", ["$controller", "$scope", "specificationService", function($controller, $scope, specificationService) {
    // 继承
    $controller("baseController", {$scope});

    // 品牌实体对象
    $scope.specificationSearch = {
        specName: "",
    };
    $scope.specification = {
        specification: {
            id: "",
            specName: ""
        },
        specificationOptionList: []
    };

    // 分页条件查询
    $scope.findPage = function(page, size) {
        specificationService.findPage(page, size, $scope.specificationSearch)
            .then(resp => {
                $scope.list = resp.data.list;
                $scope.paginationConfig.totalItems = resp.data.total;
            });
    };

    // 保存 => 新增 || 修改
    $scope.save = function() {
        // 如果实体对象中有id，那么证明是编辑
        let method = $scope.specification.specification.id? "update": "add";
        specificationService[method]($scope.specification)
            .then(resp => {
                alert(resp.data.message);
                if(resp.data.success) {
                    $scope.reloadList();
                    $scope.specification = {
                        specification: {},
                        specificationOptionList: []
                    };
                }
            });
    };

    // 数据回显
    $scope.findOne = function(id) {
        specificationService.findOne(id)
            .then(resp => {
                $scope.specification = resp.data;  // 请求回来的数据进行回显编辑
            });
    };

    // 删除
    $scope.delete = function() {
        if($scope.delIds.length < 1) {
            alert("请选择要删除的记录"); 
            return;
        }

        if(confirm("你确定要删除吗")) {
            specificationService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if(resp.data.success) {
                        $scope.delIds = [];
                        $scope.reloadList();
                    }
                });
        }
    };

    //新增规格选项
    $scope.addOption = function () {
        $scope.specification.specificationOptionList.push({});
    };

    //删除规格选项
    $scope.deleteOption = function (index) {
        $scope.specification.specificationOptionList.splice(index, 1);
    };
}]);