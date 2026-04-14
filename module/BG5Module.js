'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG5Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bg5'); }

module.exports = {
  Event_Notify: 'event_notify_bg5',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  startMeasure: (mac, code) => { RCTModule?.startMeasure(mac, code); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  getHistoryData: (mac) => { RCTModule?.getHistoryData(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
