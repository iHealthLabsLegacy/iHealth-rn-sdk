'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG1Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule && typeof RCTModule.addListener === 'function') {
  try { RCTModule.addListener('event_notify_bg1'); } catch (_) {}
}

module.exports = {
  Event_Notify: 'event_notify_bg1',
  sendCode: (QR, codeType, testType) => { RCTModule?.sendCode(QR, codeType, testType); },
  getBottleInfoFromQR: (QR) => { RCTModule?.getBottleInfoFromQR(QR); },
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices?.(); },
  getBattery: (mac) => { RCTModule?.getBattery?.(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure?.(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure?.(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData?.(mac); },
  disconnect: (mac) => { RCTModule?.disconnect?.(mac); },
};
