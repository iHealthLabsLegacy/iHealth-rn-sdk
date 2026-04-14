import { useState, useEffect, useRef } from 'react';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

const useConnectAPI = () => {
    const [onConnectedState, setConnectedState] = useState({});
    const [onConnectFailState, setConnectFailState] = useState({});
    const [onDisConnectState, setDisConnectState] = useState({});
    // Deduplicate connect events: native SDK may fire twice under New Architecture
    const lastConnectedMacRef = useRef(null);
    const lastConnectedTimeRef = useRef(0);

    const connectDevice = (mac, type) => {
        console.log("connect device: ", mac, type);
        iHealthDeviceManagerModule.connectDevice(mac, type);
    };

    useEffect(() => {
        const nativeModule = NativeModules.iHealthDeviceManagerModule;
        const emitter = nativeModule ? new NativeEventEmitter(nativeModule) : null;

        if (!emitter) {
            console.warn('[useConnectAPI] Cannot create NativeEventEmitter - module not ready');
            return;
        }

        const connectedListener = emitter.addListener(
            iHealthDeviceManagerModule.Event_Device_Connected,
            (event) => {
                const now = Date.now();
                // Ignore duplicate connect events for the same MAC within 2 seconds
                if (event.mac === lastConnectedMacRef.current && now - lastConnectedTimeRef.current < 2000) {
                    return;
                }
                lastConnectedMacRef.current = event.mac;
                lastConnectedTimeRef.current = now;
                console.log(iHealthDeviceManagerModule.Event_Device_Connected, event);
                setConnectedState(event);
            }
        );

        const connectFailListener = emitter.addListener(
            iHealthDeviceManagerModule.Event_Device_Connect_Failed,
            (event) => {
                console.log(iHealthDeviceManagerModule.Event_Device_Connect_Failed, event);
                setConnectFailState(event);
            }
        );

        const disconnectListener = emitter.addListener(
            iHealthDeviceManagerModule.Event_Device_Disconnect,
            (event) => {
                console.log(iHealthDeviceManagerModule.Event_Device_Disconnect, event);
                setDisConnectState(event);
            }
        );

        return () => {
            connectedListener.remove();
            connectFailListener.remove();
            disconnectListener.remove();
        };
    }, []);

    return { connectDevice, onConnectedState, onConnectFailState, onDisConnectState };
};

export default useConnectAPI;
