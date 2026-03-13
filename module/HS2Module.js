'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS2Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('HS2.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'HS2.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getAnchorDate: (mac) => { RCTModule?.getAnchorDate(mac); },
  setAnchorDate: (mac) => { RCTModule?.setAnchorDate(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  getUnit: (mac) => { RCTModule?.getUnit(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
