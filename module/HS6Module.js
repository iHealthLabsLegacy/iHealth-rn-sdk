'use strict';
// HS6 is a Wi-Fi body composition scale (not BLE). Communication is handled
// entirely via the cloud — there is no BLE connect/disconnect concept.
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS6Module');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_hs6' : 'HS6.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener(EVENT_NOTIFY); } catch (_) {}
}

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
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices?.(); },
  getBattery: (mac) => { RCTModule?.getBattery?.(mac); },
  getUnit: (mac) => { RCTModule?.getUnit?.(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure?.(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  setUserInfo: (mac, age, height, weight, male) => { RCTModule?.setUserInfo?.(mac, age, height, weight, male); },
  disconnect: (mac) => { RCTModule?.disconnect?.(mac); },
};
