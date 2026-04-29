'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP7SModule');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_bp7s' : 'BP7S.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener(EVENT_NOTIFY); } catch (_) {}
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getFunctionInfo: (mac) => { RCTModule?.getFunctionInfo(mac); },
  getOffLineNum: (mac) => { RCTModule?.getOffLineNum(mac); },
  getOffLineData: (mac) => { RCTModule?.getOffLineData(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  angleSet: (mac, hl, ll, hr, lr) => { RCTModule?.angleSet(mac, hl, ll, hr, lr); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
