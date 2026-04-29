'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('PO3Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener('event_notify_po3'); } catch (_) {}
}

module.exports = {
  Event_Notify: 'event_notify_po3',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
