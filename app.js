// 引入 Express 模块
const express = require('express');

// 创建一个 Express 应用程序
const app = express();

// 设置服务器监听的端口号
const port = 8089;

app.use(express.static('public'));

// 处理来自根路径的 GET 请求
app.get('/', (req, res) => {
  // 重定向到 login.html 页面
  console.log(process.cwd());
  res.redirect('/tt.html');
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://127.0.0.1:${port}/`);
});
