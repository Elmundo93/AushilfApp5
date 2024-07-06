import React, { useState } from 'react';
import { KeyboardAvoidingView, TextInput, Button, ActivityIndicator, StyleSheet, Touchable } from 'react-native';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { router } from 'expo-router';
import { View, Text } from 'react-native';
import { Image} from 'react-native';
import { SafeAreaView } from 'react-native';
import { signIn } from './(auth)/auth';

const Page = () =>{
    const auth = FIREBASE_AUTH;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(email, password, setLoading);
      router.navigate('(tabs)/pinnwand');
    } catch (error) {
      alert('Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <SafeAreaView style={styles.container}>
    <Image source={require('../assets/images/people.jpg')} resizeMode="center" style={styles.imageBackground}/>
    <View style={styles.welcomeView}>
                      <Text style={styles.welcomeText}>Anmeldung</Text>
                    </View>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.greenView}>
                      <Text style={styles.greenText}>
                Bitte geben sie ihre Email-Adresse und ihr Passwort an um sich anzumelden!
                </Text>
                
                
            
            </View>
            <View style={styles.inputView}>
      <TextInput 
        value={email} 
        style={styles.input} 
        placeholder="Email"
        placeholderTextColor={'white'} 
        autoCapitalize="none" 
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput 
        secureTextEntry={true} 
        value={password} 
        style={styles.input} 
        placeholder="Passwort" 
        
        placeholderTextColor={'white'}
        autoCapitalize="none" 
        onChangeText={(text) => setPassword(text)}
        
      />
      <View style={{marginTop: 20, marginBottom:30, backgroundColor:'orange', width:'60%', alignSelf:'center', borderRadius:25}}>

      {loading ? 
        <ActivityIndicator size="large" color="#0000ff" /> 
        : 
        <Button title="Anmelden" onPress={handleSignIn} color={'white'} />
      }
    </View>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


export default Page;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    
    alignItems: 'center',
  },
  inputView: {
    width: 350,
    marginTop: 150,
    backgroundColor: 'green',
    borderRadius: 25,
    
  },
  input: {color: 'white', height: 40, margin: 12, borderWidth: 1, padding: 10, borderRadius: 25, backgroundColor: 'green'},
    

  
  greenView: {
    justifyContent: 'center' , alignItems : 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 25,
    marginTop: 50,
},
greenText: {
  color: 'white',
  fontSize: 20,
},
imageBackground: {
  width: '100%',
  height: '100%',
  position: 'absolute',
  
},
welcomeView: {
  marginTop: 25,
},
welcomeText: {
  fontSize: 24,
  
  fontWeight: 'bold',
}
});