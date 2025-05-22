// vue.config.js
const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  chainWebpack: config => {
    // 开发环境配置
    config.when(process.env.NODE_ENV === 'development', config => {
      config.plugin('define').tap(args => {
        args[0]['process.env'] = {
          NODE_ENV: '"development"',
          API_BASE_URL: '"https://192.168.12.7:5000"'
        };
        return args;
      });
    });
    
    // 生产环境配置
    config.when(process.env.NODE_ENV === 'production', config => {
      config.plugin('define').tap(args => {
        args[0]['process.env'] = {
          NODE_ENV: '"production"',
          API_BASE_URL: '"https://api.example.com"'
        };
        return args;
      });
    });
  }
};  