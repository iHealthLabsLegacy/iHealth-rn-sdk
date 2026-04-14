import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

const useScanAPI = () => {
    const [onScanState, SetOnScanState] = useState({});
    const [isScanning, setScanning] = useState(false);

    const scanDevice = (type) => {
        console.log("scan device: " + type);
        setScanning(true);
        iHealthDeviceManagerModule.startDiscovery(type);
    };

    useEffect(() => {
        // Create NativeEventEmitter inside useEffect so native modules
        // are fully initialized before we subscribe.
        const nativeModule = NativeModules.iHealthDeviceManagerModule;
        console.log('[useScanAPI] nativeModule:', nativeModule ? 'found' : 'null',
            'addListener:', typeof nativeModule?.addListener,
            'removeListeners:', typeof nativeModule?.removeListeners);

        const emitter = nativeModule
            ? new NativeEventEmitter(nativeModule)
            : null;

        if (!emitter) {
            console.warn('[useScanAPI] Cannot create NativeEventEmitter - module not ready');
            return;
        }

        const scanListener = emitter.addListener(
            iHealthDeviceManagerModule.Event_Scan_Device,
            (event) => {
                console.log('[useScanAPI] scan event:', event);
                SetOnScanState(event);
            }
        );

        const scanFinishListener = emitter.addListener(
            iHealthDeviceManagerModule.Event_Scan_Finish,
            () => {
                setScanning(false);
            }
        );

        return () => {
            scanListener.remove();
            scanFinishListener.remove();
        };
    }, []);

    return { onScanState, isScanning, scanDevice };
};

export default useScanAPI;
