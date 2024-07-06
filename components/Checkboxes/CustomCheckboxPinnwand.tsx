import React from 'react';
import {TouchableHighlight, Image } from 'react-native';
import { createRStyle } from 'react-native-full-responsive';

type CustomCheckboxProps = {
  label: string;
  isChecked: boolean;
  onCheck: () => void;
};

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, isChecked, onCheck }) => {
  const getUnderlayColor = () => {
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
        return 'blue';
      case 'Suchen':
        return 'orange';
      default:
        return 'grey';
    }
  };

  const getCheckboxImage = () => {
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

  return (
    <TouchableHighlight
      onPress={onCheck}
      style={[styles.checkbox, { backgroundColor: isChecked ? getUnderlayColor() : 'transparent' }]}
      underlayColor={getUnderlayColor()}
      activeOpacity={0.6}
    >
      <Image source={getCheckboxImage()} style={styles.image} resizeMode="contain" />
    </TouchableHighlight>
  );
};



const styles = createRStyle({
  checkbox: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
    height: '50rs',
    width: '50rs',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  image: {
    height: '50rs',
    width: '50rs',
  },
});

export default CustomCheckbox;