import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Channel as StreamChannel, StreamChat } from 'stream-chat';
import { Channel, Chat, MessageList, MessageInput } from 'stream-chat-expo';
import { chatClient } from '../../../services/streamService';

const ChatScreen = () => {
  const { channelId } = useLocalSearchParams();
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const fetchedChannel = chatClient.channel('messaging', channelId as string);
      await fetchedChannel.watch();
      setChannel(fetchedChannel);
    };

    fetchChannel();
  }, [channelId]);

  if (!channel) {
    return <Text>Loading...</Text>;
  }

  return (
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <View style={styles.container}>
          <MessageList />
          <MessageInput />
        </View>
      </Channel>
    </Chat>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});