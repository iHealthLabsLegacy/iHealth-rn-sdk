import type {TurboModule} from 'react-native';
import {TurboModuleRegistry} from 'react-native';

export interface Spec extends TurboModule {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  sdkAuthWithLicense(license: string): void;
  startDiscovery(deviceType: string): void;
  stopDiscovery(): void;
  connectDevice(mac: string, type: string): void;
  disconnectDevice(mac: string, type: string): void;
  getDevicesIDPS(mac: string, callback: (idps: Object) => void): void;
  authenConfigureInfo(userID: string, clientID: string, clientSecret: string): void;
  authenAppSecret(appSecret: string): void;
}

export default TurboModuleRegistry.get<Spec>('iHealthDeviceManagerModule');
