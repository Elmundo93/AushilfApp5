import React from 'react';
import { Stack } from 'expo-router';



const PinnwandStackNavigator = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'AushilfApp',
          headerLargeTitle: true,
          headerShadowVisible: false,
        
        }}
      />
     
    </Stack>
  );
};
export default PinnwandStackNavigator;