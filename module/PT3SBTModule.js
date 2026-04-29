'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('PT3SBTModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener('event_notify_pt3sbt'); } catch (_) {}
}

module.exports = {
  Event_Notify: 'event_notify_pt3sbt',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setTime: (mac) => { RCTModule?.setTime(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  getUnit: (mac) => { RCTModule?.getUnit(mac); },
  getHistoryCount: (mac) => { RCTModule?.getHistoryCount(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  deleteHistory: (mac) => { RCTModule?.deleteHistory(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistory(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure?.(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
