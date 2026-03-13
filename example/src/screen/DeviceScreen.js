import React, { useEffect, useRef } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { ListItem } from '@rneui/themed';
import { NativeEventEmitter, NativeModules } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';
import deviceAPIs from '../api/getAPIs';
import useDeviceAPI from '../api/useDeviceAPI';

const DeviceScreen = ({ navigation, route }) => {

  const { mac, type } = route.params;
  const { response } = useDeviceAPI(type);
  const disconnectRef = useRef(null);

  // Store disconnect fn for cleanup
  useEffect(() => {
    const api = deviceAPIs.getDeviceAPI(type);
    if (api?.apis?.disconnect) {
      disconnectRef.current = api.apis.disconnect;
    }
    return () => {
      disconnectRef.current?.(mac);
    };
  }, []); // only on mount / unmount

  // Listen for THIS device's disconnect only — use a dedicated emitter
  // so we don't double-count with ScanScreen's useConnectAPI listener.
  useEffect(() => {
    const nativeModule = NativeModules.iHealthDeviceManagerModule;
    if (!nativeModule) return;

    const emitter = new NativeEventEmitter(nativeModule);
    const sub = emitter.addListener(
      iHealthDeviceManagerModule.Event_Device_Disconnect,
      (event) => {
        if (event.mac === mac) {
          navigation.goBack();
        }
      }
    );
    return () => sub.remove();
  }, [mac]);

  const apis = deviceAPIs.getDeviceAPI(type)?.apis ?? {};

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {Object.keys(apis).map(item => (
          <ListItem
            key={item}
            onPress={() => {
              const fn = apis[item];
              if (typeof fn === 'function') fn(mac);
            }}
            bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{`Function:  ${item}`}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
      <View>
        <Text style={{ fontSize: 14, margin: 10 }}>{response}</Text>
      </View>
    </ScrollView>
  );
};

export default DeviceScreen;
