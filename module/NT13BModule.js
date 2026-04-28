'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('NT13BModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_nt13b'); }

function measure(mac) {
  RCTModule?.measure(mac);
}

module.exports = {
  Event_Notify: 'event_notify_nt13b',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  measure: measure,
  startMeasure: measure,
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
