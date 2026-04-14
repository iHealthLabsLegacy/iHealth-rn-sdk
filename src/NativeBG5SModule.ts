import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getStatusInfo(mac: string): void;
  setTime(mac: string, date: string, timezone: number): void;
  setUnit(mac: string, type: number): void;
  setOfflineModel(mac: string, type: number): void;
  deleteUsedStrip(mac: string): void;
  deleteOfflineData(mac: string): void;
  getOfflineData(mac: string): void;
  startMeasure(mac: string, type: number): void;
  disConnect(mac: string): void;
  adjustOfflineData(mac: string, timeString: string, array: Object[]): void;
}

export default TurboModuleRegistry.get<Spec>('BG5SModule');
