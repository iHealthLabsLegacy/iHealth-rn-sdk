'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS4SModule');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_hs4s' : 'HS4.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener(EVENT_NOTIFY); }

function measureOnline(mac, unit, userId) {
  RCTModule?.measureOnline(mac, unit ?? 0, userId ?? 0);
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getOfflineData: (mac) => { RCTModule?.getOfflineData(mac); },
  measureOnline: measureOnline,
  getBattery: (mac) => { RCTModule?.getBattery?.(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit?.(mac, unit); },
  getUnit: (mac) => { RCTModule?.getUnit?.(mac); },
  startMeasure: measureOnline,
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo?.(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
