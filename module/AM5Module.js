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
  unBindDevice: (mac) => { RCTModule?.unBindDevice(mac); },
  getBasicInfo: (mac) => { RCTModule?.getBasicInfo(mac); },
  setTime: (mac) => { RCTModule?.setTime(mac); },
  setUserInfo: (mac, year, month, day, weight, height, gender) => {
    RCTModule?.setUserInfo(mac, year, month, day, weight, height, gender);
  },
  setUnit: (mac, type, unit) => { RCTModule?.setUnit(mac, type, unit); },
  setHandWearMode: (mac, model) => { RCTModule?.setHandWearMode(mac, model); },
  getLiveData: (mac) => { RCTModule?.getLiveData(mac); },
  syncHealthData: (mac) => { RCTModule?.syncHealthData(mac); },
  stopSyncHealthData: (mac) => { RCTModule?.stopSyncHealthData(mac); },
  reboot: (mac) => { RCTModule?.reboot(mac); },
  getBattery: (mac) => { RCTModule?.getBattery?.(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData?.(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData?.(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
