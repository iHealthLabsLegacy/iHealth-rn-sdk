// Auto-generated TurboModule bridge for React Native New Architecture.
// This .mm file uses Objective-C++ to implement the C++ TurboModule protocol.
// The main implementation stays in HS6Module.m (pure Objective-C, no C++ issues).

#import "HS6Module.h"

#if RCT_NEW_ARCH_ENABLED
#import <React/RCTTurboModule.h>

@implementation HS6Module (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeHS6ModuleSpecJSI>(params);
}

@end
#endif
