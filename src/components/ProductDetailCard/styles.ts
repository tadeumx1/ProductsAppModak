import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    width: '90%',
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5c0394',
    marginBottom: 8,
  },
  thumbnail: {
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6c757d',
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    color: '#6c757d',
  },
  stock: {
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
  },
  reminderButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
  },
});
