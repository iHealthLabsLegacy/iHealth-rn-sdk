# Migration Guide — v1.x → v2.0.0

This guide covers everything you need to know when upgrading `@ihealth/ihealthlibrary-react-native` from v1.x to v2.0.0.

---

## What Changed

| Area | v1.x | v2.0.0 |
|------|------|--------|
| Minimum React Native | < 0.76 | **>= 0.76.0** |
| New Architecture support | ❌ | ✅ TurboModules |
| Event listening API | `DeviceEventEmitter` | **`NativeEventEmitter`** |
| Event name constants | From `NativeModules.XXX.EVENT` | **Hardcoded in JS module** |
| TypeScript specs | None | **29 `src/Native*.ts` files** |
| Android annotations | None | **`@ReactModule` on all modules** |
| iOS event dispatch | Relied on `_listenerCount` | **`initWithDisabledObservation` — always dispatches** |

---

## Step 1 — Update the package

```bash
npm install @ihealth/ihealthlibrary-react-native@^2.0.0
# then
cd ios && pod install
```

---

## Step 2 — Replace all event listeners

This is the **only required code change** for most apps.

Find every place you call `DeviceEventEmitter.addListener` with an iHealth event and replace it as shown below.

### Device Manager events (scan, connect, disconnect)

```javascript
// Before ❌
import { DeviceEventEmitter } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

useEffect(() => {
  const sub = DeviceEventEmitter.addListener(
    iHealthDeviceManagerModule.Event_Scan_Device,
    (event) => { /* ... */ }
  );
  return () => sub.remove();
}, []);


// After ✅
import { NativeEventEmitter, NativeModules } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

useEffect(() => {
  const emitter = new NativeEventEmitter(
    NativeModules.iHealthDeviceManagerModule
  );
  const sub = emitter.addListener(
    iHealthDeviceManagerModule.Event_Scan_Device,
    (event) => { /* ... */ }
  );
  return () => sub.remove();
}, []);
```

### Device data events (measurement results)

```javascript
// Before ❌
import { DeviceEventEmitter } from 'react-native';
import { BP5SModule } from '@ihealth/ihealthlibrary-react-native';

useEffect(() => {
  const sub = DeviceEventEmitter.addListener(
    BP5SModule.Event_Notify,
    (event) => { /* ... */ }
  );
  return () => sub.remove();
}, []);


// After ✅
import { NativeEventEmitter, NativeModules } from 'react-native';
import { BP5SModule } from '@ihealth/ihealthlibrary-react-native';

useEffect(() => {
  const emitter = new NativeEventEmitter(NativeModules.BP5SModule);
  const sub = emitter.addListener(
    BP5SModule.Event_Notify,
    (event) => { /* ... */ }
  );
  return () => sub.remove();
}, []);
```

### Rules to follow

| Rule | Reason |
|------|--------|
| Create `NativeEventEmitter` **inside** `useEffect` | In New Architecture, native modules are lazily initialized. Creating the emitter at module top-level may run before the native side is ready, resulting in a `null` module. |
| Pass the **matching** `NativeModules` instance | Each device module has its own native listener counter. Passing the wrong module means `addListener` increments the wrong counter and events are lost. |
| Always call `listener.remove()` in the cleanup | Prevents memory leaks and duplicate event callbacks after re-renders. |

---

## Step 3 — Remove direct access to `NativeModules.XXX.CONSTANT`

In v1.x, some apps read event names or constants directly from the native module:

```javascript
// Before ❌ — constantsToExport values are not available via TurboModuleRegistry
const eventName = NativeModules.BP5SModule.Event_Notify;
```

In v2.0.0, all event names and device type identifiers are hardcoded in the JS module and are always available:

```javascript
// After ✅ — import the JS module directly
import { BP5SModule, iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

const eventName   = BP5SModule.Event_Notify;                      // 'BP5S.MODULE.NOTIFY'
const deviceType  = iHealthDeviceManagerModule.BP5S;              // 'BP5S'
const scanEvent   = iHealthDeviceManagerModule.Event_Scan_Device; // 'event_scan_device'
```

### Event name reference

#### `iHealthDeviceManagerModule` events

