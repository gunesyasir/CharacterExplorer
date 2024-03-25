import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import Root from './src/navigation/Root';
import {Provider, useSelector, TypedUseSelectorHook} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './src/redux/reducers/rootReducer';

const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const App = (): React.JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
