'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP5SModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('BP5S.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'BP5S.MODULE.NOTIFY',
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
