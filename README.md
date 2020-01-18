# A Backend for browsing FTP directory :white_check_mark:

This API server is used to accept host,port,path,username and password to <br/>
connect FTP server and send back directory data.

Read this in Simplified Chinese - 看简体中文版本 [README.zh-cn]

[README.zh-cn]: https://github.com/m3yevn/server-ftp/blob/master/README.zh-cn.md

### :postbox: Request Body
 - :one: Host
 - :two: Port
 - :three: Path
 - :four: User
 - :five: Pass

### :email: Sample Request
```sh
**"\list"**
{
  "host" : "192.168.0.1",
  "port" : "22",
  "path" : "remote/path",
  "user" : "admin",
  "pass" : "p@ssw0rd"
}
```
```sh
**"\get"**
{
  "host" : "192.168.0.1",
  "port" : "22",
  "path" : "remote/path/file.txt",
  "user" : "admin",
  "pass" : "p@ssw0rd"
}
```

### :envelope: HTTP Methods

| Method | Route | Description |
| ------ | ----- | ----------- |
| `GET`  | "/"   | Getting API health |
| `POST` | "/list" | Listing directory of FTP server |
| `POST` | "/get"  | Getting content of a file in FTP server |

### :books: Tech Stack

 * *NodeJS* <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png" width="25" />
 * *Express Framework*
 * *[JS FTP]*
 * *JSON* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/1200px-JSON_vector_logo.svg.png" width="25" />

[JS FTP]: https://www.npmjs.com/package/jsftp

### :heart: Run this code with


```
$ npm install
$ node server.js
```
