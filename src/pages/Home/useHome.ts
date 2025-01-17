import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useGetProductCategories,
  useGetProductsData,
} from '../../services/modules/product';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import notifee from '@notifee/react-native';
import { ProductObject } from '../../services/modules/product/types';
import { RootParamListStack } from '@/src/types';

type HomeNavigationProp = NativeStackNavigationProp<RootParamListStack, 'Home'>;

type HomeRouteProp = RouteProp<
  { Home: { categoryName: string | null } },
  'Home'
>;

export const useHome = () => {
  const limit = 5;

  const [categorySelected, setCategorySelected] = useState<string | null>(null);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<string | null>(null);
  const route = useRoute<HomeRouteProp>();
  const { categoryName } = route.params || {};
  const onEndReachedCalledDuringMomentum = useRef(false);

  const {
    data,
    isLoading: isLoadingGetProductsData,
    isError: isErrorGetProductsData,
    hasNextPage,
    fetchNextPage,
    refetch: getProductsData,
    isFetchingNextPage,
  } = useGetProductsData({
    limit,
    category: categorySelected,
  });

  const {
    data: dataProductCategories,
    isLoading: isLoadingProductCategories,
    isError: isErrorProductCategories,
    refetch: getProductCategories,
  } = useGetProductCategories();

  const navigation = useNavigation<HomeNavigationProp>();

  const openFilterModal = () => setFilterModalVisible(true);
  const closeFilterModal = () => setFilterModalVisible(false);
  const toggleFilterMenu = () => setFilterMenuVisible((prev) => !prev);
  const closeFilterMenu = () => setFilterMenuVisible(false);
  const openSortMenu = () => setSortMenuVisible(true);
  const closeSortMenu = () => setSortMenuVisible(false);

  const handleGetNotificationPermission = async () => {
    await notifee.requestPermission();
  };

  useEffect(() => {
    handleGetNotificationPermission();
  }, []);

  const pages = (data?.pages?.length || 0) > 0;

  useEffect(() => {
    const isNavigatedFromDeepLink =
      categoryName !== null && route.name === 'Home';

    if (
      isNavigatedFromDeepLink &&
      pages &&
      !isLoadingGetProductsData &&
      !isErrorGetProductsData
    ) {
      setCategorySelected(categoryName);
    }
  }, [pages, categoryName, isLoadingGetProductsData, isErrorGetProductsData]);

  const filterSortProducts = useMemo(() => {
    if (!data) return [];

    let allProducts = data.pages.flatMap((page) => page.products);

    if (!categorySelected) getProductsData();

    if (categorySelected) {
      allProducts = allProducts.filter(
        (product) => product.category === categorySelected
      );
    }

    if (sortCriteria === 'price') {
      allProducts = allProducts.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === 'rating') {
      allProducts = allProducts.sort((a, b) => b.rating - a.rating);
    }

    return allProducts;
  }, [data, categorySelected, sortCriteria]);

  const handleSortCriteria = (criteria: string) => {
    if (sortCriteria === criteria) {
      setSortCriteria(null);
    } else {
      setSortCriteria(criteria);
    }

    closeSortMenu();
  };

  const handleNavigateToProductDetail = (product: ProductObject) => {
    navigation.navigate('ProductDetail', { product });
  };

  return {
    products: filterSortProducts,
    categoriesProducts: dataProductCategories,
    isLoadingGetProductsData,
    isErrorGetProductsData,
    isLoadingProductCategories,
    isErrorProductCategories,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    toggleFilterMenu,
    closeFilterMenu,
    openSortMenu,
    closeSortMenu,
    setSortCriteria,
    categorySelected,
    setCategorySelected,
    filterMenuVisible,
    sortMenuVisible,
    filterModalVisible,
    limit,
    setFilterModalVisible,
    openFilterModal,
    closeFilterModal,
    handleNavigateToProductDetail,
    sortCriteria,
    onEndReachedCalledDuringMomentum,
    handleSortCriteria,
    getProductsData,
    getProductCategories,
  };
};
