//
//  BG5SModule.h
//  ReactNativeIOSLibrary
//
//  Created by soso on 2019/4/24.
//  Copyright © 2019 daiqingquan. All rights reserved.
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

@interface BG5SModule : RCTEventEmitter <RCTBridgeModule
#if RCT_NEW_ARCH_ENABLED
, RCTTurboModule
#endif
>

@end

