'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('AM4Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_am4'); }

module.exports = {
  Event_Notify: 'event_notify_am4',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
