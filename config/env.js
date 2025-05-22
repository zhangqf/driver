// src/config/env.js
const env = import.meta.env.MODE || 'development';

const config = {
  development: {
    API_BASE_URL: 'https://192.168.12.7:5000'
  },
  production: {
    API_BASE_URL: 'https://api.example.com'
  }
};

export default config[env];  