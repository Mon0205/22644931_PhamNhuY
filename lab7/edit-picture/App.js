import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EditScreen from './screens/EditScreen';
import GalleryScreen from './screens/Gallery';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Trang chủ">
        <Stack.Screen name="Trang chủ" component={HomeScreen} />
        <Stack.Screen name="Chỉnh sửa ảnh" component={EditScreen} />
        <Stack.Screen name="Thư viện" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
