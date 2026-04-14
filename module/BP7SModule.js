'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP7SModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('BP7S.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'BP7S.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getFunctionInfo: (mac) => { RCTModule?.getFunctionInfo(mac); },
  getOffLineNum: (mac) => { RCTModule?.getOffLineNum(mac); },
  getOffLineData: (mac) => { RCTModule?.getOffLineData(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setUnit: (mac, unit) => { RCTModule?.setUnit(mac, unit); },
  angleSet: (mac, hl, ll, hr, lr) => { RCTModule?.angleSet(mac, hl, ll, hr, lr); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
