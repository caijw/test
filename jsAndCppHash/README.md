## 对比js和c++扩展计算字符串hash的性能

1. hash算法:  
http://www.cse.yorku.ca/~oz/hash.html

2. c++扩展实现:  
按照算法要求是返回8字节的无符号`hash`  
返回64位的无符号在`nodejs 10.x`还是一个`Experimental`的特性，文档如下  
https://nodejs.org/dist/latest-v10.x/docs/api/n-api.html#n_api_napi_create_bigint_uint6  
这里将其转换为`v8`的`string`返回，会有性能损耗，等`n_api_napi_create_bigint_uint64`特性不再是`Experimental`再改成`n_api_napi_create_bigint_uint64 `   
测试代码:  `./main.cpp  `

3. `js`已有的实现:  
https://github.com/darkskyapp/string-hash#readme  
这个实现返回的是32位无符号，*算法要求是64位*，这个实现是有问题的，只是拿来作为测试  
测试代码: `./hash.js`

4. 运行环境：  
nodejs: 10.13.0  
system: macos 10.14.2 

5. 测试结果，截取其中一部分：  
```
str len: 1015500, chash: 5620606355790036956, ccost: 4ms, jshash: 167184570, jscost: 2ms
str len: 1015600, chash: 10874662383558025995, ccost: 4ms, jshash: 3311385079, jscost: 3ms
str len: 1015700, chash: 15776267706473376888, ccost: 4ms, jshash: 3498240388, jscost: 3ms
str len: 1015800, chash: 17029769845137879536, ccost: 5ms, jshash: 3927799482, jscost: 3ms
str len: 1015900, chash: 6887563315475231242, ccost: 4ms, jshash: 216645018, jscost: 3ms
str len: 1016000, chash: 2968967695129708208, ccost: 4ms, jshash: 3245355692, jscost: 3ms
str len: 1016100, chash: 4131619634005393181, ccost: 4ms, jshash: 1153950389, jscost: 3ms
str len: 1016200, chash: 12733277094490451133, ccost: 4ms, jshash: 707503015, jscost: 3ms
str len: 1016300, chash: 7494290025774606635, ccost: 4ms, jshash: 1143700581, jscost: 3ms
str len: 1016400, chash: 16707951246587824189, ccost: 4ms, jshash: 740315249, jscost: 3ms
str len: 1016500, chash: 13174127673307437161, ccost: 4ms, jshash: 3371570721, jscost: 3ms
str len: 1016600, chash: 3096866833439904570, ccost: 5ms, jshash: 344106438, jscost: 3ms
str len: 1016700, chash: 13216228890273805710, ccost: 4ms, jshash: 3351662480, jscost: 3ms
str len: 1016800, chash: 3786560890022470688, ccost: 4ms, jshash: 1146721132, jscost: 3ms
str len: 1016900, chash: 6264948834032406370, ccost: 5ms, jshash: 3632800100, jscost: 3ms
str len: 1017000, chash: 10269122484962237760, ccost: 4ms, jshash: 1218797594, jscost: 3ms
str len: 1017100, chash: 7353679051826652860, ccost: 4ms, jshash: 3134960518, jscost: 3ms
str len: 1017200, chash: 5216546687205616906, ccost: 4ms, jshash: 158689324, jscost: 3ms
str len: 1017300, chash: 14086134388828648693, ccost: 3ms, jshash: 4195937407, jscost: 3ms
str len: 1017400, chash: 11333811075102638927, ccost: 3ms, jshash: 2421106223, jscost: 3ms
str len: 1017500, chash: 1452589173099358474, ccost: 4ms, jshash: 244393614, jscost: 2ms
str len: 1017600, chash: 11247837246370304610, ccost: 4ms, jshash: 318440784, jscost: 3ms
str len: 1017700, chash: 8332974320121134159, ccost: 4ms, jshash: 3614359491, jscost: 3ms
```

6. 测试代码：  
`./test/tes1.js`

7. 结论：  
100万长度的字符串进行hash，可以看到，`js`的实现，在`v8`中的运行效率相当不错，比`c++`扩展的实现的性能还要好，有兴趣的可以修改  测试样例中的字符串长度进行验证~
