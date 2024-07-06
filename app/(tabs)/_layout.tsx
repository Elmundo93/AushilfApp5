
import { Ionicons } from '@expo/vector-icons';
import { Tabs} from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';

const TabsLayout = () => {
 

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
        }}>
        <Tabs.Screen
          name="pinnwand"
          options={{
            headerShown: false,
            title: 'Pinnwand',
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="update" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="nachrichten"
          options={{
            title: 'Nachrichten',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
            ),
            
          }}
        />
        <Tabs.Screen
          name="anmeldung"
          options={{
            title: 'Anmelden',
            headerShown: false,
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="einstellungen"
          options={{
            title: 'Einstellungen',
            headerShown: false,
            tabBarIcon: ({ size, color }) => <Ionicons name="cog" size={size} color={color} />,
           
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};
export default TabsLayout;