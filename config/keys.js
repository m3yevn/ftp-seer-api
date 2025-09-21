const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 5050, // Vercel will set PORT automatically
    host: process.env.VERCEL ? undefined : '0.0.0.0' // WSL compatibility for local dev only
}