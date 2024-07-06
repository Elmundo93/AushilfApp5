import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
type CustomCheckboxPost2Props = {
    label: string;
    isChecked: boolean;
    onCheck: () => void;
  };
  
  const CustomCheckboxPost2: React.FC<CustomCheckboxPost2Props> = ({ label, isChecked, onCheck }) => {
  
  return (
    <TouchableHighlight 
      onPress={onCheck} 
      style={[styles.checkbox, { backgroundColor: isChecked ? 'orange' : 'transparent' }]}
      underlayColor='orange'
      activeOpacity={0.6}
    >
      <View style={styles.innerView}>
        <View style={styles.innerCircle} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    flexDirection: 'row', 
    marginBottom: 10, 
    padding: 10,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flexShrink: 1,

  },
  innerView: {
    flexDirection: 'column', 
    alignItems: 'center'
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderWidth: 2,
    borderColor: 'white',
  }
});

export default CustomCheckboxPost2;