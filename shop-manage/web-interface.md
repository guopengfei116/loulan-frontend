# 商家后台管理应用接口

## 约定

### 请求方式
---

接口采用restFull风格进行设计，并采用了四种请求get、post、put、delete方式，请求原则对应下面的表。

| 请求类型 | 使用原则 |
| -       | -        |
| get     | 数据获取 |
| post    | 数据修改 |
| put     | 新增     |
| delete  | 删除     |

### 请求参数
---

请求参数分为三种，path参数、query参数、body参数，参数原则对应下面的表。

| 参数类型 | 使用原则 |
| -       | -        |
| path    | 请求中需要的id字段使用path传递，常见于get与delete请求 |
| query   | 通常是get请求参数传递的方式，其他请求特殊情况下也有可能使用 |
| body    | 通常是put与post参数传递的方式 |

### 返回数据
---

- get，直接返回数据结构，如果有分页则返回分页对象
- post，返回操作结果对象
- put请求，返回操作结果对象
- delete请求，返回操作结果对象

```json
// 分页对象结构
{
    total: "数据总量",
    list: "索取页的数据"
}
```

```json
// 操作结果对象结构
{
    success: "成功与否",
    status: "状态码, 用于说明具体的操作结果",
    message: "结果描述",
}
```

### 状态码
---

| 状态码 | 描述 |
| -      | -   |
| 200    | 操作成功 |
| 401    | 未登陆或登陆失效 |
| 403    | 权限不足 |
| 404    | 接口不存在 |
| 405    | 请求方法错误 |
| 500    | 服务器错误 |

## 接口

### 用户管理
---

用户数据结构

| 字段 | 描述 |
| -    | -   |
| username | 操作成功 |
| password | 未登陆或登陆失效 |
| 403      | 权限不足 |
| 404      | 接口不存在 |
| 405      | 请求方法错误 |
| 500      | 服务器错误 |

```json
{
    username: "账号",
    password: "密码"
}
```

登录
>* method : post
>* url : /login
>* bodyParam : { username, password }
>* result : JSON

```json
{
    username: "用户名",
    authorities: "用户拥有的权限列表",
    success: "成功与否",
    message: "结果描述"
}
```

登出
>* method : get
>* url : /logout
>* result : 结果对象

### 商家管理
---

商家数据结构

```json
{
    sellerId
    name：商家名称
    nickName：别名
    email
    mobile
    telephone
    status
    addressDetail
    linkmanName
    linkmanQq
    linkmanMobile
    linkmanEmail
    licenseNumber
    taxNumber
    orgNumber
    address
    logoPic
    brief
    createTime
    legalPerson
    legalPersonCardId
    bankUser
    bankName
    bankAccount
}
```

商家信息查阅

>* method : get
>* url : /seller
>* result : 商家对象

商家注册

>* method : put
>* url : /seller
>* bodyParam : 商家对象
>* result : 结果对象

完善信息

>* method : post
>* url : /seller
>* bodyParam : 商家对象
>* result : 结果对象

### 商品管理
---

商品数据结构

```json
# 商品对象
{
    goods：商品基本信息
    goodsDesc：商品描述信息
    itemList：[具体商品, 具体商品, 具体商品]
}
```

```json
# 商品基本信息
{
    id
    sellerId
    goodsName
    defaultItemId
    auditStatus
    isMarketable
    brandId
    caption
    category1Id
    category2Id
    category3Id
    smallPic
    price
    typeTemplateId
    isEnableSpec
    isDelete
}
```

```json
# 商品描述信息
{
    goodsId
    introduction
    specificationItems
    customAttributeItems
    itemImages
    packageList
    saleService
}
```

```json
# 具体商品
{
    id
    title
    sellPoint
    price
    stockCount
    num
    barcode
    image
    categoryid
    status
    createTime
    updateTime
    itemSn
    costPirce
    marketPrice
    isDefault
    goodsId
    sellerId
    cartThumbnail
    category
    brand
    spec
    seller
}
```

主键查询，只能查询自家商品

>* method : get
>* url : /goods/:id
>* pathParam : { id：商品ID }
>* result : 商品对象

分页搜索(只有商品基本信息)，只能查询自家商品

>* method : get
>* url : /goods/findPageByWhere
>* queryParam : { page: 页码， size: 每页大小，auditStatus: 状态，goodsName: 名称 }
>* result : 分页对象

创建

>* method : put
>* url : /goods
>* bodyParam : 品牌对象
>* result : 结果对象

修改

>* method : post
>* url : /goods
>* bodyParam : 品牌对象，id参数必填
>* result : 结果对象

批量修改状态, 0: 新商品未申请，1: 申请中，2: 审核通过，3: 被驳回

>* method : post
>* url : /goods/updateMoreStatus/:ids
>* pathParam : { ids }
>* bodyParam : { auditStatus }
>* result : 结果对象

批量删除

>* method : delete
>* url : /goods/:ids
>* pathParam : { ids：1,2,3 }
>* result : 结果对象

### 商品分类管理
---

商品分类数据结构

```json
{
    id
    parentId：顶级ID为0
    name
    typeId
}
```

分类下拉列表

>* method : get
>* url : /itemCat/selectOptionListByParentId
>* queryParam : { parentId：父类ID }
>* result : JSON

```json
[
    { id, text(对应name字段) },
    { id, text(对应name字段) },
    ...
]
```

### 商品模板管理
---

商品模板数据结构

```json
{
    id
    name
    specIds
    brandIds
    customAttributeItems
}
```

主键查询

>* method : get
>* url : /typeTemplate/:id
>* pathParam : { id }
>* result : 模板对象

### 文件上传
---

上传

>* method : post
>* url : /upload
>* bodyParam : { file }
>* result : String类型的文件地址
