'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG5SModule');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bg5s'); }

function disconnect(mac) {
  if (RCTModule?.disConnect) {
    RCTModule.disConnect(mac);
    return;
  }
  if (RCTModule?.disconnect) {
    RCTModule.disconnect(mac);
  }
}

module.exports = {
  Event_Notify: 'event_notify_bg5s',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  getStatusInfo: (mac) => { RCTModule?.getStatusInfo(mac); },
  setTime: (mac, date, timezone) => { RCTModule?.setTime(mac, date, timezone); },
  setUnit: (mac, type) => { RCTModule?.setUnit(mac, type); },
  setOfflineModel: (mac, type) => { RCTModule?.setOfflineModel(mac, type); },
  deleteUsedStrip: (mac) => { RCTModule?.deleteUsedStrip(mac); },
  deleteOfflineData: (mac) => { RCTModule?.deleteOfflineData(mac); },
  getOfflineData: (mac) => { RCTModule?.getOfflineData(mac); },
  startMeasure: (mac, type) => { RCTModule?.startMeasure(mac, type); },
  adjustOfflineData: (mac, timeString, array) => { RCTModule?.adjustOfflineData(mac, timeString, array); },
  disConnect: disconnect,
  disconnect: disconnect,
};
