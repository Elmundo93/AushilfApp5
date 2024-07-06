import React from 'react';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';



import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {router} from 'expo-router';
import { signUp} from '../(auth)/auth';






const Page = () => {
  
  const [loading, setLoading] = useState(false);
const [email, setEmail] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [password, setPassword] = useState('');
const [vorname, setVorname] = useState('');
const [nachname, setNachname] = useState('');
const [location, setLocation] = useState('');









  const handleSignUp = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert('Die Passwörter stimmen nicht überein.');
      return;
    }
    try {
      await signUp(email, password, confirmPassword, vorname, nachname, location, setLoading);
      console.log("Benutzer erfolgreich registriert und in Firestore gespeichert");
      router.push('/(tabs)/pinnwand');
    } catch (error) {
        // Ersetzen Sie console.error durch einen Fehlerberichtsdienst
        console.error(error);
        alert('Fehler bei der Registrierung');
    }
    setLoading(false);
    
    };

  return (

    <SafeAreaView>
      <ScrollView>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }} >
    <View style={{  backgroundColor:'white', height: '100%'  }}>
      
<View style={{ justifyContent: 'center' , alignItems : 'center'}}>
  <View style={{ width:'90%', backgroundColor: 'green', borderRadius: 20, padding: 40, marginTop: 50, alignItems: 'center' }}>

    <Text style={styles.label}>Vorname:</Text>
    <TextInput value={vorname} style={styles.input} placeholderTextColor={'white'} placeholder="Vorname" autoCapitalize="none" onChangeText={(text) => setVorname(text)}/>
    <Text style={styles.label}>Nachname:</Text>
    <TextInput value={nachname} style={styles.input} placeholderTextColor={'white'} placeholder="Nachname" autoCapitalize="none" onChangeText={(text) => setNachname(text)}/>
   <Text style={styles.label}>Wohnort:</Text>
    <TextInput value={location} style={styles.input} placeholderTextColor={'white'} placeholder="Wohnort" autoCapitalize="none" onChangeText={(text) => setLocation(text)}/>
    <Text style={styles.label}>E-Mail Adresse:</Text>
    <TextInput value={email} style={styles.input} placeholderTextColor={'white'} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}/>

   
    <Text style={styles.label}>Passwort:</Text>
    <TextInput secureTextEntry={true}  value={password} style={styles.input} placeholderTextColor={'white'} placeholder="Passwort" autoCapitalize="none" onChangeText={(text) => setPassword(text)}/>
      <Text style={styles.label}>Passwort wiederholen:</Text>
      <TextInput secureTextEntry={true}  value={confirmPassword} style={styles.input} placeholderTextColor={'white'} placeholder="Passwort wiederholen" autoCapitalize="none" onChangeText={(text) => setConfirmPassword(text)}/>
  </View>
  
</View>

<View style={{flex : 1, justifyContent: 'center', alignItems : 'center'}}>


{loading ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={handleSignUp}>
                      <Text style={{color: 'white', fontSize:20, textAlign: 'center'}}>Registrieren!</Text>
                    </TouchableOpacity></View>}
       </View>
          
            
    </View>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginBottom: 10, 
    fontSize: 30, 
    color: 'white'
  },
  loginContainer: {
    backgroundColor: 'orange', 
    padding: 10, 
    borderRadius: 25, 
    marginTop: 50,
    width: '75%',
  },
  input: {
    width: '100%', 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 10, 
    color: 'white', 
    textAlign: 'center'
  },
  buttonContainer: {
    flex : 1, 
    justifyContent: 'center' , 
    alignItems : 'center'
  },
  buttonTitle: {
    color: 'white', 
    fontSize: 21 , 
    fontWeight: 'bold'
  },
  
});

export default Page;


