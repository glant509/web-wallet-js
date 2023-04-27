const bs58 = require('bs58');
const Decimal = require('decimal.js');
const secp256k1 = require('tiny-secp256k1');

const bitcoin=require('bitcoinjs-lib');
const TestNet=bitcoin.networks.testnet;
const ecpair=require('ecpair');
const ecc=require('tiny-secp256k1');
const ECPair=ecpair.ECPairFactory(ecc);


console.log(secp256k1)

// createAddress()

// caculateAddressPercent()

function createAddress() {
  let keyPair=ECPair.makeRandom({network:TestNet});

  //16进制表示的私钥和公钥
  var private_key=keyPair.privateKey.toString('hex');
  var public_key=keyPair.publicKey.toString('hex');
  console.log('pri_key = '+private_key);
  console.log('pub_key = '+public_key);
}

function caculateAddressPercent() {
  let ss5 = "";
  for (let i = 0; i < 50; i++) {
    if (i == 0 || i == 1) {
      ss5 += "0";
    } else {
      ss5 += "f";
    }
  }
  let map = new Map();
  let bbbb = BigInt("0x" + ss5);
  for (let i = 1; i <= 50; i++) {
    let ele = BigInt(58) ** BigInt(i);
    let ele_pre = null;
    if (i == 1) {
      ele_pre = BigInt(0);
    } else {
      ele_pre = BigInt(58) ** BigInt(i - 1);
    }

    if (ele > bbbb) {
      console.error("max 35 hex: " + bbbb.toString(16));
      console.error("max 34 hex: " + (BigInt(58) ** BigInt(i)).toString(16));
      console.error("max 35 num: " + (bbbb - BigInt(58) ** BigInt(i)).toString(16));
      let len1 = bs58.encode(Buffer.from(padString(ele.toString(16), 50), 'hex')).length;
      map.set(len1.toString(), bbbb - ele_pre);
      break;
    }

    console.error("-------iii=" + i.toString() + "---------ele=" + ele.toString());

    let len1 = bs58.encode(Buffer.from(padString((ele - BigInt(1)).toString(16), 50), 'hex')).length;
    let len2 = bs58.encode(Buffer.from(padString(ele.toString(16), 50), 'hex')).length;
    console.error("len1=" + len1.toString());
    console.error("len2=" + len2.toString());

    let key = len1.toString();
    let add = ele - ele_pre;
    let num = map.get(key);
    if (num == null) {
      map.set(key, add);
    } else {
      num += add;
    }
    console.error("----ele end---");
  }
  console.error(map);

  let total = BigInt(0);
  for (let value of map.values()) {
    total += value;
  }

  let total_deci = new Decimal(total.toString());

  console.error("total: " + total.toString(16));
  let perMap = new Map();
  for (let [key, value] of map.entries()) {
    let value_deci = new Decimal(value.toString());
    let per = value_deci.dividedBy(total_deci).toFixed(10);
    perMap.set(key, per);
  }

  console.error(perMap);
}

function padString(input, length) {
  if (input.length >= length) {
    return input.substring(0, length);
  }

  let output = "";
  for (let i = 0; i < length - input.length; i++) {
    output += "0";
  }
  output += input;
  return output;
}