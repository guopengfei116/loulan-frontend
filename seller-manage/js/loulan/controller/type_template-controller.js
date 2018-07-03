

app.controller("typeTemplateController", ["$controller", "$scope", "typeTemplateService", function ($controller, $scope, typeTemplateService) {
    // 继承
    $controller("baseController", { $scope });

    // 实体对象
    $scope.typeTeamplateSearch = {
        name: "",
    };

    //  数据结构
    $scope.typeTemplate = {
        id: "",
        name: "",
        specIds: [],
        brandIds: [],
        customAttributeItems: []
    }

    // 查询品牌全部数据

    typeTemplateService.brandList()
        .then(resp => {
            $scope.brandList = {};
            $scope.brandList.data = resp.data;
        });


    // 查询规格全部数据
    typeTemplateService.specificationList()
        .then(resp => {
            $scope.specificationList = {};
            $scope.specificationList.data = resp.data;
        });


    // 分页条件查询
    $scope.findPage = function (page, size) {
        typeTemplateService.findPage(page, size, $scope.typeTeamplateSearch)
            .then(resp => {
                $scope.list = resp.data.list;
                $scope.paginationConfig.totalItems = resp.data.total;
            });
    };

    // 数据回显
    $scope.findOne = function (id) {
        typeTemplateService.findOne(id)
            .then(resp => {
                $scope.typeTemplate = resp.data;  // 请求回来的数据进行回显编辑
                $scope.typeTemplate.specIds = JSON.parse(resp.data.specIds);
                $scope.typeTemplate.brandIds = JSON.parse(resp.data.brandIds);
                $scope.typeTemplate.customAttributeItems = JSON.parse(resp.data.customAttributeItems);
            });
    };

    // 保存 => 新增 || 修改
    $scope.save = function () {
        // 如果实体对象中有id，那么证明是编辑
        let method = $scope.typeTemplate.id ? "update" : "add";
        typeTemplateService[method]($scope.typeTemplate)
            .then(resp => {
                alert(resp.data.message);
                if (resp.data.success) {
                    $scope.reloadList();
                    $scope.typeTemplate = {
                        id: "",
                        name: "",
                        specIds: [],
                        brandIds: [],
                        customAttributeItems: []
                    };
                }
            });
    };

    // 删除
    $scope.delete = function () {
        if ($scope.delIds.length < 1) {
            alert("请选择要删除的记录");
            return;
        }
        if (confirm("你确定要删除吗")) {
            typeTemplateService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if (resp.data.success) {
                        $scope.delIds = [];
                        $scope.reloadList();
                    }
                });
        }
    };

    // 新增扩展属性
    $scope.addAttr = function () {
        $scope.typeTemplate.customAttributeItems.push({})
    }

    // 删除扩展属性
    $scope.deleteAttr = function (index) {
        $scope.typeTemplate.customAttributeItems.splice(index, 1);
    }
}]);