import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { chatClient } from '../../services/streamService';

interface Post {
  id: string;
  userId: string; // Hinzugefügt
  category: string;
  createdAt: string;
  location: string;
  nachname: string;
  option: string;
  postText: string;
  vorname: string;
}

const formatName = (vorname: string, nachname: string) => {
  return `${vorname} ${nachname.charAt(0)}.`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}.${month}.${year}`;
};

export default function PostDetail() {
  const { post } = useLocalSearchParams();
  const postDetails: Post = JSON.parse(post as string);
  const router = useRouter();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChatPress = async () => {
    if (!currentUserId) {
      alert('Bitte melden Sie sich an, um eine Nachricht zu senden.');
      return;
    }

    try {
      const channel = chatClient.channel('messaging', {
        members: [currentUserId, postDetails.userId], // Verwende die gespeicherte User-ID
      });

      await channel.watch();

      router.push({
        pathname: 'nachrichten/Chat/[channelId]',
        params: { channelId: channel.id },
      });
    } catch (error) {
      console.error('Fehler beim Starten des Chats:', error);
      alert('Fehler beim Starten des Chats. Bitte versuchen Sie es später erneut.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {`Aushilfe ${postDetails.option === 'bieten' ? 'geboten' : 'gesucht'} in ${postDetails.location}`}
        </Text>
        <Text style={styles.subHeaderText}>
          {`von ${formatName(postDetails.vorname, postDetails.nachname)}`}
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.postText}>{postDetails.postText}</Text>
        <Text style={styles.dateText}>{formatDate(postDetails.createdAt)}</Text>
      </View>
      <TouchableHighlight style={styles.button} onPress={handleChatPress}>
        <Text style={styles.buttonText}>Nachricht schreiben!</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    color: 'gray',
  },
  contentContainer: {
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 14,
    color: 'gray',
  },
  button: {
    padding: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});