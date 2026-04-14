import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getFunctionInfo(mac: string): void;
  getOffLineNum(mac: string): void;
  getOffLineData(mac: string): void;
  getBattery(mac: string): void;
  setUnit(mac: string, unit: number): void;
  angleSet(mac: string, hl: number, ll: number, hr: number, lr: number): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BP7SModule');
