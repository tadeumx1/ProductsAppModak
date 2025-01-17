import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 16,
    color: '##7d7c7c',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  errorOperation: {
    fontSize: 14,
    color: '##7d7c7c',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
});
