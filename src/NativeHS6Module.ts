import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  init(userName: string): void;
  setWifi(ssid: string, password: string): void;
  bindDeviceHS6(birthday: string, weight: number, height: number, isSporter: number, gender: number, serialNumber: string): void;
  unBindDeviceHS6(serialNumber: string): void;
  getToken(clientId: string, clientSecret: string, username: string, clientPara: string): void;
  setUnit(username: string, unitType: number): void;
  getCloudData(clientId: string, clientSecret: string, username: string, ts: number, pageSize: number): void;
}

export default TurboModuleRegistry.get<Spec>('HS6Module');
