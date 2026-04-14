//
//  iHealthDeviceManagerModule.h
//  ReactNativeIOSLibrary
//
//  Created by daiqingquan on 2016/11/23.
//  Copyright © 2016年 daiqingquan. All rights reserved.
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


@interface iHealthDeviceManagerModule : RCTEventEmitter <RCTBridgeModule
#if RCT_NEW_ARCH_ENABLED
, RCTTurboModule
#endif
>
{
    NSDictionary *bg1IdpsDic;
}

+ (NSString*)autherizedUserID;
+ (NSString*)autherizedClientID;
+ (NSString*)autherizedClientSecret;

@end
