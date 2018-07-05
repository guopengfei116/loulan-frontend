app.controller("itemCatController", ["$controller", "$scope", "itemCatService", function ($controller, $scope, itemCatService) {
    // 继承
    $controller("baseController", { $scope });

    $scope.level = {
        currentLevel: 1,
        maxLevel: 3
    };

    $scope.navList = [
        {
            name: "顶级分类列表",
            parentId: "0"
        }
    ];

    $scope.itemSearch = {
        parentId: 0
    };

    // 初始化typeTemplate列表
    $scope.initTypeTemplate = function() {
        return itemCatService.templateList()
            .then(resp => {
                $scope.templateList = {};
                $scope.templateList.data = resp.data;
            });
    }

    // 列表渲染
    $scope.findPage = function() {
        return itemCatService.findByParentId($scope.itemSearch)
            .then(resp => {
                $scope.list = resp.data.list;
            });
    }

    // 更新面包屑导航
    $scope.updateNav = function(itemCat, level) {
        
        // 下级按钮查询
        if(level > $scope.navList.length) {
            $scope.navList.push(itemCat);
        }
        // 导航按钮查询
        else {
            $scope.navList = $scope.navList.slice(0, level);
        }

        // 更新level
        $scope.level.currentLevel = level;  
    }

    // 获取下级列表
    $scope.searchNextLevel = function (itemCat, level) {
        $scope.itemSearch.parentId = itemCat.id;
        $scope.findPage()
            .then(() => {
                $scope.updateNav(itemCat, level);
            });
    }

    // 删除
    $scope.delete = function () {
        if ($scope.delIds.length < 1) {
            alert("请选择要删除的记录");
            return;
        }

        if (confirm("你确定要删除吗")) {
            // 保存成功，刷新列表，清除数据
            itemCatService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if (resp.data.success) {
                        $scope.findPage();
                    }
                });
        }
    };

   // 保存 => 新增 || 修改
   $scope.save = function (method) {
        if ($scope.delIds.length < 1 || $scope.delIds.length > 1) {
            alert("请选择 1 个要新增的模板");
            return;
        }

        // 保存成功，刷新列表，清除数据
        itemCatService[method]($scope.typeTemplate)
            .then(resp => {
                alert(resp.data.message);
                if (resp.data.success) {
                    $scope.findPage();
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

    // 初始化
    $scope.initTypeTemplate();
    $scope.findPage();

}]);
