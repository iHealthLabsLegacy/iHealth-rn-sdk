'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('AM6Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_am6'); }

module.exports = {
  Event_Notify: 'event_notify_am6',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getDeviceInfoAndSyncTime: (mac, flag) => { RCTModule?.getDeviceInfoAndSyncTime(mac, flag); },
  setUserInfo: (mac, userID, gender, age, height, weight) => { RCTModule?.setUserInfo(mac, userID, gender, age, height, weight); },
  setPhonePlatform: (mac) => { RCTModule?.setPhonePlatform(mac); },
  notifyMessage: (mac, time, enable, flag, title, detail) => { RCTModule?.notifyMessage(mac, time, enable, flag, title, detail); },
  findDevice: (mac, flag) => { RCTModule?.findDevice(mac, flag); },
  rebootDevice: (mac) => { RCTModule?.rebootDevice(mac); },
  getTime: (mac) => { RCTModule?.getTime(mac); },
  setTargetRemind: (mac, enable, calorie, steps) => { RCTModule?.setTargetRemind(mac, enable, calorie, steps); },
  getTargetRemind: (mac) => { RCTModule?.getTargetRemind(mac); },
  setSedentaryRemind: (mac, enable, start, end) => { RCTModule?.setSedentaryRemind(mac, enable, start, end); },
  getSedentaryRemind: (mac) => { RCTModule?.getSedentaryRemind(mac); },
  setRaiseToLightRemind: (mac, enable, start, end) => { RCTModule?.setRaiseToLightRemind(mac, enable, start, end); },
  getRaiseToLightRemind: (mac) => { RCTModule?.getRaiseToLightRemind(mac); },
  setDoNotDisturbMode: (mac, enable, start, end) => { RCTModule?.setDoNotDisturbMode(mac, enable, start, end); },
  getDoNotDisturbMode: (mac) => { RCTModule?.getDoNotDisturbMode(mac); },
  setWearHand: (mac, hand) => { RCTModule?.setWearHand(mac, hand); },
  getWearHand: (mac) => { RCTModule?.getWearHand(mac); },
  setAlarmClockList: (mac, list) => { RCTModule?.setAlarmClockList(mac, list); },
  getAlarmClockList: (mac) => { RCTModule?.getAlarmClockList(mac); },
  startBind: (mac) => { RCTModule?.startBind(mac); },
  bindUserSuccess: (mac, userID) => { RCTModule?.bindUserSuccess(mac, userID); },
  bindUserFail: (mac) => { RCTModule?.bindUserFail(mac); },
  unBindUser: (mac, userID) => { RCTModule?.unBindUser(mac, userID); },
  readySyncData: (mac) => { RCTModule?.readySyncData(mac); },
  getDailyData: (mac) => { RCTModule?.getDailyData(mac); },
  getStepData: (mac) => { RCTModule?.getStepData(mac); },
  getSleepData: (mac) => { RCTModule?.getSleepData(mac); },
  getHeartRateData: (mac) => { RCTModule?.getHeartRateData(mac); },
  getBloodOxygenData: (mac) => { RCTModule?.getBloodOxygenData(mac); },
  getActivityData: (mac) => { RCTModule?.getActivityData(mac); },
  deleteData: (mac, type) => { RCTModule?.deleteData(mac, type); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
