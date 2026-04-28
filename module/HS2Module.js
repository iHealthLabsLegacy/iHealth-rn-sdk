'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS2Module');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_hs2' : 'HS2.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener(EVENT_NOTIFY); }

function measureOnline(mac, unit, userId) {
  RCTModule?.measureOnline(mac, unit ?? 0, userId ?? 0);
}

function getOfflineData(mac) {
  RCTModule?.getOfflineData(mac);
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getOfflineData: getOfflineData,
  measureOnline: measureOnline,
  getAnchorDate: (mac) => { RCTModule?.getAnchorDate?.(mac); },
  setAnchorDate: (mac) => { RCTModule?.setAnchorDate?.(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit?.(mac, unit); },
  getUnit: (mac) => { RCTModule?.getUnit?.(mac); },
  startMeasure: measureOnline,
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  getHistoryData: getOfflineData,
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData?.(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo?.(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
