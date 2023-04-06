import { NavigationProvider } from './navigation'
import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { ReduxProvider } from '../redux/ReduxProvider'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '../redux/store';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <ReduxProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>{children}</NativeBaseProvider>
        </PersistGate>
      </ReduxProvider>
    </NavigationProvider>
  )
}
