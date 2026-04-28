'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BTMModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_btm'); }

module.exports = {
  Event_Notify: 'event_notify_btm',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getMemoryData: (mac) => { RCTModule?.getMemoryData(mac); },
  setStandbyTime: (mac, hour, min, sec) => { RCTModule?.setStandbyTime(mac, hour, min, sec); },
  setTemperatureUnit: (mac, unit) => { RCTModule?.setTemperatureUnit(mac, unit); },
  setMeasuringTarget: (mac, target) => { RCTModule?.setMeasuringTarget(mac, target); },
  setOfflineTarget: (mac, target) => { RCTModule?.setOfflineTarget(mac, target); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
