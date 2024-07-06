import { View, Text } from 'react-native'
import React from 'react'


import { SafeAreaView } from 'react-native'
import { Image} from 'react-native';
import {  router } from 'expo-router';
import { createRStyle} from 'react-native-full-responsive';




import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const Page = () => {




    

    const register = () => {
      router.push('/Welcome');
    };

    const login = () => {
      router.push('/Login');
    };


    
   
    
   
    
   
    
   
    

            return (
                <SafeAreaView style={styles.container}>
                    <ScrollView>
               
                 
                  <Image source={require('../assets/images/people.jpg')} resizeMode="center" style={styles.imageBackground}/>
                    <View style={styles.welcomeView}>
                      <Text style={styles.welcomeText}>Herzlich Willkommen!</Text>
                    </View>
                    <View style={styles.greenView}>
                      <Text style={styles.greenText}>
                Wir helfen ihnen eine helfende Hand zu finden!
                </Text>
                <Text style={styles.greenText}>
                  - oder eine zu werden!
                </Text>
                <Text style={styles.greenText} >
                  Der erste Monat ist kostenlos, danach entscheide selbst wieviel du beitragen möchtest!
                  </Text>
            
            </View>
            <View style={styles.buttonContainer}>
            <View style={styles.probemonat }>
            <TouchableOpacity onPress={register}>
  <Text style={styles.buttonText}>Zum Probemonat!🚀</Text>
</TouchableOpacity>
                  </View>
                  <View style={styles.google }>
            <TouchableOpacity >
  <Text style={styles.buttonText}>Mit Google anmelden</Text>
</TouchableOpacity>
                  </View>
            
                  <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={login}>
                      <Text style={styles.buttonText}>Einloggen</Text>
                    </TouchableOpacity>
                  </View>
                </View>
        
                </ScrollView>
                </SafeAreaView>
                );
       
        
        
        };
        
        export default Page;

        const styles = createRStyle({
            container: {
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center'
            },
            imageBackground: {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top:'28rs'
            
          },
            
            welcomeView: {
                marginTop: '25rs'
            },
            welcomeText: {
              fontSize: '28rs',
              fontWeight: 'bold'
          },
          greenView: {
            marginTop: '20rs',
            padding: '10rs',
            backgroundColor: 'green',
            borderRadius: '25rs'
        },
        greenText: {
          fontSize: '24rs',
          color: 'white',
          padding: '5rs'
      },
      buttonContainer: {
            
        marginTop: '50rs', 
        alignItems: 'center',
        
      },
      probemonat: {
        justifyContent: 'center' , alignItems : 'center',
        backgroundColor: 'green',
        padding: '10rs',
        borderRadius: '25rs',
      color: 'white',
      marginTop: '100rs',
      height: '60rs',
      width: '350rs'
     },
     buttonText: {
        color: 'white',
        fontSize: '20rs'
    },

    google: {
      justifyContent: 'center' , alignItems : 'center',
      backgroundColor: 'white',
       padding: '10rs',
       borderRadius: 25,
       borderBlockColor: 'black',
       color: 'black'},

    loginContainer : {
      marginTop:50, backgroundColor: 'orange',
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 25,
     height: '60rs',
     width: '350rs'
     
    
   },       
            input: {
              height: 40,
              margin: 12,
              borderWidth: 1,
            }
          });