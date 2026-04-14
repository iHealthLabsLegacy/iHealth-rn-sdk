import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  conformAngle(mac: string): void;
  startMeasure(mac: string): void;
  stopMeasure(mac: string): void;
  getBattery(mac: string): void;
  enableOfflineMeasurement(mac: string): void;
  disableOfflineMeasurement(mac: string): void;
  isEnableOffline(mac: string): void;
  getOfflineNum(mac: string): void;
  getOfflineData(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BP7Module');
