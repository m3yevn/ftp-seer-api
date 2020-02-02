# 一个浏览FTP目录的后端 :white_check_mark:

这API服务器用于接受主机（host），端口（port)，路径 (path) ，用户名(user)和密码(pass) <br/>
连接FTP服务器并发送回目录数据。

### [![Run on Repl.it](https://repl.it/badge/github/m3yevn/ftp-seer)](https://ftp-seer--m3yevn.repl.co/)

### :whale: Docker 公共存储库

FTP Seer API服务器也可用作docker映像。
运行此docker命令以使其启动并运行。
必须预先安装Docker CLI。

### [![Run on Docker](https://img.shields.io/docker/pulls/m3yevn/ftp-seer?style=for-the-badge)](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)

```sh
$ docker pull m3yevn/ftpseer:latest
$ docker run -d --name ftpseer -p 5050:5050  m3yevn/ftp-seer:latest
```

Now, FTP Seer is accessible at 5050 port of your workstation.

### :postbox: 请求参数
 - :one: Hostname
 - :two: Port
 - :three: Path
 - :four: Username
 - :five: Password

### :email: 样品申请
```sh
**"\directory?host=sample&port=21&path=sample&username=sample&password=sample"**
```

```sh
**"\file?host=sample&port=21&path=sample/sample.txt&username=sample&password=sample"**
```

### :zap: 试试看这个演示

 - 浏览 [这里]
 - 这个演示在用着 [speedtest.tele2.net]

 [speedtest.tele2.net]: ftp://speedtest.tele2.net
 [this demo]: https://ftpseer.herokuapp.com/ftpseer/directory?host=speedtest.tele2.net&path=.

### :envelope: HTTP方法

|方法     | 路线  | 描述 |
| ------ | ----- | ---- |
| `GET` | “ /” |获得API健康状况|
| `GET` | “ /directory | FTP服务器的列表目录
| `GET` | “ /file |在FTP服务器中获取文件内容

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
