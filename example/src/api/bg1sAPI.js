import { BG1SModule } from '@ihealth/ihealthlibrary-react-native';

export default {
  apis: {
    getAllConnectedDevices: () => BG1SModule.getAllConnectedDevices(),
    getDeviceInfo: (mac) => BG1SModule.getFunction(mac),
    setMeasureMode: (mac) => BG1SModule.measure(mac, 1),
    disconnect: (mac) => BG1SModule.disconnect(mac)
  },
}
