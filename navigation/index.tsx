import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { WelcomeScreen } from '../screens/WelcomeScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { LogSpikeScreen } from '../screens/LogSpikeScreen'
import { LogMedicationScreen } from '../screens/LogMedicationScreen'
import { TabNavigator } from './TabNavigator'
import { NavigationParamList } from '../types'

const Stack = createStackNavigator<NavigationParamList>()

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="LogSpike" component={LogSpikeScreen} />
        <Stack.Screen name="LogMedication" component={LogMedicationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

