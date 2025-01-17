import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { styles } from './styles';

const LoadingDeepLink = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" />
      <Text style={styles.text}>Loading data</Text>
    </View>
  );
};

export default LoadingDeepLink;
