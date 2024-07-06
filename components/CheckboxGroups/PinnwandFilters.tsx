

import React, { useEffect, useState, useCallback } from 'react';
import { View, TouchableHighlight, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { createRStyle } from 'react-native-full-responsive';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPosts } from '@/components/Post/FetchPost';
import { useRouter } from 'expo-router';

interface Post {
  id: string;
  category: string;
  createdAt: string;
  location: string;
  nachname: string;
  option: string;
  postText: string;
  vorname: string;
}

const PinnwandFilters: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [suchenChecked, setSuchenChecked] = useState(false);
  const [bietenChecked, setBietenChecked] = useState(false);
  const [gartenChecked, setGartenChecked] = useState(false);
  const [haushaltChecked, setHaushaltChecked] = useState(false);
  const [sozialesChecked, setSozialesChecked] = useState(false);
  const [gastroChecked, setGastroChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      const postsList = await fetchPosts();
      setPosts(postsList);
      setFilteredPosts(postsList);
      setLoading(false);
    };

    loadPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [suchenChecked, bietenChecked, gartenChecked, haushaltChecked, sozialesChecked, gastroChecked]);

  const applyFilters = useCallback(() => {
    let filtered = posts;

    if (suchenChecked || bietenChecked) {
      filtered = filtered.filter(post =>
        suchenChecked ? post.option === 'suchen' : post.option === 'bieten'
      );
    }

    const categories = [
      gartenChecked ? 'garten' : '',
      haushaltChecked ? 'haushalt' : '',
      sozialesChecked ? 'soziales' : '',
      gastroChecked ? 'gastro' : '',
    ].filter(Boolean);

    if (categories.length > 0) {
      filtered = filtered.filter(post => categories.includes(post.category));
    }

    setFilteredPosts(filtered);
  }, [suchenChecked, bietenChecked, gartenChecked, haushaltChecked, sozialesChecked, gastroChecked, posts]);




  const handleSuchenBietenChange = (option: string) => {
    if (option === 'suchen') {
      setSuchenChecked(!suchenChecked);
      setBietenChecked(false);
    } else if (option === 'bieten') {
      setBietenChecked(!bietenChecked);
      setSuchenChecked(false);
    }
  };



  
  const handleCategoryChange = (category: string) => {
    if (category === 'garten') {
      setGartenChecked(!gartenChecked);
      setHaushaltChecked(false);
      setSozialesChecked(false);
      setGastroChecked(false);
    }
    if (category === 'haushalt') {
      setGartenChecked(false);
      setHaushaltChecked(!haushaltChecked);
      setSozialesChecked(false);
      setGastroChecked(false);
    }
    if (category === 'soziales') {
      setGartenChecked(false);
      setHaushaltChecked(false);
      setSozialesChecked(!sozialesChecked);
      setGastroChecked(false);
    }
    if (category === 'gastro') {
      setGartenChecked(false);
      setHaushaltChecked(false);
      setSozialesChecked(false);
      setGastroChecked(!gastroChecked);
    }
  };

  const getCheckboxImage = (label: string) => {
    switch (label) {
      case 'Garten':
        return require('../../assets/images/GartenIcon.png');
      case 'Haushalt':
        return require('../../assets/images/HaushaltIcon.png');
      case 'Soziales':
        return require('../../assets/images/SozialesIcon.png');
      case 'Gastro':
        return require('../../assets/images/GastroIcon.png');
      case 'Suchen':
        return require('../../assets/images/LookingFor.png');
      case 'Bieten':
        return require('../../assets/images/RaisingHand.png');
      default:
        return require('../../assets/images/GastroIcon.png');
    }
  };

  const getUnderlayColor = (label: string) => {
    switch (label) {
      case 'Garten':
        return 'lightgreen';
      case 'Haushalt':
        return 'lightblue';
      case 'Soziales':
        return 'rgb(255, 102, 102)';
      case 'Gastro':
        return 'rgb(255, 255, 102)';
      case 'Bieten':
        return 'green';
      case 'Suchen':
        return 'orange';
      default:
        return 'grey';
    }
  };

  const renderCheckbox = (label: string, isChecked: boolean, onCheck: () => void) => (
    <TouchableHighlight
      key={label}
      onPress={onCheck}
      style={[styles.checkboxBox, { backgroundColor: isChecked ? getUnderlayColor(label) : 'transparent' }]}
      underlayColor={getUnderlayColor(label)}
      activeOpacity={0.6}
    >
      <Image source={getCheckboxImage(label)} style={styles.checkboxBoxImage} resizeMode="contain" />
    </TouchableHighlight>
  );


  const renderHeader = () => (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Wilkommen auf der Pinnwand!</Text>
        <Text style={styles.welcomeText2}>Starte deine Suche und </Text>
        <TouchableOpacity style={styles.modalButton} onPress={() => router.push('/(modal)/createPost')}>
          <Text style={styles.modalButtonText}>Verfasse einen Pinnwandbeitrag!</Text>
        </TouchableOpacity>
        <Text style={styles.welcomeText2}>- oder finde was du suchst mit den Pinnwand-Filtern!</Text>
        <View style={styles.lottieContainer}>
        <LottieView
          source={require('../../assets/animations/Animation - 1717332882698.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <LottieView
          source={require('../../assets/animations/Animation - 1717332882698.json')}
          autoPlay
          loop
          style={styles.lottie}
        /> 
        <LottieView
        source={require('../../assets/animations/Animation - 1717332882698.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
        </View>
      </View>
      <View style={styles.filtersContainer}>
        {renderCheckbox('Suchen', suchenChecked, () => handleSuchenBietenChange('suchen'))}
        {renderCheckbox('Bieten', bietenChecked, () => handleSuchenBietenChange('bieten'))}
        <View style={styles.trenner} />
        {renderCheckbox('Garten', gartenChecked, () => handleCategoryChange('garten'))}
        {renderCheckbox('Haushalt', haushaltChecked, () => handleCategoryChange('haushalt'))}
        {renderCheckbox('Soziales', sozialesChecked, () => handleCategoryChange('soziales'))}
        {renderCheckbox('Gastro', gastroChecked, () => handleCategoryChange('gastro'))}
      </View>
    </View>
  );


  const renderItem = ({ item }: { item: Post }) => {
    const getOptionIcon = (option: string) => {
      switch (option) {
        case 'bieten':
          return require('../../assets/images/RaisingHandBackgroundColor.png');
        case 'suchen':
          return require('../../assets/images/LookingForBackgroundColor.png');
        default:
          return require('../../assets/images/bienenlogo.png');
      }
    };

    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'gastro':
          return require('../../assets/images/GastroIconBackgroundColor.png');
        case 'garten':
          return require('../../assets/images/GartenIconBackgroundColor.png');
        case 'haushalt':
          return require('../../assets/images/HaushaltIconBackgroundColor.png');
        case 'soziales':
          return require('../../assets/images/SozialesIconBackgroundColor.png');
        default:
          return require('../../assets/images/bienenlogo.png');
      }
    };

    const optionIcon = getOptionIcon(item.option);
    const categoryIcon = getCategoryIcon(item.category);

    return (
      <View style={styles.post}>
        <View style={styles.iconContainer}>
          <Image source={optionIcon} style={styles.icon} />
          <Image source={categoryIcon} style={styles.icon} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {item.vorname} {item.nachname.charAt(0)}.
            </Text>
            <Text style={styles.location}>{item.location}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).getDate().toString().padStart(2, '0')}.
              {(new Date(item.createdAt).getMonth() + 1).toString().padStart(2, '0')}
            </Text>
          </View>
          <Text style={styles.postText} numberOfLines={2}>
            {item.postText}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: '/(modal)/postDetail/[postID]',
              params: { postID: item.id, post: JSON.stringify(item) },
            })
          }
        >
          <Text style={styles.buttonText}>Beitrag ansehen!</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {loading ? (
        <View style={styles.loaderContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={ <View style={{borderWidth:1,borderRadius:25, backgroundColor:'green', justifyContent:'center', alignContent:'center', margin:25, padding:20}}><Text style={{color:'white', alignSelf:'center', fontSize:30}} >Kein Eintrag für diese Kategorie gefunden 🤷</Text><Text style={{color:'white', alignSelf:'center', fontSize:30, marginTop:20}}>Bitte wähle einen anderen Filter!✌️</Text></View>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = createRStyle({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '95rs',
  },
  headerContainer: {
    marginBottom: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '10rs',
  },
  trenner: {
    width: 10,
    marginHorizontal: '8rs',
    backgroundColor: 'lightgrey',
    height: '80%',
    borderRadius: '25rs',
    alignSelf: 'center',
  },
  loaderContainer: {
    
    justifyContent: 'space-between'
  },
  checkboxBox: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    margin: 10
  },
  checkboxBoxImage: {
    width: '45rs',
    height: '45rs'
  },
  pinnwandColor: {
    color: 'amber', },
    lottieContainer : {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: '10rs',
    },

    lottie: {
    alignSelf: 'center',
    width: '40rs',
    height: '30rs',
    zIndex: 1000,
  },
  
  createPostTextContainer: {

    marginTop: '90rs',
  },
welcomeText: {
  fontSize: '24rs',
  fontWeight: 'bold',
  marginBottom: '10rs',
  alignSelf: 'center'
},

welcomeText2: {
  fontSize: '24rs',
  alignSelf: 'center',
  fontWeight: 'bold'},

  modalLink: {
    color: 'white',
    fontSize: '24rs',
    fontWeight: 'bold',
  },

  modalButton: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 35,
    marginVertical: '10rs',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
   
  },
  modalButtonText: {
    color: 'white',
    fontSize: '24rs',
    fontWeight: 'bold',
  },



  post: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    borderRadius: 5

  },
  contentContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  location: {
    fontSize: 12,
    color: '#555'
  },
  date: {
    fontSize: 12,
    color: '#555'
  },
  postText: {
    fontSize: 14,
    marginVertical: 10
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }

 
 

 



 
  
  
  
  
 
  
  

  





  
});

export default PinnwandFilters;