'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP7Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('BP7.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'BP7.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  conformAngle: (mac) => { RCTModule?.conformAngle(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  enableOfflineMeasurement: (mac) => { RCTModule?.enableOfflineMeasurement(mac); },
  disableOfflineMeasurement: (mac) => { RCTModule?.disableOfflineMeasurement(mac); },
  isEnableOffline: (mac) => { RCTModule?.isEnableOffline(mac); },
  getOfflineNum: (mac) => { RCTModule?.getOfflineNum(mac); },
  getOfflineData: (mac) => { RCTModule?.getOfflineData(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
