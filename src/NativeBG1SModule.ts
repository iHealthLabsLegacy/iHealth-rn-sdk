import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  measure(mac: string, measureMode: number): void;
  getFunction(mac: string): void;
  disconnect(mac: string): void;
}

export default TurboModuleRegistry.get<Spec>('BG1SModule');
