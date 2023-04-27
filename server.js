const http=require("http");
const fs=require("fs");
const url = require('url');
const wif=require('wif');
const bitcoin=require('bitcoinjs-lib');

const EC = require('elliptic').ec;
const bs58 = require('bs58');
const createHash = require('create-hash');
const ec = new EC('secp256k1');

//创建web服务器
const server = http.createServer();

// createAddress()
/*
    提供数据服务,注册request请求事件，当客户端请求，自动执行回调函数
    request 请求对象，获取客户端的一些请求信息
    response 响应对象，给客户端发送响应消息
*/
server.on('request', function (req, res) {
    // 添加允许的请求来源和允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //response使用Write来向客户端发送数据，但是一定要用end来结束响应数据
    const path = req.url;
    // var pathname = request.url.slice(1); // request.url 返回的是/index.html
    var pathname = "./tt.html";

    
    if (path == "/"){
        // 读取文件内容
    fs.readFile(pathname, function (err, data) {
        if (err) {
            // 读取失败了
        } else {
            // 将读取到的内容返回
            res.setHeader('content-type', 'text/html;charset=utf-8'); //这个很重要，设置编码方式是utf-8
            res.write(data.toString());
        }
        res.end();

    });
    } else {
        console.log("handler,path=" + req.url)
        fs.readFile("fun.js", function (err, data) {
            if (err) {
                // 读取失败了
                console.log("read err");
            } else {
                // 将读取到的内容返回
                res.end(data);
            }
        });
    }

    const parsedUrl = url.parse(req.url, true);
    // console.log("parsedUrl=" + parsedUrl)
    // 定义 GET /address 路由
  if (parsedUrl.pathname === '/address') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // 在这里添加您的代码以生成比特币地址
    const EC = require('elliptic').ec;
    const ec = new EC('secp256k1');

    const keyPair = ec.genKeyPair();
    const publicKey = keyPair.getPublic('hex');
    const privateKey = keyPair.getPrivate('hex');

   // 生成比特币地址
    const publicKeyBuffer = Buffer.from(publicKey, 'hex');
    const hash = createHash('sha256').update(publicKeyBuffer).digest();
    const hash160 = createHash('ripemd160').update(hash).digest();
    const addressBytes = Buffer.concat([Buffer.from([0x00]), hash160]);
    const address = bs58.encode(addressBytes);

    console.log(`Public key: ${publicKey}`);
    console.log(`Private key: ${privateKey}`);
    console.log(`Address: ${address}`);

    const datas = new Object();
    datas.address = address;
    datas.privateKey = privateKey;
    datas.publicKey = publicKey;
    datas.address = address;
    res.end(JSON.stringify(datas));
  }

    
});

//绑定端口号启动服务器
server.listen(8089, function () {
    console.log('server start, url="http://127.0.0.1:8089"');
});

// 辅助函数
function encodeBase58Check(buffer) {
    const { createHash } = require('crypto');
    const sha256 = data => createHash('sha256').update(data).digest();
    const checksum = sha256(sha256(buffer)).slice(0, 4);
    return require('bs58').encode(Buffer.concat([buffer, checksum]));
  }
