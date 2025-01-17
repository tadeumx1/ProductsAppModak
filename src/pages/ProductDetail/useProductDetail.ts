import { useNavigation } from '@react-navigation/native';
import NativeCalendarEvent from '../../../specs/NativeCalendarEvent';
import { useGetProductId } from '@/src/services/modules/product';
import { ProductObject } from '@/src/services/modules/product/types';
import { useEffect, useState } from 'react';
import { useSendNotifications } from '@/src/hooks/useSendNotifications';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootParamListStack } from '../../types';

type ProductDetailNavigationProp = NativeStackNavigationProp<
  RootParamListStack,
  'ProductDetail'
>;

interface useProductDetail {
  productId?: number;
}

export const useProductDetail = ({ productId }: useProductDetail) => {
  const { sendNotification } = useSendNotifications();
  const navigation = useNavigation<ProductDetailNavigationProp>();

  const {
    data: dataProductId,
    isLoading: isLoadingGetProductsId,
    isError: isErrorGetProductId,
    refetch: getProductIdData,
  } = useGetProductId({ productId: productId || 0, queryEnabled: !!productId });

  const handleAddCalendarEvent = (productName: string) => {
    NativeCalendarEvent?.saveCalendarEvent(`Buy the ${productName} event`);
  };

  const handleNavigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home', { categoryName: null });
    }
  };

  const handleSendNotification = () => {
    sendNotification({
      title: 'Hello!',
      body: 'This is a dynamic notification',
      android: {
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  useEffect(() => {
    setTimeout(() => {
      handleSendNotification();
    }, 1500);
  }, []);

  const productGetId = dataProductId?.id;

  const handleProductValid = (product: ProductObject | undefined): boolean => {
    return (
      !!product &&
      !!product.title &&
      !!product.brand &&
      !!product.description &&
      product.stock !== undefined &&
      !!product.thumbnail &&
      !isLoadingGetProductsId &&
      !isErrorGetProductId
    );
  };

  return {
    handleAddCalendarEvent,
    handleNavigateBack,
    productDataGetId: dataProductId,
    productGetId,
    isErrorGetProductId,
    isLoadingGetProductsId,
    getProductIdData,
    handleProductValid,
  };
};
