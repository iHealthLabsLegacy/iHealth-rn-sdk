'use strict';
var { TurboModuleRegistry, Platform } = require('react-native');
var RCTModule = Platform.OS === 'ios' ? TurboModuleRegistry.get('AM5Module') : null;
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_am5'); }

module.exports = {
  Event_Notify: 'event_notify_am5',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  bindDevice: (mac) => { RCTModule?.bindDevice(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
