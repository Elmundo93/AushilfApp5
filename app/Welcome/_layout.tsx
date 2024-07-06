import React from 'react';
import { Stack } from 'expo-router';



export default function RootLayoutNav() {
  return (
    <Stack initialRouteName="Welcome" >
      <Stack.Screen name="index" options={{headerShown: false}}/>
   
    </Stack>
  );
}