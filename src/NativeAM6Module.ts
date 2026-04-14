import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getDeviceInfoAndSyncTime(mac: string, flag: number): void;
  setUserInfo(mac: string, userID: string, gender: number, age: number, height: number, weight: number): void;
  setPhonePlatform(mac: string): void;
  findDevice(mac: string, flag: number): void;
  notifyMessage(mac: string, time: number, enable: number, flag: number, title: string, detail: string): void;
  rebootDevice(mac: string): void;
  getTime(mac: string): void;
  setTargetRemind(mac: string, enable: boolean, calorie: number, steps: number): void;
  getTargetRemind(mac: string): void;
  setSedentaryRemind(mac: string, enable: boolean, start: number, end: number): void;
  getSedentaryRemind(mac: string): void;
  setRaiseToLightRemind(mac: string, enable: boolean, start: number, end: number): void;
  getRaiseToLightRemind(mac: string): void;
  setDoNotDisturbMode(mac: string, enable: boolean, start: number, end: number): void;
  getDoNotDisturbMode(mac: string): void;
  setWearHand(mac: string, hand: number): void;
  getWearHand(mac: string): void;
  setAlarmClockList(mac: string, list: string): void;
  getAlarmClockList(mac: string): void;
  startBind(mac: string): void;
  bindUserSuccess(mac: string, userID: string): void;
  bindUserFail(mac: string): void;
  unBindUser(mac: string, userID: string): void;
  readySyncData(mac: string): void;
  getDailyData(mac: string): void;
  getStepData(mac: string): void;
  getSleepData(mac: string): void;
  getHeartRateData(mac: string): void;
  getBloodOxygenData(mac: string): void;
  getActivityData(mac: string): void;
  deleteData(mac: string, type: number): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('AM6Module');
