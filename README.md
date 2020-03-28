# FTP Seer - A Backend for browsing FTP directory :package:

This API server is used to accept host,port,path,username and password to <br/>
connect FTP server and send back directory data.

Read this in Simplified Chinese - 看简体中文版本 [README.zh-cn]

[README.zh-cn]: https://github.com/m3yevn/server-ftp/blob/master/README.zh-cn.md

### [![Run on Repl.it](https://repl.it/badge/github/m3yevn/ftp-seer)](https://ftp-seer--m3yevn.repl.co/)

### :whale: Docker Public Repository

FTP Seer API server is available as docker image also.
Run this docker command to get it up and running.
Docker CLI must be installed beforehand.

### [![Run on Docker](https://img.shields.io/docker/pulls/m3yevn/ftp-seer?style=for-the-badge)](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)

```sh
$ docker pull m3yevn/ftp-seer:latest
$ docker run -d --name ftp-seer -p 5050:5050  m3yevn/ftp-seer:latest
```

Now, FTP Seer is accessible at 5050 port of your workstation.

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

 - Visit [this demo]
 - The demo uses [speedtest.tele2.net] for testing


 [this demo]: https://ftpseer.herokuapp.com/ftpseer/directory?host=speedtest.tele2.net&path=.
 [speedtest.tele2.net]: ftp://speedtest.tele2.net

### :envelope: HTTP Methods

| Method | Route | Description |
| ------ | ----- | ----------- |
| `GET`  | "/"   | Getting API health |
| `GET` | "/directory" | Listing directory of FTP server |
| `GET` | "/file"  | Getting content of a file in FTP server |

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
