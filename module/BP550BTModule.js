'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP550BTModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bp550bt'); }

module.exports = {
  Event_Notify: 'event_notify_bp550bt',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  getFirmVersion: (mac) => { RCTModule?.getFirmVersion(mac); },
  getFunctionInfo: (mac) => { RCTModule?.getFunctionInfo(mac); },
  getOffLineNum: (mac) => { RCTModule?.getOffLineNum(mac); },
  getOffLineData: (mac) => { RCTModule?.getOffLineData(mac); },
  getTime: (mac) => { RCTModule?.getTime(mac); },
  getDisplayConfig: (mac) => { RCTModule?.getDisplayConfig(mac); },
  setDisplayConfig: (mac, lightOn, timeOn) => { RCTModule?.setDisplayConfig(mac, lightOn, timeOn); },
  transferFinished: (mac) => { RCTModule?.transferFinished(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
