import React from 'react';
import 'react-native-gesture-handler';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';
import LoginScreen from "./screens/loginScreen"
import DashboardScreen from "./screens/DasboardScreen"

const App = () => {
  return <AppContainer /> ;
};

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Dashboard: {
    screen: DashboardScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);


export default App;
