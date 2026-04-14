import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  setTime(mac: string): void;
  setUnit(mac: string, unit: number): void;
  getUnit(mac: string): void;
  getHistoryCount(mac: string): void;
  getHistoryData(mac: string): void;
  deleteHistory(mac: string): void;
  getBattery(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('PT3SBTModule');
