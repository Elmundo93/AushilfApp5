import React from 'react';
import { View } from 'react-native';
import PinnwandFilters from '@/components/CheckboxGroups/PinnwandFilters';
import { createRStyle } from 'react-native-full-responsive';

const Pinnwand: React.FC = () => {
  return (
    <View style={styles.container}>
      <PinnwandFilters />
    </View>
  );
};

const styles = createRStyle({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Pinnwand;