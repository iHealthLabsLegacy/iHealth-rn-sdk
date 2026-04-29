'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BP3LModule');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_bp3l' : 'BP3L.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener(EVENT_NOTIFY); } catch (_) {}
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
