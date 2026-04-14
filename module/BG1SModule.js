'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG1SModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bg1s'); }

module.exports = {
  Event_Notify: 'event_notify_bg1s',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getFunction: (mac) => { RCTModule?.getFunction(mac); },
  measure: (mac, testType) => { RCTModule?.measure(mac, testType); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
