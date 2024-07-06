import React from 'react';
import { Stack } from 'expo-router';
const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Einstellungen',
          headerLargeTitle: true,
          headerShadowVisible: false,
          

          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
    </Stack>
  );
};
export default Layout;