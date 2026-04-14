import { useState, useEffect } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import deviceAPIs from '../api/getAPIs';

const useDeviceAPI = (deviceType) => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const eventName  = deviceAPIs.getDeviceNotify(deviceType);
        const moduleName = deviceAPIs.getDeviceModuleName(deviceType);

        if (!eventName || !moduleName) {
            console.warn(`[useDeviceAPI] No event/module for type: ${deviceType}`);
            return;
        }

        const nativeModule = NativeModules[moduleName];
        console.log(`[useDeviceAPI] ${moduleName}:`,
            nativeModule ? 'found' : 'null',
            'addListener:', typeof nativeModule?.addListener,
            'removeListeners:', typeof nativeModule?.removeListeners);

        const emitter = nativeModule ? new NativeEventEmitter(nativeModule) : null;

        if (!emitter) {
            console.warn(`[useDeviceAPI] Cannot create NativeEventEmitter for: ${moduleName}`);
            return;
        }

        const notifyListener = emitter.addListener(eventName, (event) => {
            console.log(`[${deviceType}] event:`, event);
            setResponse(JSON.stringify(event));
        });

        return () => {
            notifyListener.remove();
        };
    }, [deviceType]);

    return { response };
};

export default useDeviceAPI;
