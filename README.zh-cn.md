# FTP Seer API - FTP目录浏览器后端 :white_check_mark:

**版本 3.0.1** - 由 Kevin Moe Myint Myat (m3yevn) 开发

这是一个用于浏览FTP服务器目录的后端API服务器。通过REST API接受主机（host）、端口（port）、路径（path）、用户名（username）和密码（password）参数，连接FTP服务器并返回目录数据。

## 🚀 主要特性

- ✅ **RESTful API**: 简单的HTTP接口
- ✅ **匿名FTP支持**: 支持匿名FTP访问
- ✅ **目录浏览**: 列出FTP服务器目录内容
- ✅ **文件下载**: 获取FTP服务器文件内容
- ✅ **Vercel部署**: 生产就绪的Vercel部署
- ✅ **SEO优化**: 完整的搜索引擎优化
- ✅ **响应式设计**: 支持桌面和移动设备

## 🌐 在线演示

### [![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00C7B7?style=for-the-badge)](https://ftpseer-api.vercel.app)

**访问演示**: [https://ftpseer-api.vercel.app](https://ftpseer-api.vercel.app)

## 📦 Docker 部署

FTP Seer API服务器也可用作Docker镜像。

### [![Docker](https://img.shields.io/docker/pulls/m3yevn/ftp-seer?style=for-the-badge)](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)

```sh
$ docker pull m3yevn/ftp-seer:latest
$ docker run -d --name ftp-seer -p 5050:5050 m3yevn/ftp-seer:latest
```

现在，FTP Seer可在您工作站的5050端口访问。

## 📋 API 参数

### 必需参数
- **host**: FTP服务器主机名
- **path**: 要浏览的路径

### 可选参数
- **port**: FTP端口（默认：21）
- **username**: 用户名（匿名FTP可为空）
- **password**: 密码（匿名FTP可为空）

## 🔗 API 端点

### 目录浏览
```http
GET /api/directory?host=ftp.drivehq.com&path=.
```

### 文件获取
```http
GET /api/file?host=ftp.drivehq.com&path=ftp_help.htm
```

## 📝 示例请求

### 浏览目录
```sh
curl "https://ftpseer-api.vercel.app/api/directory?host=ftp.drivehq.com&path=."
```

### 获取文件
```sh
curl "https://ftpseer-api.vercel.app/api/file?host=ftp.drivehq.com&path=ftp_help.htm"
```

## 🛠️ 技术栈

- **Node.js** <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png" width="25" />
- **Express.js** - Web框架
- **JSFTP** - FTP客户端库
- **Loglestial** - 日志记录系统
- **PureCSS** - CSS框架
- **Vercel** - 部署平台

## 🏗️ 架构

- **Controller-Service模式**: 清晰的代码分离
- **RESTful API**: 标准HTTP接口
- **错误处理**: 完善的错误处理机制
- **输入验证**: 参数验证和清理
- **CORS支持**: 跨域请求支持

## 🚀 本地开发

### 安装依赖
```sh
$ npm install
```

### 启动服务器
```sh
$ npm start
```

服务器将在 `http://localhost:5050` 启动

## 📊 HTTP 方法

| 方法 | 路由 | 描述 |
|------|------|------|
| `GET` | `/` | 获取API状态 |
| `GET` | `/api/directory` | 浏览FTP服务器目录 |
| `GET` | `/api/file` | 获取FTP服务器文件内容 |

## 🔧 环境变量

```env
PORT=5050
NODE_ENV=development
LOG_LEVEL=info
```

## 📈 版本历史

### v3.0.1 (2024-12-19)
- 🏗️ 重构为Controller-Service架构
- 📝 集成Loglestial日志系统
- 🚀 Vercel部署优化
- 🔍 SEO优化和结构化数据
- 🎨 UI/UX改进
- 🛠️ 技术栈更新

## 👤 作者

**Kevin Moe Myint Myat (m3yevn)**

- GitHub: [@m3yevn](https://github.com/m3yevn)
- Twitter: [@yevn_m3](https://twitter.com/yevn_m3)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 🔗 相关链接

- **GitHub仓库**: [https://github.com/m3yevn/ftp-seer-api](https://github.com/m3yevn/ftp-seer-api)
- **在线演示**: [https://ftp-seer-api.vercel.app](https://ftp-seer-api.vercel.app)
- **Docker Hub**: [https://hub.docker.com/repository/docker/m3yevn/ftp-seer](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)