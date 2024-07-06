import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, Platform, KeyboardAvoidingView, Keyboard} from 'react-native';
import PostFilters from '../CheckboxGroups/PostFilters';
import { setDoc, doc } from 'firebase/firestore'; 

import { createRStyle} from 'react-native-full-responsive';

import { getDoc } from 'firebase/firestore';

import { router } from 'expo-router';
import {FIREBASE_AUTH} from '../../firebaseConfig';
import { FIRESTORE_DB } from '../../firebaseConfig'; 











const CreatePost: React.FC = () =>{

    const [postText, setPostText] = useState('');
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const scrollViewRef = useRef<ScrollView>(null);



    const handleOptionChange = (option: string) => {
      setSelectedOption(option);
    };
    
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
    };
    

 

  
    const onSubmit = async () => {
      if (!postText || !selectedCategory || !selectedOption) {
        console.error('Bitte wähle eine Kategorie & schreibe eine Nachricht.');
        return;
      }
    
      const auth = FIREBASE_AUTH;
      const user = auth.currentUser;
    
      if (!user) {
        console.error('Benutzer nicht angemeldet');
        return;
      }
    
      try {
        const userDoc = await getDoc(doc(FIRESTORE_DB, "Users", user.uid));
    
        if (!userDoc.exists()) {
          console.error('Benutzer nicht gefunden');
          return;
        }
    
        const userData = userDoc.data();
    
        console.log('Post text:', postText);
        console.log('Selected category:', selectedCategory);
    
        const postId = Date.now().toString();
        const date = new Date().toISOString();
    
        await setDoc(doc(FIRESTORE_DB, "Posts", postId), {
          postText: postText,
          category: selectedCategory,
          vorname: userData.vorname,
          nachname: userData.nachname,
          createdAt: date,
          location: userData.location,
          option: selectedOption,
          postId: postId,
          userId: user.uid  
        });
    
        console.log('Post erfolgreich erstellt');
        
        router.back();
      } catch (error) {
        console.error('Fehler beim Erstellen des Posts:', error);
      }
    };

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        (event) => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: event.endCoordinates.height, animated: true });
          }
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
          }
        }
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);

  
    return (
      
      
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        ref={scrollViewRef}
      >
        <PostFilters 
          onOptionChange={handleOptionChange} 
          onCategoryChange={handleCategoryChange}
        />

        <View>
          <TextInput
            style={styles.input}
            placeholder="Verfasse deinen Pinnwand Beitrag!"
            multiline
            value={postText}
            onChangeText={setPostText}
          />
        </View>

        <View style={styles.postButtonContainer}>
          <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
            <Text style={styles.postButtonText}>Posten</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

);
};

const styles = createRStyle({
container: {
  flexGrow: 1,
  backgroundColor: 'white',
  paddingTop: '16rs',
},
input: {
  height: '100rs',
  borderWidth: '1rs',
  borderColor: 'gray',
  marginTop: '16rs',
  paddingHorizontal: '10rs',
},
postButtonContainer: {
  flexDirection: 'row-reverse', 
  alignItems: 'center',
  padding: '20rs',
},
postButton: {
  backgroundColor: 'orange',
  borderStyle: 'solid',
  borderWidth: '1rs',
  borderColor: 'gray',
  borderRadius: '25rs',
  padding: '20rs',
},
postButtonText: {
  color: 'white',
  fontSize: '16rs',
  fontWeight: 'bold',
},
});

export default CreatePost;