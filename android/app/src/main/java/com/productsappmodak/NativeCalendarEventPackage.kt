package com.productsappmodak

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class NativeCalendarEventPackage : TurboReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
    if (name == NativeCalendarEventModule.NAME) {
      NativeCalendarEventModule(reactContext)
    } else {
      null
    }

    /* This method is used to export native Views to React Native */
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
    mapOf(
      NativeCalendarEventModule.NAME to ReactModuleInfo(
        _name = NativeCalendarEventModule.NAME,
        _className = NativeCalendarEventModule.NAME,
        _canOverrideExistingModule = false,
        _needsEagerInit = false,
        isCxxModule = false,
        isTurboModule = true
      )
    )
  }
}
