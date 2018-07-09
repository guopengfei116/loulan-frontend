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

    $scope.itemCat = {
        parentName: "",
        itemCat: {
            id: "",
            name: "",
            parentId: 0,
            typeId: "",
            type: {
                id: "",
                text: ""
            }
        }
    }

    // 初始化typeTemplate列表
    $scope.initTypeTemplate = function () {
        return itemCatService.templateList()
            .then(resp => {
                $scope.templateList = {};
                $scope.templateList.data = resp.data;
            });
    }

    // 列表渲染
    $scope.findPage = function () {
        return itemCatService.findByParentId($scope.itemSearch)
            .then(resp => {
                $scope.list = resp.data.list;
            });
    }

    // 更新面包屑导航
    $scope.updateNav = function (itemCat, level) {

        // 下级按钮查询
        if (level > $scope.navList.length) {
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
    $scope.save = function () {
        // 保存成功，刷新列表，清除数据
        let method = $scope.itemCat.itemCat.id ? "update" : "add";
        $scope.itemCat.itemCat.typeId = $scope.itemCat.itemCat.type.id;
        itemCatService[method]($scope.itemCat.itemCat)
            .then(resp => {
                alert(resp.data.message);
                if (resp.data.success) {
                    $scope.findPage();
                    $scope.itemCat.itemCat = {
                        id: "",
                        name: "",
                        parentId: 0,
                        typeId: "",
                        type: {
                            id: "",
                            text: ""
                        }
                    };
                }
            });
    };

    // 新建
    $scope.searchShow = function () {
        if ($scope.delIds.length == 1) {
            let one = $scope.list.filter(v => v.id == $scope.delIds[0]);
            $scope.itemCat.parentName = one[0].name;
            $scope.itemCat.itemCat.parentId = one[0].id;
        }
    }

    // 修改
    $scope.findOne = function (id) {
        itemCatService.findOne(id)
            .then(resp => {
                $scope.itemCat.itemCat = resp.data;  // 请求回来的数据进行回显编辑
                $scope.itemCat.itemCat.type = $scope.templateList.data.filter(v => v.id == resp.data.typeId)[0];  // 请求回来的数据进行回显编辑

        });
    }

// 初始化
$scope.initTypeTemplate();
$scope.findPage();

}]);
