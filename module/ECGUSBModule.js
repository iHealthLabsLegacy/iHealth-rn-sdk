'use strict';
var { TurboModuleRegistry, Platform } = require('react-native');
var RCTModule = Platform.OS === 'ios' ? TurboModuleRegistry.get('ECGUSBModule') : null;
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_ecgusb'); }

module.exports = {
  Event_Notify: 'event_notify_ecgusb',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  startMeasure: (mac) => { RCTModule?.startMeasure(mac); },
  stopMeasure: (mac) => { RCTModule?.stopMeasure(mac); },
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
