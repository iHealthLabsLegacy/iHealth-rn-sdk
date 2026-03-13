'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP3LModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('BP3L.MODULE.NOTIFY'); }

module.exports = {
  Event_Notify: 'BP3L.MODULE.NOTIFY',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
