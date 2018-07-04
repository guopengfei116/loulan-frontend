app.controller("itemCatController", ["$controller", "$scope", "itemCatService", function ($controller, $scope, itemCatService) {
    // 继承
    $controller("baseController", { $scope });

    $scope.itemSearch = {
        parentId: ""
    };

    $scope.title = [{
        num_1: "顶级分类列表",
        parentId: "0"
    },
    {
        num_2: "",
        parentId: ""
    },
    {
        num_3: "",
        parentId: ""
    }]

    
    $scope.cat = {
        name:"",
        typeId:""
    }
    itemCatService
        .findByParentId($scope.itemSearch)
        .then(resp => {
            $scope.list = resp.data.list;

        });


        // 获取类型模板id
        itemCatService.templateList()
        .then(resp => {
            $scope.templateList = {};
            $scope.templateList.data = resp.data;
        });

    // 查询下一级

    $scope.searchNextLevel = function (id, name, level) {
        console.log(id)
        $scope.itemSearch.parentId = id;
        itemCatService.findByParentId($scope.itemSearch)
            .then(resp => {

                if ($scope.title[1].num_2 && !level && level != 1) {
                    $scope.title[2].num_3 = name && name;
                    $scope.title[2].parentId = id;
                } else if (!level && level != 1) {
                    $scope.title[1].num_2 = name && name;
                    $scope.title[1].parentId = id;
                }
                if (level == 1) {
                    $scope.title = [{
                        num_1: "顶级分类列表",
                        parentId: "0"
                    },
                    {
                        num_2: "",
                        parentId: ""
                    },
                    {
                        num_3: "",
                        parentId: ""
                    }]
                } else if (level == 2) {

                    $scope.title = [{
                        num_1: "顶级分类列表",
                        parentId: "0"
                    },
                    {
                        num_2: name,
                        parentId: id
                    },
                    {
                        num_3: "",
                        parentId: ""
                    }]
                } else if (level == 3) {
                    $scope.title[2].num_3 = name && name;
                    $scope.title[2].parentId = id;
                }
                $scope.list = resp.data.list;
                // $scope.reloadList();
            });
    }

    // 删除
    $scope.delete = function () {
        if ($scope.delIds.length < 1) {
            alert("请选择要删除的记录");
            return;
        }
        if (confirm("你确定要删除吗")) {
            itemCatService.delIds($scope.delIds)
                .then(resp => {
                    alert(resp.data.message);
                    if (resp.data.success) {
                        $scope.list = [];
                        itemCatService
                            .findByParentId($scope.itemSearch)
                            .then(resp => {
                                $scope.list = resp.data.list;

                            });
                    }
                });
        }
    };

    // 新建

   // 保存 => 新增 || 修改
   $scope.save = function (method) {
    if ($scope.delIds.length < 1 || $scope.delIds.length > 1) {
        alert("请选择 1 个要新增的模板");
        return;
    }
    console.log($scope.delIds)
    itemCatService[method]($scope.typeTemplate)
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

}]);