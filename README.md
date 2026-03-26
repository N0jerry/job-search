# 求职项目展示

- 本项目为求职用途，用于技术能力展示
    - 项目二: 
        - Scan-to-Order为Web端实战项目
        <br>
        <br>
        <video src="./images/scan-to-order.mp4" controls width="640" height="360">
            您的浏览器不支持视频播放
        </video>

        <div style="display: flex; justify-content: center; gap: 5rem; margin: 30px;">
        <img src="./images/a2.png" width="130px" height="240px">
        <img src="./images/a1.png" width="130px" height="240px">
        </div>
        <br>
        <br>
    - 项目三: 
        - Bill、RN-Map、restaurant 目录均为 React Native 实战项目

        <div style="display: flex; justify-content: center; gap: 1.5rem; margin: 30px;">
        <img src="./images/bill.png" width="130px" height="240px">
        <img src="./images/map.png" width="130px" height="240px">
        <img src="./images/restaurant.png" width="130px" height="240px">
        </div>

## 主要优化与修改

- Web端使用tailwindCSS + React + ahooks + ant design mobile开发
    - 我主要解决了SideBar组件在第一次切换选项时,按键闪烁的问题. 原因是当useState依赖异步数据时,useState 的初始值会'同步返回'undefined,导致第一次切换选项时,按钮状态跳回初始选项一;
    - 这项技术可以解决“抖音团购页的侧边导航没有滚动动画,不跟随内容区”的问题,优化用户视觉体验,组件流畅度媲美肯德基app;
    - 利用Socket.IO实现所有端的实时库存更新,比轮询的性能更好;
    - 我凭借这些贡献获得了8年老前端的肯定👍
- ReactNative项目
    - 我将代码从 JavaScript 重构为 TypeScript，提升代码类型安全与可维护性
    - 适配中文生产环境，优化项目实用性

## 来源声明

- ReactNative项目基于 Academind 开源教程代码进行二次开发与优化：
    - 原仓库：https://github.com/academind/react-native-practical-guide-code.git
    - 原作者：Academind (maxschwarzmueller)
- Web端项目基于 xieranmaya 的前端项目开发




