app.controller("sellerController", ["$controller", "$scope", "sellerService", function ($controller, $scope, sellerService) {
    // 继承
    $controller("baseController", { $scope });

    $scope.sellerSearch = {
        name: "",
        nickName: "",
        status: ""
    }

    $scope.seller = {
        addressDetail: "",
        linkmanMobile: "",
        linkmanName: "",
        linkmanQq: "",
        name: "",
        nickName: "",
        password: "",
        sellerId: "",
        status: "",
        telephone: ""
    }
    console.log(123)
    // 分页条件查询
    $scope.findPage = function (page, size) {
        sellerService.findPage(page, size, $scope.seller)
            .then(resp => {
                $scope.list = resp.data.list;
                $scope.paginationConfig.totalItems = resp.data.total;
            });
    };

    // 详情
    $scope.details = function (sellerId) {
        $scope._detail = $scope.list.filter( function(ele){
           if(ele.sellerId == sellerId){
            return ele;
           }
        })
        $scope.detail = $scope._detail[0]
    }

    // 改变商家状态
    $scope.changeStatus = function(id,status){
        console.log(id,status)
        sellerService.changeStatus(id, status)
        .then(resp => {
            alert(resp.data.message);
            if(resp.data.success) {
                $scope.reloadList();
                $scope.brand = {name: "", firstChar: "", id: ""};
            }
        });
    }

}]);