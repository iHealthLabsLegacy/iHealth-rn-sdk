'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG1AModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener('event_notify_bg1a'); } catch (_) {}
}

module.exports = {
  Event_Notify: 'event_notify_bg1a',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getDeviceInfo: (mac) => { RCTModule?.getDeviceInfo(mac); },
  setMeasureMode: (mac, mode) => { RCTModule?.setMeasureMode(mac, mode); },
  setDeviceTime: (mac) => { RCTModule?.setDeviceTime(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  deleteHistoryData: (mac) => { RCTModule?.deleteHistoryData(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
