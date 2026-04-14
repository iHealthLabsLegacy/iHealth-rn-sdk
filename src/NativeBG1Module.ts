import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  sendCode(QR: string, codeType: number, testType: number): void;
  getBottleInfoFromQR(QR: string): void;
}

export default TurboModuleRegistry.get<Spec>('BG1Module');
