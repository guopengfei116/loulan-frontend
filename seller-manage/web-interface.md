# 运营商后台管理应用接口

## 约定

### 请求方式
---

接口采用restFull风格进行设计，并采用了四种请求get、post、put、delete方式，请求原则对应下面的表。

| 请求类型 | 使用原则 |
| -       | -        |
| get     | 数据获取，如果参数过多，可能设计为post |
| post    | 数据修改 |
| put     | 新增     |
| delete  | 删除     |

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
>* param : { username, password }
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

获取用户名
>* method : get
>* url : /user/getUsername
>* result : JSON

```json
{
    username: "用户名"
}
```

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

主键查询

>* method : get
>* url : /seller/findOne
>* param : { id }
>* result : 商家对象

分页搜索

>* method : post
>* url : /seller/findPageByWhere
>* param : { page: 页码， size: 每页大小 }
>* reqBody : { name, nickName }
>* result : 分页对象

更新状态

>* method : post
>* url : /seller/updateStatus
>* reqBody : { id, status }
>* result : 结果对象

### 品牌管理
---

品牌数据结构

```json
{
    id
    name
    firstChar
}
```

主键查询

>* method : get
>* url : /brand/findOne
>* param : { id }
>* result : 品牌对象

分页搜索

>* method : post
>* url : /brand/findPageByWhere
>* param : { page: 页码， size: 每页大小 }
>* reqBody : { name, firstChar }
>* result : 分页对象

创建

>* method : put
>* url : /brand/add
>* reqBody : 品牌对象，无需id参数
>* result : 结果对象

修改

>* method : post
>* url : /brand/update
>* reqBody : 品牌对象，id参数必填
>* result : 结果对象

批量删除

>* method : delete
>* url : /brand/deleteMore
>* param : { ids：1,2,3 }
>* result : 结果对象

下拉菜单

>* method : get
>* url : /brand/selectOptionList
>* result : Array

```json
[
    { id, text(对应字段name) },
    { id, text(对应字段name) },
    ...
]
```

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

主键查询

>* method : get
>* url : /goods/findOne
>* param : { id：商品ID }
>* result : 商品对象

分页搜索(只有商品基本信息)

>* method : post
>* url : /goods/findPageByWhere
>* param : { page: 页码， size: 每页大小 }
>* reqBody : { auditStatus，sellerId，goodsName }
>* result : 分页对象

创建

>* method : put
>* url : /goods/add
>* reqBody : 品牌对象
>* result : 结果对象

修改

>* method : post
>* url : /goods/update
>* reqBody : 品牌对象，id参数必填
>* result : 结果对象

批量修改状态

>* method : post
>* url : /goods/updateMoreStatus
>* param : { status，ids }
>* result : 结果对象

批量删除

>* method : delete
>* url : /goods/deleteMore
>* param : { ids：1,2,3 }
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

主键查询

>* method : get
>* url : /itemCat/findOne
>* param : { id }
>* result : 分类对象

查询子分类

>* method : get
>* url : /itemCat/findByParentId
>* param : { page: 页码， size: 每页大小，parentId：父类ID }
>* result : 分页对象

创建

>* method : put
>* url : /itemCat/add
>* reqBody : 分类对象，无需id参数
>* result : 结果对象

修改

>* method : post
>* url : /itemCat/update
>* reqBody : 分类对象，id参数必填
>* result : 结果对象

批量删除

>* method : delete
>* url : /itemCat/deleteMore
>* param : { ids：1,2,3 }
>* result : 结果对象

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
>* url : /typeTemplate/findOne
>* param : { id }
>* result : 模板对象

分页查询

>* method : post
>* url : /typeTemplate/findPageByWhere
>* param : { page: 页码， size: 每页大小，parentId：父类ID }
>* reqBody : { name }
>* result : 分页对象

创建

>* method : put
>* url : /typeTemplate/add
>* reqBody : 模板对象，无需id参数
>* result : 结果对象

修改

>* method : post
>* url : /typeTemplate/update
>* reqBody : 模板对象，id参数必填
>* result : 结果对象

批量删除

>* method : delete
>* url : /typeTemplate/deleteMore
>* param : { ids：1,2,3 }
>* result : 结果对象

下拉菜单

>* method : get
>* url : /typeTemplate/selectOptionList
>* result : Array

```json
[
    { id, text(对应字段name) },
    { id, text(对应字段name) },
    ...
]
```
