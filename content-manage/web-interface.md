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

### 内容管理
---

内容数据结构

```json
{
    id
    categoryId
    title
    url
    pic
    status
    sortOrder
}
```

主键查询

>* method : get
>* url : /content/:id
>* pathParam : { id: 内容ID }
>* result : 内容对象

内容列表

>* method : get
>* url : /content/findByCategoryId
>* queryParam : { categoryId: 分类ID }
>* result : 内容对象

新增

>* method : put
>* url : /content
>* bodyParam : 内容对象
>* result : 结果对象

修改

>* method : post
>* url : /content
>* bodyParam : 内容对象
>* result : 结果对象

批量删除

>* method : delete
>* url : /content/:ids
>* pathParam : { ids：1,2,3 }
>* result : 结果对象

### 内容分类管理
---

分类数据结构

```json
# 商品对象
{
    id
    name
}
```

主键查询

>* method : get
>* url : /contentCategory/:id
>* pathParam : { id: 分类ID }
>* result : 分类对象

分页分类列表

>* method : get
>* url : /contentCategory/findPageByWhere
>* queryParam : { page, size, categoryName }
>* result : 分页对象

新增

>* method : put
>* url : /contentCategory
>* bodyParam : 分类对象
>* result : 结果对象

修改

>* method : post
>* url : /contentCategory
>* bodyParam : 分类对象
>* result : 结果对象

批量删除

>* method : delete
>* url : /contentCategory/:ids
>* pathParam : { ids：1,2,3 }
>* result : 结果对象

### 文件上传
---

上传

>* method : post
>* url : /upload
>* bodyParam : { file }
>* result : String类型的文件地址
