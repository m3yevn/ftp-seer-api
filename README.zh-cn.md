# 一个浏览FTP目录的后端 :white_check_mark:

这API服务器用于接受主机（host），端口（port)，路径 (path) ，用户名(user)和密码(pass) <br/>
连接FTP服务器并发送回目录数据。

### :postbox: 请求正文
 - :one: Host
 - :two: Port
 - :three: Path
 - :four: User
 - :five: Pass


### :email: 样品申请
```sh
** "\list" **
{
  "Host": "192.168.0.1",
  "Port": "22",
  "Path": "remote / path",
  "User": "admin",
  "Pass": "p@ssw0rd"
}
```
```sh
**“\get”**
{
  "Host": "192.168.0.1",
  "Port": "22",
  "Path": "remote / path / file.txt",
  "User": "admin",
  "Pass": "p @ ssw0rd"
}
```

### :envelope: HTTP方法

|方法     | 路线  | 描述 |
| ------ | ----- | ---- |
| `GET` | “ /” |获得API健康状况|
| `POST` | “ /list” | FTP服务器的列表目录
| `POST` | “ /get” |在FTP服务器中获取文件内容

### :book: 技术栈

 * *NodeJS*  <img src =“https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png” width =“25” />
 * *Express 框架*
 * *[JS FTP]*
 * *JSON* <img src =“https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1200px-JSON_vector_logo.svg.png” width =“25” />

[JS FTP]: https://www.npmjs.com/package/jsftp

### :heart: 为了开始这代码，请使用在下面的命令


```
$ npm insall
$ node index.js
```
