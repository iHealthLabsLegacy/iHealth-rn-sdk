'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('TS28BModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_ts28b'); }

function measure(mac) {
  RCTModule?.measure(mac);
}

module.exports = {
  Event_Notify: 'event_notify_ts28b',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery?.(mac); },
  measure: measure,
  startMeasure: measure,
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
