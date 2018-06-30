app.filter("filterArr", function () {
    return function (arr) {
        var list = JSON.parse(arr);
        var texts = list.map(function (ele) {
           return  ele.text;
        })
        return texts.join(" , ")
    }
})