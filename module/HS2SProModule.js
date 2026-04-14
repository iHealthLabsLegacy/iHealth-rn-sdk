'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS2SProModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('HS2SPro.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'HS2SPro.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getDeviceInfo: (mac) => { RCTModule?.getDeviceInfo(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  getUserInfo: (mac) => { RCTModule?.getUserInfo(mac); },
  updateUserInfo: (mac, userID, createTS, weight, age, height, sex, impedanceMark, fitnessMark) => {
    RCTModule?.updateUserInfo(mac, userID, createTS, weight, age, height, sex, impedanceMark, fitnessMark);
  },
  deleteUser: (mac, userID) => { RCTModule?.deleteUser(mac, userID); },
  getMemoryDataCount: (mac, userID) => { RCTModule?.getMemoryDataCount(mac, userID); },
  getMemoryData: (mac, userID) => { RCTModule?.getMemoryData(mac, userID); },
  deleteMemoryData: (mac, userID) => { RCTModule?.deleteMemoryData(mac, userID); },
  getAnonymousMemoryDataCount: (mac) => { RCTModule?.getAnonymousMemoryDataCount(mac); },
  getAnonymousMemoryData: (mac) => { RCTModule?.getAnonymousMemoryData(mac); },
  deleteAnonymousMemoryData: (mac) => { RCTModule?.deleteAnonymousMemoryData(mac); },
  measure: (mac, userType, userID, createTS, weight, age, height, sex, impedanceMark, fitnessMark) => {
    RCTModule?.measure(mac, userType, userID, createTS, weight, age, height, sex, impedanceMark, fitnessMark);
  },
  resetDevice: (mac) => { RCTModule?.resetDevice(mac); },
  broadCastTypeDevice: (mac, type) => { RCTModule?.broadCastTypeDevice(mac, type); },
  setDeviceLightUp: (mac) => { RCTModule?.setDeviceLightUp(mac); },
  enterHS2SProHeartRateMeasurementMode: (mac) => { RCTModule?.enterHS2SProHeartRateMeasurementMode(mac); },
  exitHS2SProHeartRateMeasurementMode: (mac) => { RCTModule?.exitHS2SProHeartRateMeasurementMode(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
