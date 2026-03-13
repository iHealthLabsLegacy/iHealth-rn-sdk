import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  getAllConnectedDevices(): void;
  getIdps(): void;
  syncData(): void;
  deleteData(): void;
  spliceData(array: Object[]): void;
  getCache(): void;
  getFilterDataByFileName(dataFileName: string, markName: string): void;
}

export default TurboModuleRegistry.get<Spec>('ECGUSBModule');
