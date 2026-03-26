import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: { 
      '/api': {
        target: 'http://localhost:5002',  // 目标服务器地址
        changeOrigin: true,               // 必要时修改请求源
        
      },
      '/upload': {
        target: 'http://localhost:5002',
        changeOrigin: true
      },
      '/restaurant': {
        target: 'http://localhost:5002', // 将会代理到 ws://localhost:3000/rsbuild-hmr
        ws: true,
        logLevel: 'silent',  // 👈 在这里加上它让代理报错闭嘴
        changeOrigin: true,        // 跨域时修改请求源
        secure: false,             // 若目标是 http，关闭 SSL 验证
        headers: {                 // 可选：添加额外请求头
          'Connection': 'Upgrade'  // 显式指定升级连接为 WebSocket
        }
      },
      '/desk': {
        target: 'http://localhost:5002',
        ws: true,
        logLevel: 'silent',  // 👈 在这里加上它让代理报错闭嘴
      }      
    },
    
  }
});
