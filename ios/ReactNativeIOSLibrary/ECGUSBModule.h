//
//  ECGUSBModule.h
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2018/1/5.
//  Copyright © 2018年 daiqingquan. All rights reserved.
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

@interface ECGUSBModule : RCTEventEmitter <RCTBridgeModule
#if RCT_NEW_ARCH_ENABLED
, RCTTurboModule
#endif
>

@end
