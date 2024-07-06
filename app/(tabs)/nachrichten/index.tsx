import React from 'react';
import { View, StyleSheet } from 'react-native';
import ChatListScreen from '@/components/Stream/ChatListScreen';
import { createRStyle } from 'react-native-full-responsive';

const Nachrichten: React.FC = () => {
  return (
    <View style={styles.container}>
      <ChatListScreen/>
    </View>
  );
};

const styles = createRStyle({
  container: {
   
    backgroundColor: '#fff',
  },
});

export default Nachrichten;