| Constant | Value |
|----------|-------|
| `Event_Scan_Device` | `'event_scan_device'` |
| `Event_Scan_Finish` | `'event_scan_finish'` |
| `Event_Device_Connected` | `'event_device_connected'` |
| `Event_Device_Connect_Failed` | `'event_device_connect_failed'` |
| `Event_Device_Disconnect` | `'event_device_disconnect'` |
| `Event_Authenticate_Result` | `'event_authenticate_result'` |

#### Device module `Event_Notify` values

| Module | `Event_Notify` value |
|--------|----------------------|
| `BP5Module` | iOS: `'BP5.MODULE.NOTIFY'`, Android: `'event_notify_bp5'` |
| `BP5SModule` | iOS: `'BP5S.MODULE.NOTIFY'`, Android: `'event_notify_bp5s'` |
| `BP3LModule` | iOS: `'BP3L.MODULE.NOTIFY'`, Android: `'event_notify_bp3l'` |
| `BP7Module` | iOS: `'BP7.MODULE.NOTIFY'`, Android: `'event_notify_bp7'` |
| `BP7SModule` | iOS: `'BP7S.MODULE.NOTIFY'`, Android: `'event_notify_bp7s'` |
| `BP550BTModule` | `'event_notify_bp550bt'` |
| `PO3Module` | `'event_notify_po3'` |
| `PO1Module` | `'event_notify_po1'` |
| `HS2Module` | iOS: `'HS2.MODULE.NOTIFY'`, Android: `'event_notify_hs2'` |
| `HS2SModule` | iOS: `'HS2S.MODULE.NOTIFY'`, Android: `'event_notify_hs2s'` |
| `HS2SProModule` | iOS: `'HS2SPro.MODULE.NOTIFY'`, Android: `'event_notify_hs2spro'` |
| `HS4SModule` | iOS: `'HS4.MODULE.NOTIFY'`, Android: `'event_notify_hs4s'` |
| `HS6Module` | iOS: `'HS6.MODULE.NOTIFY'`, Android: `'event_notify_hs6'` |
| `BG5SModule` | `'event_notify_bg5s'` |
| `BG5Module` | `'event_notify_bg5'` |
| `BG1Module` | `'event_notify_bg1'` |
| `BG1AModule` | `'event_notify_bg1a'` |
| `BG1SModule` | `'event_notify_bg1s'` |
| `AM3SModule` | `'event_notify_am3s'` |
| `AM4Module` | `'event_notify_am4'` |
| `AM5Module` | `'event_notify_am5'` |
| `AM6Module` | `'event_notify_am6'` |
| `BTMModule` | `'event_notify_btm'` |
| `TS28BModule` | `'event_notify_ts28b'` |
| `NT13BModule` | `'event_notify_nt13b'` |
| `PT3SBTModule` | `'event_notify_pt3sbt'` |

Always use the exported `Module.Event_Notify` constant instead of hard-coding the event string. Some modules expose platform-specific notify names for compatibility with existing native implementations.

---

## Step 4 — Enable New Architecture (optional)

New Architecture is **optional** — the SDK works in both modes. Enable it if your project targets RN 0.76+.

**iOS** — edit `ios/Podfile.properties.json`:
```json
{ "newArchEnabled": "true" }
```
Then run `cd ios && pod install`.

**Android** — edit `android/gradle.properties`:
```properties
newArchEnabled=true
```

---

## Compatibility Notes

### HS2S — heart rate measurement method names

The native method is `enterHS2SProHeartRateMeasurementMode`. The SDK JS wrapper maps both names so existing code continues to work:

```javascript
HS2SModule.enterHS2SHeartRateMeasurementMode(mac);      // ✅ v1.x name — still works
HS2SModule.enterHS2SProHeartRateMeasurementMode(mac);   // ✅ native name — also works
```

### BG5S — disconnect method name

The native method is `disConnect` (capital C). The SDK JS wrapper accepts both:

```javascript
BG5SModule.disconnect(mac);   // ✅ recommended
BG5SModule.disConnect(mac);   // ✅ also valid
```

### ECG modules — iOS only

`ECGModule` and `ECGUSBModule` are only available on iOS. Always guard with:

```javascript
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  ECGModule.startMeasure(mac);
}
```

