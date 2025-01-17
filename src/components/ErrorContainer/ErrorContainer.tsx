import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../Button';
import { styles } from './styles';

const ErrorContainer = ({
  onRetry,
  errorOperation,
}: {
  onRetry: () => void;
  errorOperation: string;
}) => {
  return (
    <View style={styles.errorContainer}>
      <Icon name="alert-circle-outline" size={80} color="#D32F2F" />
      <Text style={styles.errorTitle}>Something Went Wrong</Text>
      <Text style={styles.errorMessage}>
        Please check your connection and try again
      </Text>
      {errorOperation && (
        <Text style={styles.errorMessage}>
          {errorOperation ? errorOperation : ''}
        </Text>
      )}
      <Button
        title="Retry"
        titleColor="#FFFFFF"
        onPress={onRetry}
        color="#6200EE"
      />
    </View>
  );
};

export default ErrorContainer;
