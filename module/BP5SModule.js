'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP5SModule');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_bp5s' : 'BP5S.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener(EVENT_NOTIFY); } catch (_) {}
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  deleteData: (mac) => { RCTModule?.deleteData(mac); },
  enbleOffline: (mac, mode) => { RCTModule?.enbleOffline(mac, mode); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getOffLineNum: (mac) => { RCTModule?.getOffLineNum(mac); },
  getOffLineData: (mac) => { RCTModule?.getOffLineData(mac); },
  getFunctionInfo: (mac) => { RCTModule?.getFunctionInfo(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
  getHardwareVersion: (mac) => { RCTModule?.getHardwareVersion(mac); },
};
