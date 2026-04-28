'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG1Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bg1'); }

function noop() {}

module.exports = {
  Event_Notify: 'event_notify_bg1',
  sendCode: (QR, codeType, testType) => { RCTModule?.sendCode(QR, codeType, testType); },
  getBottleInfoFromQR: (QR) => { RCTModule?.getBottleInfoFromQR(QR); },
  getAllConnectedDevices: noop,
  getBattery: noop,
  startMeasure: noop,
  stopMeasure: noop,
  getHistoryData: noop,
  disconnect: noop,
};
