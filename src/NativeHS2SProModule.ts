import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getDeviceInfo(mac: string): void;
  getBattery(mac: string): void;
  setUnit(mac: string, unit: number): void;
  getUserInfo(mac: string): void;
  updateUserInfo(mac: string, userID: string, createTS: number, weight: number, age: number, height: number, sex: number, impedanceMark: number, fitnessMark: number): void;
  deleteUser(mac: string, userID: string): void;
  getMemoryDataCount(mac: string, userID: string): void;
  getMemoryData(mac: string, userID: string): void;
  deleteMemoryData(mac: string, userID: string): void;
  getAnonymousMemoryDataCount(mac: string): void;
  getAnonymousMemoryData(mac: string): void;
  deleteAnonymousMemoryData(mac: string): void;
  measure(mac: string, userType: number, userID: string, createTS: number, weight: number, age: number, height: number, sex: number, impedanceMark: number, fitnessMark: number): void;
  resetDevice(mac: string): void;
  broadCastTypeDevice(mac: string, type: number): void;
  setDeviceLightUp(mac: string): void;
  enterHS2SProHeartRateMeasurementMode(mac: string): void;
  exitHS2SProHeartRateMeasurementMode(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('HS2SProModule');
