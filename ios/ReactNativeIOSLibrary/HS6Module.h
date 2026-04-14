//
//  HS6Module.h
//  ReactNativeIOSLibrary
//
//  Created by ihealth on 16/12/12.
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




@interface HS6Module : RCTEventEmitter <RCTBridgeModule
#if RCT_NEW_ARCH_ENABLED
, RCTTurboModule
#endif
>



@end
