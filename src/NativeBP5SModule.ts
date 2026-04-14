import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  startMeasure(mac: string): void;
  stopMeasure(mac: string): void;
  deleteData(mac: string): void;
  enbleOffline(mac: string, mode: number): void;
  getBattery(mac: string): void;
  getOffLineNum(mac: string): void;
  getOffLineData(mac: string): void;
  getFunctionInfo(mac: string): void;
  disconnect(mac: string): void;
  getHardwareVersion(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BP5SModule');
