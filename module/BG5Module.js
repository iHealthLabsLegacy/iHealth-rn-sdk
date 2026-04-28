'use strict';
var { TurboModuleRegistry } = require('react-native');
var RCTModule = TurboModuleRegistry.get('BG5Module');
// Pre-call addListener via TurboModule JSI to ensure _listenerCount > 0.
// Without this, sendEventWithName: silently drops all events in New Architecture.
if (RCTModule) { RCTModule.addListener('event_notify_bg5'); }

function disconnect(mac) {
  if (RCTModule?.disConnect) {
    RCTModule.disConnect(mac);
    return;
  }
  if (RCTModule?.disconnect) {
    RCTModule.disconnect(mac);
  }
}

function getOfflineData(mac) {
  RCTModule?.getOfflineData(mac);
}

function noop() {}

module.exports = {
  Event_Notify: 'event_notify_bg5',
  getAllConnectedDevices: () => { RCTModule?.getAllConnectedDevices(); },
  holdLink: (mac) => { RCTModule?.holdLink(mac); },
  getBattery: (mac) => { RCTModule?.getBattery(mac); },
  setTime: (mac) => { RCTModule?.setTime(mac); },
  setUnit: (mac, unitType) => { RCTModule?.setUnit(mac, unitType); },
  getBottleId: (mac) => { RCTModule?.getBottleId(mac); },
  startMeasure: (mac, code) => { RCTModule?.startMeasure(mac, code); },
  getOfflineData: getOfflineData,
  deleteOfflineData: (mac) => { RCTModule?.deleteOfflineData(mac); },
  setBottleMessageWithInfo: (mac, codeMode, measureMode, qrCode, stripNum, overDate) => {
    RCTModule?.setBottleMessageWithInfo(mac, codeMode, measureMode, qrCode, stripNum, overDate);
  },
  getBottleMessage: (mac) => { RCTModule?.getBottleMessage(mac); },
  setBottleId: (mac, bottleId) => { RCTModule?.setBottleId(mac, bottleId); },
  disConnect: disconnect,
  disconnect: disconnect,
  getBottleInfoFromQR: (qrCode) => { RCTModule?.getBottleInfoFromQR(qrCode); },
  stopMeasure: noop,
  getHistoryData: getOfflineData,
};
