//
//  AM6Module.h
//  ReactNativeIOSLibrary
//
//  Created by Spring on 2023/8/28.
//

#import <Foundation/Foundation.h>
#if __has_include(<React/RCTAssert.h>)
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#else
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#endif
#if RCT_NEW_ARCH_ENABLED
#import <React/RCTTurboModule.h>
#endif

@interface AM6Module : RCTEventEmitter <RCTBridgeModule
#if RCT_NEW_ARCH_ENABLED
, RCTTurboModule
#endif
>

@end

