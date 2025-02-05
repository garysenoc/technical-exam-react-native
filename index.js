/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { TamaguiProvider } from '@tamagui/core'
import {name as appName} from './app.json';
import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';


function Main() {
    return (
      <Provider store={store} persistor={persistor}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
      </Provider>
    );
  }
  

AppRegistry.registerComponent(appName, () => Main);
