import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsParams } from '../types';
import { Home, Likes } from '../screens';

const Tabs = createBottomTabNavigator<BottomTabsParams>();

export const BottomTabs: React.FC = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Likes" component={Likes} />
    </Tabs.Navigator>
  );
};
