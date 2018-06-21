#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <node_api.h>
#include "common.h"



static void freeData(napi_env env, void* data, void* finalize_hint) {
  printf("----------------free data--------------\n");
  free(data);
}

static napi_value newExternalBuffer(napi_env env, napi_callback_info info) {
  napi_value theBuffer;
  char* theCopy = (char*)malloc(3000000);
  for(int i = 0; i < 3000000; i++){
    theCopy[i] = i % 255;
  }
  // NAPI_ASSERT(env, theCopy, "Failed to copy static text for newExternalBuffer");`
  NAPI_CALL(env,
            napi_create_external_buffer(
                env,
                3000000,
                theCopy,
                freeData,
                NULL,  // finalize_hint
                &theBuffer));

  return theBuffer;
}

static napi_value Init(napi_env env, napi_value exports) {
  napi_property_descriptor methods[] = {
    DECLARE_NAPI_PROPERTY("newExternalBuffer", newExternalBuffer)
  };

  NAPI_CALL(env, napi_define_properties(
      env, exports, sizeof(methods) / sizeof(methods[0]), methods));

  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
