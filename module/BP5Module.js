'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP5Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('BP5.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'BP5.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  enbleOffline: (mac) => { RCTModule?.enbleOffline(mac); },
  disableOffline: (mac) => { RCTModule?.disableOffline(mac); },
  isEnableOffline: (mac) => { RCTModule?.isEnableOffline(mac); },
  getOfflineNum: (mac) => { RCTModule?.getOfflineNum(mac); },
  getOfflineData: (mac) => { RCTModule?.getOfflineData(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
