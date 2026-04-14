import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getBattery(mac: string): void;
  getMemoryData(mac: string): void;
  setStandbyTime(mac: string, hour: number, min: number, sec: number): void;
  setTemperatureUnit(mac: string, unit: number): void;
  setMeasuringTarget(mac: string, target: number): void;
  setOfflineTarget(mac: string, target: number): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BTMModule');
