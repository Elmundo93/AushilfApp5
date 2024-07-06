import React, { useEffect, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Channel, ChannelSort } from "stream-chat";
import { ChannelPreviewMessenger } from "stream-chat-expo";
import { chatClient } from "../../app/services/streamService";

const ChatListScreen: React.FC = () => {
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const filter = { type: "messaging", members: { $in: [chatClient.userID as string] } };
      const sort: ChannelSort = [{ last_message_at: -1 as const }];
      const fetchedChannels = await chatClient.queryChannels(filter, sort);
      setChannels(fetchedChannels as Channel[]);
    };

    fetchChannels();
  }, []);

  const handleChannelPress = (channelId: string) => {
    router.push(`/Chat/${channelId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.id || ""}
        renderItem={({ item }) => {
          const latestMessage = item.state.messages[item.state.messages.length - 1];
          const latestMessagePreview = {
            messageObject: latestMessage,
            previews: [
              {
                text: latestMessage?.text || "",
                bold: false,
              },
            ],
            status: 0,
          };

          return (
            <TouchableOpacity onPress={() => handleChannelPress(item.id || "")}>
              <ChannelPreviewMessenger 
                channel={item}
                latestMessagePreview={latestMessagePreview}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatListScreen;