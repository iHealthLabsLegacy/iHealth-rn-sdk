# React Native 0.81+ Support

## Current Status

As of **v2.0.0**, the SDK fully supports both Old Architecture (Bridge) and New Architecture (TurboModules) on React Native 0.76 and above.

### What was added in v2.0.0

- All native modules implement `RCTTurboModule` (iOS) and `TurboModule` (Android)
- TypeScript codegen specs added under `src/Native*.ts` for all 29 modules
- `@ReactModule` annotations added to all Android modules
- iOS modules updated to `initWithDisabledObservation` to ensure events always fire
- `addListener` pre-called in JS to guarantee `_listenerCount > 0` under New Architecture

## Support Matrix

| React Native | Old Architecture (Bridge) | New Architecture (TurboModules) |
|---|---|---|
| >= 0.76 | ✅ | ✅ |
| 0.75 and below | ✅ | ❌ (not tested) |

## Enabling New Architecture

New Architecture is **optional** — both modes work out of the box.

**iOS** — `ios/Podfile.properties.json`:
```json
{ "newArchEnabled": "true" }
```
Then run `cd ios && pod install`.

**Android** — `android/gradle.properties`:
```properties
newArchEnabled=true
```

## Related

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) — upgrade guide from v1.x
