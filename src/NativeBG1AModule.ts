import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getDeviceInfo(mac: string): void;
  setMeasureMode(mac: string, measureMode: number): void;
  setDeviceTime(mac: string): void;
  getHistoryData(mac: string): void;
  deleteHistoryData(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BG1AModule');
