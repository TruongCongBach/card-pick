/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import type {Node} from 'react';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DeckOfCardsApp from './DeckOfCardsApp';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={DeckOfCardsApp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
