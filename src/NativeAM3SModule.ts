import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  reset(mac: string): void;
  getUserId(mac: string): void;
  setUserId(mac: string, userId: number): void;
  syncRealTime(mac: string): void;
  setUserInfo(mac: string, age: number, height: number, weight: number, gender: number, unit: number, target: number, activityLevel: number): void;
  getUserInfo(mac: string): void;
  getAlarmClockNum(mac: string): void;
  getAlarmClockDetail(mac: string, alarmIDS: Object[]): void;
  setAlarmClock(mac: string, alarmID: number, hour: number, min: number, isRepeat: number, weekArray: Object[], isOn: number): void;
  deleteAlarmClock(mac: string, alarmID: number): void;
  getActivityRemind(mac: string): void;
  setActivityRemind(mac: string, hour: number, min: number, isOn: number): void;
  syncActivityData(mac: string): void;
  syncSleepData(mac: string): void;
  syncStageReportData(mac: string): void;
  syncRealData(mac: string): void;
  queryAMState(mac: string): void;
  setUserBmr(mac: string, bmr: number): void;
  sendRandom(mac: string): void;
  disconnect(mac: string): void;
  setHourMode(mac: string, hourMode: number): void;
  getHourMode(mac: string): void;
  setPicture(mac: string, index: number): void;
  getPicture(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('AM3SModule');