### Method availability — what is `noop` in v2.0.x

To keep older v1.x integrations from crashing, several legacy method names are still exported but resolve to a no-op (they do nothing and return `undefined`). They are listed here so you can update your call sites to the actual native methods.

| Module | No-op methods | Actual native methods to use |
|--------|---------------|------------------------------|
| `HS6Module` | `getAllConnectedDevices`, `getBattery`, `getUnit`, `startMeasure`, `stopMeasure`, `setUserInfo`, `disconnect` | HS6 is a Wi-Fi scale — use `init`, `setWifi`, `bindDeviceHS6`, `unBindDeviceHS6`, `getToken`, `setUnit(username, unitType)`, `getCloudData`. There is **no** BLE connect/disconnect for HS6. |
| `BG1Module` | `getAllConnectedDevices`, `getBattery`, `startMeasure`, `stopMeasure`, `getHistoryData`, `disconnect` | Use `sendCode(QR, codeType, testType)` and `getBottleInfoFromQR(QR)`. |
| `BG5Module` | `stopMeasure` | Measurement stops automatically; use `startMeasure(mac, code)` to start. `getHistoryData` is aliased to `getOfflineData`. |
| `HS2Module` | `getAnchorDate`, `setAnchorDate`, `setUnit`, `getUnit`, `stopMeasure`, `deleteHistoryData`, `setUserInfo` | Use `measureOnline(mac, unit, userId)` (also accessible via `startMeasure`). `getHistoryData` is aliased to `getOfflineData`. |
| `HS4SModule` | `getBattery`, `setUnit`, `getUnit`, `stopMeasure`, `setUserInfo` | Use `measureOnline(mac, unit, userId)` (also accessible via `startMeasure`) and `getOfflineData`. |
| `BTMModule` | `startMeasure`, `stopMeasure` | Use `getMemoryData`, `setStandbyTime`, `setTemperatureUnit`, `setMeasuringTarget`, `setOfflineTarget`. |
| `NT13BModule` | `getBattery` | Use `measure(mac)` (also accessible via `startMeasure(mac)`). |
| `TS28BModule` | `getBattery` | Use `measure(mac)` (also accessible via `startMeasure(mac)`). |
| `PT3SBTModule` | `startMeasure`, `stopMeasure` | Measurement is initiated by the device; use `getHistoryData` / `getHistoryCount` to read results. `deleteHistoryData` is aliased to `deleteHistory`. |
| `PO1Module` | `startMeasure`, `stopMeasure` | Measurement is initiated by the device; the SDK only relays results via `Event_Notify`. |
| `AM5Module` | `getBattery`, `getHistoryData`, `deleteHistoryData` | Use `getBasicInfo` (battery is part of the basic info payload), `syncHealthData` / `stopSyncHealthData`, and the new `setUserInfo(mac, year, month, day, weight, height, gender)` signature. |

> Tip: a `noop` method is intentionally silent — it will not throw and will not log. If you previously relied on one of these names, switch to the actual native method shown above.

### AM5 — `setUserInfo` signature change

`AM5Module.setUserInfo` now matches the native iOS signature exactly:

```javascript
// Before ❌ (v1.x)
AM5Module.setUserInfo(mac, age, height, weight, male);

// After ✅ (v2.0.1+)
AM5Module.setUserInfo(mac, year, month, day, weight, height, gender);
```

---

## Troubleshooting

**Events are not received after upgrading.**  
→ Check that `NativeEventEmitter` is created inside `useEffect`, not at module top-level.  
→ Ensure the correct `NativeModules` instance is passed (e.g. `NativeModules.BP5SModule`, not `NativeModules.iHealthDeviceManagerModule`).

**iOS build fails after upgrading.**  
→ Delete `ios/Pods` and `ios/Podfile.lock`, then run `pod install`.

**Android: methods have no effect.**  
→ Verify the license `.pem` file is in `android/app/src/main/assets/` and `sdkAuthWithLicense()` has been called.

**`NativeModules.XXXModule` returns `null` at app startup.**  
→ You may be accessing it before React Native finishes initializing. Access it inside `useEffect` only.

---

*Migration Guide · @ihealth/ihealthlibrary-react-native v2.0.0*
