import React, { useMemo } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ProductDetailCard } from '../../components/ProductDetailCard';
import { ProductObject } from '../../services/modules/product/types';
import { useProductDetail } from './useProductDetail';
import { styles } from './styles';
import { ActivityIndicator, Text } from 'react-native-paper';
import { ErrorContainer } from '@/src/components/ErrorContainer';

type ProductDetailRouteProp = RouteProp<
  { ProductDetail: { product: ProductObject; productId?: number } },
  'ProductDetail'
>;

interface ProductDetailProps {
  route: ProductDetailRouteProp;
}

const BackButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity
    style={styles.backProductDetailButton}
    onPress={onPress}
    accessibilityLabel="Go back"
    accessibilityRole="button"
  >
    <Icon name="arrow-left" size={24} color="#000" />
  </TouchableOpacity>
);

const ProductDetail = ({ route }: ProductDetailProps) => {
  const { product, productId } = route.params;

  const {
    handleAddCalendarEvent,
    handleNavigateBack,
    productGetId,
    productDataGetId,
    isErrorGetProductId,
    isLoadingGetProductsId,
    getProductIdData,
    handleProductValid,
  } = useProductDetail({ productId });

  const displayedProduct = useMemo(() => {
    if (productGetId && handleProductValid(productDataGetId)) {
      return productDataGetId;
    }
    return product;
  }, [productGetId, productDataGetId, handleProductValid, product]);

  if (isLoadingGetProductsId) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.text}>Loading</Text>
      </View>
    );
  }

  if (isErrorGetProductId) {
    return (
      <ErrorContainer
        errorOperation="Fetching Product Details"
        onRetry={getProductIdData}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerProductDetail}>
        <BackButton onPress={handleNavigateBack} />
        {displayedProduct && (
          <ProductDetailCard
            product={displayedProduct as ProductObject}
            handleAddCalendarEvent={handleAddCalendarEvent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
