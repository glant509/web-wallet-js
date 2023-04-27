const bs58 = require('bs58');
const Decimal = require('decimal.js');
const secp256k1 = require('tiny-secp256k1');

const bitcoin=require('bitcoinjs-lib');
const TestNet=bitcoin.networks.testnet;
const ecpair=require('ecpair');
const ecc=require('tiny-secp256k1');
const ECPair=ecpair.ECPairFactory(ecc);

// createAddress()

function createAddress() {
  let keyPair=ECPair.makeRandom({network:TestNet});

  //16进制表示的私钥和公钥
  let private_key=keyPair.privateKey.toString('hex');
  let public_key=keyPair.publicKey.toString('hex');
  console.log('pri_key = '+private_key);
  console.log('pub_key = '+public_key);

  const data = new Object();
  data.privateKey = private_key;
  data.publicKey = public_key;
  
}

function createAddress1() {
  let keyPair=ECPair.makeRandom({network:TestNet});

  //16进制表示的私钥和公钥
  let private_key=keyPair.privateKey.toString('hex');
  let public_key=keyPair.publicKey.toString('hex');
  console.log('pri_key = '+private_key);
  console.log('pub_key = '+public_key);

  const data = new Object();
  data.privateKey = private_key;
  data.publicKey = public_key;
  return JSON.stringify(data);
}