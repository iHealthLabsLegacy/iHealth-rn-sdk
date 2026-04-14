package com.ihealth.ihealthlibrary;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactContext;

/**
 * Created by Jeepend on 21/11/2016.
 * Base class for iHealth Modules, provide sendEvent method for you.
 * Updated for React Native 0.81+ compatibility.
 */
@ReactModule(name = "iHealthBaseModule")
public abstract class iHealthBaseModule extends ReactContextBaseJavaModule {

    private final String TAG;
    public static final String ACTION_GET_ALL_CONNECTED_DEVICES = "action_get_all_connected_devices";
    private static ReactApplicationContext sReactContext;

    public iHealthBaseModule(String tag, ReactApplicationContext reactContext) {
        super(reactContext);
        iHealthBaseModule.sReactContext = reactContext;
        TAG = tag;
    }

    void sendEvent(String eventName, WritableMap data) {
        ReactContext reactContext = getReactApplicationContext();
        if (reactContext != null) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
        } else {
            Log.e(TAG, "ReactContext is null, can't send event: " + eventName);
        }
    }

    public abstract void handleNotify(String mac, String deviceType, String action, String message);
}
