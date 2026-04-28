'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('NT13BModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_nt13b'); }

function measure(mac) {
  if (RCTModule?.measure) {
    RCTModule.measure(mac);
    return;
  }
  if (RCTModule?.startMeasure) {
    RCTModule.startMeasure(mac);
  }
}

function stopMeasure(mac) {
  if (RCTModule?.stopMeasure) {
    RCTModule.stopMeasure(mac);
  }
}

function noop() {}

module.exports = {
  Event_Notify: 'event_notify_nt13b',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: noop,
  measure: measure,
  startMeasure: measure,
  stopMeasure: stopMeasure,
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
