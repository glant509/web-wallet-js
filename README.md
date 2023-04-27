# web-wallet-js

1, the design of the wallet
This is a simple bitcoin wallet program by js and node.js.  It has many base functions of bitcoin wallet, unless connect to newwork.

This wallet cat work without network, I soecially make it not to connect to network because I want is more security.

At first, this wallet is design by only use js, but I found sonmethings worng. when I use some js file in html, the browser could not identify the js file,
becasue the js file dependency sonme cryptography module such as base58, hash160, ecc.., this modle I used mast in native npm environment.
su if someone just open the index.html in his browser, it looke like nornal, but when he click some button, there maybe accour some error when the html file
interactive with some js file that has some cryptography module.

So, I finally use js and node.js to make it.

