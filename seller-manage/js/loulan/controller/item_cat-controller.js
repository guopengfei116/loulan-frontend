app.controller("itemCatController", ["$controller", "$scope", "itemCatService", function ($controller, $scope, itemCatService) {
    // 继承
    // $controller("baseController", { $scope });

    $scope.itemSearch = {
        parentId: ""
    };

    itemCatService
        .findByParentId($scope.itemSearch)
        .then(resp => {
            $scope.list = resp.data;
        });

}]);