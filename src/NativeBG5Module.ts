import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  holdLink(mac: string): void;
  getBattery(mac: string): void;
  setTime(mac: string): void;
  setUnit(mac: string, unitType: number): void;
  getBottleId(mac: string): void;
  startMeasure(mac: string, measureType: number): void;
  getOfflineData(mac: string): void;
  deleteOfflineData(mac: string): void;
  setBottleMessageWithInfo(mac: string, codeMode: number, measureMode: number, qrCode: string, stripNum: number, overDate: string): void;
  getBottleMessage(mac: string): void;
  setBottleId(mac: string, bottleId: string): void;
  disConnect(mac: string): void;
  getBottleInfoFromQR(qrCode: string): void;
}

export default TurboModuleRegistry.get<Spec>('BG5Module');
