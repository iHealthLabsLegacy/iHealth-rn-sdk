// Auto-generated TurboModule bridge for React Native New Architecture.
// This .mm file uses Objective-C++ to implement the C++ TurboModule protocol.
// The main implementation stays in HS4SModule.m (pure Objective-C, no C++ issues).

#import "HS4SModule.h"

#if RCT_NEW_ARCH_ENABLED
#import <React/RCTTurboModule.h>

@implementation HS4SModule (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeHS4SModuleSpecJSI>(params);
}

@end
#endif
