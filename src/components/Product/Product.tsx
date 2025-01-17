import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';

interface ProductProps {
  title: string;
  price: number;
  thumbnail: string;
}

const Product: React.FC<ProductProps> = ({
  title,
  thumbnail,
  price,
}: ProductProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <FastImage
          style={styles.coverImage}
          source={{
            uri: thumbnail,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
          testID="image-thumbnail-container"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default Product;
