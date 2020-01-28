# FTP Seer - A Backend for browsing FTP directory :package:

This API server is used to accept host,port,path,username and password to <br/>
connect FTP server and send back directory data.

Read this in Simplified Chinese - 看简体中文版本 [README.zh-cn]

[README.zh-cn]: https://github.com/m3yevn/server-ftp/blob/master/README.zh-cn.md

### :postbox: Request Query Params
 - :one: Hostname
 - :two: Port
 - :three: Path
 - :four: Username
 - :five: Password

### :email: Sample Request
```sh
**"\directory?host=sample&port=21&path=sample&username=sample&password=sample"**
```

```sh
**"\file?host=sample&port=21&path=sample/sample.txt&username=sample&password=sample"**
```

### :zap: Try it on demo

 - Visit https://ftpseer.herokuapp.com/ftpseer/directory?host=speedtest.tele2.net&path=.
 - The demo uses [speedtest.tele2.net] for testing

 [speedtest.tele2.net]: ftp://speedtest.tele2.net

### :envelope: HTTP Methods

| Method | Route | Description |
| ------ | ----- | ----------- |
| `GET`  | "/"   | Getting API health |
| `GET` | "/list" | Listing directory of FTP server |
| `GET` | "/get"  | Getting content of a file in FTP server |

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
