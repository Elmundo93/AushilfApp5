import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {FRProvider} from 'react-native-full-responsive';
import './shim.js';


global.Buffer = global.Buffer || require('buffer').Buffer;
global.process = require('process');





export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  
  const colorScheme = useColorScheme();

  return (
    
    <FRProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName={user ? '(tabs)' : 'index'}>
            {!user ? (
              <>
                <Stack.Screen 
                  name="index" 
                  options={{
                    headerLeft: () => null,
                    headerBackVisible: false,
                    headerTitle: 'AushilfApp',
                  }} 
                />
                <Stack.Screen name="Welcome" options={{headerTitle: 'Registrieren'}} />
                <Stack.Screen name="Login" options={{headerTitle: 'Anmelden'}} />
              </>
            ) : (
              <>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen 
                  name="(modal)/createPost" 
                  options={{
                    presentation: 'modal',
                    title: 'Beitrag verfassen',
                  }} 
                />
                <Stack.Screen
                  name="(modal)/postDetail/[postID]"
                  options={{
                    presentation: 'modal',
                    title: 'Beitrag Details',
                  }}
                />
              </>
            )}
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </FRProvider>
  );
}

