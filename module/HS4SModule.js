'use strict';
var { Platform, TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('HS4SModule');
var EVENT_NOTIFY = Platform.OS === 'android' ? 'event_notify_hs4s' : 'HS4.MODULE.NOTIFY';
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener(EVENT_NOTIFY); }

function measureOnline(mac, unit, userId) {
  RCTModule?.measureOnline(mac, unit ?? 0, userId ?? 0);
}

module.exports = {
  Event_Notify: EVENT_NOTIFY,
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getOfflineData: (mac) => { RCTModule?.getOfflineData(mac); },
  measureOnline: measureOnline,
  startMeasure: measureOnline,
  disconnect: (mac) => { RCTModule?.disconnect(mac); },
};
