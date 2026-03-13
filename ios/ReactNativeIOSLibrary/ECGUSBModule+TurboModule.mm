// Auto-generated TurboModule bridge for React Native New Architecture.
// This .mm file uses Objective-C++ to implement the C++ TurboModule protocol.
// The main implementation stays in ECGUSBModule.m (pure Objective-C, no C++ issues).

#import "ECGUSBModule.h"

#if RCT_NEW_ARCH_ENABLED
#import <React/RCTTurboModule.h>

@implementation ECGUSBModule (TurboModule)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeECGUSBModuleSpecJSI>(params);
}

@end
#endif
