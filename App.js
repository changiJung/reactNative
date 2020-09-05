import * as React from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainForm from './components/MainForm';
import SignForm from './components/SignForm';
import MainBoard from './components/MainBoard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="MainForm"
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen name="MainForm" component={MainForm} 
        screenOptions={{
          headerShown: false
        }}
        />
        <Stack.Screen name="SignForm" component={SignForm} 
      screenOptions={{
        headerShown: true
      }}        
          options={{
            title : "회원가입"
          }}      
        />
        <Stack.Screen name="MainBoard" component={MainBoard} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
