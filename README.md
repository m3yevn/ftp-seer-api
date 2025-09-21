# FTP Seer API - FTP Directory Browser Backend :package:

**Version 3.0.1** - Developed by Kevin Moe Myint Myat (m3yevn)

A backend API server for browsing FTP server directories. Accepts host, port, path, username, and password parameters via REST API to connect to FTP servers and return directory data.

> 🌍 **中文版本**: [简体中文 README](https://github.com/m3yevn/ftp-seer-api/blob/master/README.zh-cn.md)

## 🚀 Key Features

- ✅ **RESTful API**: Simple HTTP interface
- ✅ **Anonymous FTP Support**: Works with anonymous FTP servers
- ✅ **Directory Browsing**: List FTP server directory contents
- ✅ **File Download**: Get FTP server file content
- ✅ **Vercel Deployment**: Production-ready Vercel deployment
- ✅ **SEO Optimized**: Complete search engine optimization
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Controller-Service Pattern**: Clean, maintainable architecture

## 🌐 Live Demo

### [![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00C7B7?style=for-the-badge)](https://ftp-seer-api.vercel.app)

**Try it now**: [https://ftp-seer-api.vercel.app](https://ftp-seer-api.vercel.app)

## 📦 Docker Deployment

FTP Seer API server is also available as a Docker image.

### [![Docker](https://img.shields.io/badge/Docker-Hub-2496ED?style=for-the-badge)](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)

```sh
$ docker pull m3yevn/ftp-seer:latest
$ docker run -d --name ftp-seer -p 5050:5050 m3yevn/ftp-seer:latest
```

Now, FTP Seer is accessible at port 5050 of your workstation.

## 📋 API Parameters

### Required Parameters
- **host**: FTP server hostname
- **path**: Path to browse

### Optional Parameters
- **port**: FTP port (default: 21)
- **username**: Username (optional for anonymous FTP)
- **password**: Password (optional for anonymous FTP)

## 🔗 API Endpoints

### Directory Browsing
```http
GET /api/directory?host=ftp.drivehq.com&path=.
```

### File Retrieval
```http
GET /api/file?host=ftp.drivehq.com&path=ftp_help.htm
```

## 📝 Sample Requests

### Browse Directory
```sh
curl "https://ftp-seer-api.vercel.app/api/directory?host=ftp.drivehq.com&path=."
```

### Get File Content
```sh
curl "https://ftp-seer-api.vercel.app/api/file?host=ftp.drivehq.com&path=ftp_help.htm"
```

## 🛠️ Tech Stack

- **Node.js** <img src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/256/full/nodejslogo.png" width="25" />
- **Express.js** - Web framework
- **JSFTP** - FTP client library
- **Loglestial** - Advanced logging system
- **PureCSS** - CSS framework
- **Vercel** - Deployment platform

## 🏗️ Architecture

The project follows a **Controller-Service pattern** for better maintainability:

- **Controllers** (`/controller/`) - Handle HTTP requests and responses
- **Services** (`/services/`) - Contain business logic and FTP operations  
- **Utils** (`/utils/`) - Shared utilities like logging
- **Config** (`/config/`) - Application configuration

### Project Structure
```
ftp-seer-api/
├── controller/          # Request handlers
├── services/            # Business logic
├── utils/              # Shared utilities
├── config/             # Configuration
├── public/             # Static files
├── routes.js           # Route definitions
├── index.js            # Application entry point
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies
```

## 🚀 Vercel Deployment

This project is optimized for Vercel deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration
- **Runtime**: Node.js
- **Build Command**: Automatic
- **Output Directory**: Root
- **Install Command**: `npm install`

## 📊 HTTP Methods

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/` | Get API health status |
| `GET` | `/api/directory` | Browse FTP server directory |
| `GET` | `/api/file` | Get FTP server file content |

## 🔧 Environment Variables

```env
PORT=5050
NODE_ENV=development
LOG_LEVEL=info
VERCEL=1
```

## 🚀 Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/m3yevn/ftp-seer.git
cd ftp-seer

# Install dependencies
npm install

# Start the development server
npm start
```

The server will start at `http://localhost:5050`

## 📈 Version History

### v3.0.1 (December 19, 2024)
- 🏗️ **Architecture**: Refactored to Controller-Service pattern
- 📝 **Logging**: Integrated Loglestial logging system
- 🚀 **Deployment**: Vercel deployment optimization
- 🔍 **SEO**: Complete SEO optimization with structured data
- 🎨 **UI/UX**: Improved user interface with radio buttons
- 🛠️ **Tech Stack**: Updated dependencies and removed legacy code
- 🌐 **Frontend**: Responsive design and loading states
- 🔧 **API**: Anonymous FTP support and better error handling

### Previous Versions
- **v2.1.0**: Basic FTP functionality with Winston logging
- **v1.0.0**: Initial release with CircleCI deployment

## 👤 Author

**Kevin Moe Myint Myat (m3yevn)**

- GitHub: [@m3yevn](https://github.com/m3yevn)
- Twitter: [@yevn_m3](https://twitter.com/yevn_m3)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔗 Related Links

- **GitHub Repository**: [https://github.com/m3yevn/ftp-seer-api](https://github.com/m3yevn/ftp-seer-api)
- **Live Demo**: [https://ftp-seer-api.vercel.app](https://ftp-seer-api.vercel.app)
- **Docker Hub**: [https://hub.docker.com/repository/docker/m3yevn/ftp-seer](https://hub.docker.com/repository/docker/m3yevn/ftp-seer)
- **Release Notes**: [https://ftp-seer-api.vercel.app/releases/3.0.1.html](https://ftp-seer-api.vercel.app/releases/3.0.1.html)

## 🌍 Internationalization

Read this in Simplified Chinese - 看简体中文版本 [README.zh-cn]

[README.zh-cn]: https://github.com/m3yevn/ftp-seer-api/blob/master/README.zh-cn.md