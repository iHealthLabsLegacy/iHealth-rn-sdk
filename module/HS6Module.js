'use strict';
// HS6 is a Wi-Fi body composition scale (not BLE). Pairing/communication is
// handled entirely by the device + cloud, so the SDK does NOT expose
// connect/disconnect/getBattery/startMeasure/stopMeasure/setUserInfo/getUnit
// or getAllConnectedDevices. Those names are kept as `noop` only for backward
// API compatibility — calling them has no effect.
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS6Module');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_hs6' : 'HS6.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener(EVENT_NOTIFY); }

function noop() {}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  init: (userName) => { RCTModule?.init(userName); },
  setWifi: (ssid, password) => { RCTModule?.setWifi(ssid, password); },
  bindDeviceHS6: (birthday, weight, height, isSporter, gender, serialNumber) => {
    RCTModule?.bindDeviceHS6(birthday, weight, height, isSporter, gender, serialNumber);
  },
  unBindDeviceHS6: (serialNumber) => { RCTModule?.unBindDeviceHS6(serialNumber); },
  getToken: (clientId, clientSecret, username, clientPara) => {
    RCTModule?.getToken(clientId, clientSecret, username, clientPara);
  },
  setUnit: (username, unitType) => { RCTModule?.setUnit(username, unitType); },
  getCloudData: (clientId, clientSecret, username, ts, pageSize) => {
    RCTModule?.getCloudData(clientId, clientSecret, username, ts, pageSize);
  },
  getAllConnectedDevices: noop,
  getBattery: noop,
  getUnit: noop,
  startMeasure: noop,
  stopMeasure: noop,
  setUserInfo: noop,
  disconnect: noop,
};
