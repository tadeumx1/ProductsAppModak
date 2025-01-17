import React from 'react';
import { Platform, Text } from 'react-native';
import { Card, Paragraph, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductObject } from '../../services/modules/product/types';
import { styles } from './styles';

interface ProductDetailCardProps {
  product: ProductObject;
  handleAddCalendarEvent: (productName: string) => void;
}

const ProductDetailCard = ({
  product,
  handleAddCalendarEvent,
}: ProductDetailCardProps) => {
  const { title, brand, description, stock, thumbnail } = product;
  const platformIsAndroid = Platform.OS === 'android';

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: thumbnail }} style={styles.thumbnail} />
      <Card.Content>
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.brand}>{brand ? brand : 'No Brand'}</Paragraph>
        <Paragraph style={styles.description}>{description}</Paragraph>
        <Text style={styles.stock}>
          {stock > 0 ? `In Stock: ${stock}` : 'Out of Stock'}
        </Text>
        {platformIsAndroid && (
          <Button
            mode="contained"
            icon={() => <Icon name="calendar" size={20} color="#fff" />}
            onPress={() => handleAddCalendarEvent(product.title)}
            style={styles.reminderButton}
          >
            <Text>Add Reminder</Text>
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default ProductDetailCard;
