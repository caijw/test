#include "./common.h"
#include <node_api.h>
#include <iostream>

unsigned long hash(char *str, size_t strLen)
{
    unsigned long hash = 5381;
    int c;
    int count = 20;
    for(int i = strLen - 1; i >= 0; --i){
    	c = str[i];
    	hash = ((hash << 5) + hash) + c; /* hash * 33 + c */
    	if(count-- <= 0){
    		break;
    	}
    }
    return hash;
}
/*
convert unsigned long to string
*/
char *ul2str(unsigned long num){
	char *str = new char[65]; /*8个字节加null总共65bit*/
	sprintf(str, "%lu" , num);
	return str;
}
/*
返回64位的无符号在nodejs 10.x还是一个Experimental的特性，文档如下
https://nodejs.org/dist/latest-v10.x/docs/api/n-api.html#n_api_napi_create_bigint_uint64
这里将其转换为v8的string返回，会有性能损耗，等n_api_napi_create_bigint_uint64特性不再是Experimental再改成n_api_napi_create_bigint_uint64
*/
napi_value hash(napi_env env, napi_callback_info info){
	size_t argc = 1;
	napi_value args[1];
	NAPI_CALL(env, napi_get_cb_info(env, info, &argc, args, NULL, NULL));
	NAPI_ASSERT(env, argc == 1, "hash: Wrong number of arguments. Expects 1 argument.");
	napi_valuetype valuetype;
	NAPI_CALL(env, napi_typeof(env, args[0], &valuetype));
	NAPI_ASSERT(env, valuetype == napi_string, "hash: Wrong type of arguments. Expects a string as first argument.");
	size_t strLen = 0;
	NAPI_CALL(env, napi_get_value_string_utf8(env, args[0], 0, 0, &strLen)); //没有终止符
	unsigned long hashRes = 0;
	if(strLen > 0){
	    char *strBuf = new char[strLen + 1];
	    NAPI_CALL(env, napi_get_value_string_utf8(env, args[0], strBuf, strLen + 1, &strLen));
	    strBuf[strLen] = '\0';
	    hashRes = hash(strBuf, strLen);
	   	delete[] strBuf;
	    char *hashResStr = ul2str(hashRes);
    	napi_value hash_napi;
    	NAPI_CALL(env, napi_create_string_utf8(env, hashResStr, NAPI_AUTO_LENGTH, &hash_napi));
    	delete[] hashResStr;
        return hash_napi;
	}else{
		return NULL;
	}
}

napi_value Init(napi_env env, napi_value exports) {
	napi_value newExports;
	NAPI_CALL(env, napi_create_function(env, "exports", NAPI_AUTO_LENGTH, hash, NULL, &newExports) );
	return newExports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)