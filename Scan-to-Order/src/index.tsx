import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import { RouterProvider} from "react-router-dom";
import router from './router.tsx';
// import './main.css';
import { configure } from 'mobx';
import { ConfigProvider, type ThemeConfig } from 'antd';


configure({//取消mobx的严格模式
  enforceActions: 'never'
})
// // 定义主题配置（包含Tabs组件的样式）
// const themeConfig: ThemeConfig = {
//   // 全局主题模式（根据data属性判断深色/浅色）
//   mode: document.documentElement.getAttribute('data-prefers-color-scheme') === 'dark' ? 'dark' : 'light',
//   // 配置组件特定样式
//   components: {
//     Tabs: {
//       // inkBarColor: '#1677ff', // 下划线颜色
//       // tabBg: 'var(--bg-container)', // 未选中标签背景色
//       // tabActiveBg: 'var(--bg-container)', // 选中标签背景色
//       // contentBg: 'var(--bg-container)', // 内容区域背景色
//       // borderColor: 'var(--border-color)', // 边框色
//     },
//   },
//   // 全局令牌（与index.css的CSS变量关联）
//   token: {
//     colorText: 'var(--text-color)',
//     colorBgContainer: 'var(--bg-container)',
//     colorBorder: 'var(--border-color)',
//   }
// };

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ConfigProvider >
      <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>,
  );
}
// document.documentElement.setAttribute(
//   'data-prefers-color-scheme',
//   'dark'
// )
// document.documentElement.setAttribute(
//     'data-prefers-color-scheme',
//     isDark ? 'light' : 'dark'
//   );
// document.documentElement.classList.remove('dark');//删除dark