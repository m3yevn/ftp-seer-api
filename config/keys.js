const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT,
    secretUser: process.env.USERNAME,
    secretKey: process.env.PASSWORD
}