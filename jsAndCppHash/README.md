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
测试代码: `./test/test1.js`

4. 运行环境：  
nodejs: 10.13.0  
system: macos 10.14.2 


5. 测试结果，截取其中一部分：  
```
str len: 1497200, chash: 16403306697122232420, ccost: 3ms, jshash: 178625630, jscost: 4ms
str len: 1497300, chash: 12616828603835260371, ccost: 3ms, jshash: 3179410556, jscost: 4ms
str len: 1497400, chash: 5651299246978095860, ccost: 3ms, jshash: 1178030734, jscost: 4ms
str len: 1497500, chash: 2643625579312088352, ccost: 3ms, jshash: 1665622411, jscost: 4ms
str len: 1497600, chash: 18126004550825182587, ccost: 4ms, jshash: 1773049443, jscost: 4ms
str len: 1497700, chash: 14935299071896507198, ccost: 4ms, jshash: 1644917826, jscost: 4ms
str len: 1497800, chash: 1551356319384453666, ccost: 4ms, jshash: 3647302003, jscost: 4ms
str len: 1497900, chash: 18316721791389509092, ccost: 3ms, jshash: 4014887812, jscost: 4ms
str len: 1498000, chash: 10871065525226822022, ccost: 4ms, jshash: 2143121083, jscost: 4ms
str len: 1498100, chash: 5265440781303860355, ccost: 5ms, jshash: 3011975168, jscost: 4ms
str len: 1498200, chash: 13317515782122064058, ccost: 3ms, jshash: 1202744686, jscost: 5ms
str len: 1498300, chash: 17213516654643479030, ccost: 3ms, jshash: 60713276, jscost: 4ms
str len: 1498400, chash: 6779829987058991350, ccost: 4ms, jshash: 480201465, jscost: 4ms
str len: 1498500, chash: 12306297400128398817, ccost: 4ms, jshash: 3609229037, jscost: 4ms
str len: 1498600, chash: 2115317624246061080, ccost: 3ms, jshash: 1735529463, jscost: 4ms
str len: 1498700, chash: 2511517660930269077, ccost: 4ms, jshash: 3703937459, jscost: 4ms
str len: 1498800, chash: 14245054932145473728, ccost: 3ms, jshash: 1495668776, jscost: 4ms
str len: 1498900, chash: 2627556732670318324, ccost: 4ms, jshash: 2880979130, jscost: 4ms
str len: 1499000, chash: 13681449929714928930, ccost: 3ms, jshash: 1361922662, jscost: 4ms
str len: 1499100, chash: 6405452296833299018, ccost: 4ms, jshash: 895342634, jscost: 4ms
str len: 1499200, chash: 16526966890961178291, ccost: 5ms, jshash: 865975876, jscost: 4ms
str len: 1499300, chash: 15297397582351815960, ccost: 5ms, jshash: 524496462, jscost: 4ms
str len: 1499400, chash: 1175421353098759566, ccost: 4ms, jshash: 2131319352, jscost: 4ms
str len: 1499500, chash: 10034374583124457430, ccost: 4ms, jshash: 1137917050, jscost: 4ms
str len: 1499600, chash: 15738126963761576412, ccost: 3ms, jshash: 3870259382, jscost: 4ms
```
100万长度的字符串进行hash，可以看到，`js`的实现，在`v8`中的运行效率相当不错，几乎接近`c++`扩展的实现，有兴趣的可以修改  测试样例中的字符串长度进行验证~
