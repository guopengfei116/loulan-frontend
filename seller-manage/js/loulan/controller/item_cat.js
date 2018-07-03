app.controller("item_catController", ["$controller", "$scope", "item_catService", function ($controller, $scope , item_catService) {
    // 继承
    $controller("baseController", { $scope });
}]);