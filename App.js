import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './screens/FeedScreen';
import CameraScreen from './screens/CameraScreen';
import ImageScreen from './screens/ImageScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = focused
                ? 'share-social'
                : 'share-social-outline';
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (route.name === 'Images') {
              iconName = focused ? 'image' : 'image-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "steelblue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Images" component={ImageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
