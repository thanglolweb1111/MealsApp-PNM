import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from 'react-native-vector-icons'; // Thêm Ionicons
import { View, Text } from 'react-native';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen'; // Thêm LoginScreen
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

const MealsStack = () => (
  <Stack.Navigator initialRouteName="Categories">
  <Stack.Screen name="Categories" component={CategoriesScreen} />
  <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
</Stack.Navigator>

);

// Cấu hình Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Meals') {
          iconName = focused ? 'restaurant' : 'restaurant-outline';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        // Trả về icon tương ứng
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Meals" component={MealsStack} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

// Cấu hình Drawer Navigator
const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <Drawer.Navigator
    screenOptions={({ route }) => ({
      drawerIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Other') {
          iconName = focused ? 'information-circle' : 'information-circle-outline';
        }

        // Trả về icon tương ứng
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Drawer.Screen name="Home" component={BottomTabsNavigator} />
    <Drawer.Screen name="Other" component={OtherScreen} />
  </Drawer.Navigator>
);

const OtherScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>updating....</Text>
  </View>
);

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};
