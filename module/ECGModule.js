'use strict';
var { TurboModuleRegistry, Platform } = require('react-native');
var RCTModule = Platform.OS === 'ios' ? TurboModuleRegistry.get('ECGModule') : null;
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener('event_notify_ecg'); } catch (_) {}
}

module.exports = {
  Event_Notify: 'event_notify_ecg',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
