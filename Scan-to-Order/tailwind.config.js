/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.tsx',
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
   darkMode: 'class',//darkMode: 'class' 用于指定暗黑模式的启用方式，表示通过HTML 元素上的 class 类名来控制暗黑模式的切换。
  theme: {
    extend: {},
  },
  plugins: [],
};