import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getOfflineData(mac: string): void;
  measureOnline(mac: string, unit: number, userId: number): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('HS4SModule');
