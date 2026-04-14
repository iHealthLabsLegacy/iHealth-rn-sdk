'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS6Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('HS6.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'HS6.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  getUnit: (mac) => { RCTModule?.getUnit(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
