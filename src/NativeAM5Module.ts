import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  bindDevice(mac: string): void;
  unBindDevice(mac: string): void;
  getBasicInfo(mac: string): void;
  setTime(mac: string): void;
  setUserInfo(mac: string, year: number, month: number, day: number, weight: number, height: number, gender: number): void;
  setUnit(mac: string, type: number, unit: number): void;
  setHandWearMode(mac: string, model: number): void;
  getLiveData(mac: string): void;
  syncHealthData(mac: string): void;
  stopSyncHealthData(mac: string): void;
  reboot(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('AM5Module');
