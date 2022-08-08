## json-server

[地址](https://github.com/typicode/json-server)

json-server

全局安装:

```sh
npm install -g json-server
```

准备模拟数据db.json:

```json
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```

启动监听文件:

```
json-server --watch db.json
```

-d 2000延迟参数

访问接口：

```
http://localhost:3000/posts/1
=>
{ "id": 1, "title": "json-server", "author": "typicode" }
```



-d 2000

axios.CancelToken：

## axios

[介绍](https://github.com/axios/axios)

axios.default 配置：

```
axios.defaults.baseURL = 'https://api.example.com';

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```





axios实例对象：

```js
const duanzi = axios.create({
	baseURL:'',
  timeout:2000
})

duanzi({
  ...
})
```

请求拦截,响应拦截

axios.interceptors.request.use

axios.interceptors.response.use



取消请求：

