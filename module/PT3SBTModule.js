'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('PT3SBTModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_pt3sbt'); }

module.exports = {
  Event_Notify: 'event_notify_pt3sbt',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
