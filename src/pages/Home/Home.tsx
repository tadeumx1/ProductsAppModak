import React from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Button, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useHome } from './useHome';
import { Product } from '../../components/Product';
import { CategoriesModal } from '@/src/components/CategoriesModal';
import { styles } from './styles';
import { ErrorContainer } from '@/src/components/ErrorContainer';

const Home = () => {
  const {
    products,
    isErrorGetProductsData,
    isLoadingGetProductsData,
    isLoadingProductCategories,
    isErrorProductCategories,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    sortMenuVisible,
    openSortMenu,
    closeSortMenu,
    categorySelected,
    setCategorySelected,
    categoriesProducts,
    handleNavigateToProductDetail,
    filterModalVisible,
    openFilterModal,
    closeFilterModal,
    sortCriteria,
    onEndReachedCalledDuringMomentum,
    handleSortCriteria,
    getProductsData,
    getProductCategories,
  } = useHome();

  if (isLoadingGetProductsData) {
    return (
      <View testID="loading-container" style={styles.loadingErrorContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Loading Products</Text>
      </View>
    );
  }

  if (isLoadingProductCategories) {
    return (
      <View testID="loading-container" style={styles.loadingErrorContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Loading</Text>
      </View>
    );
  }

  if (isErrorGetProductsData) {
    return (
      <ErrorContainer
        errorOperation="Products"
        onRetry={() => getProductsData()}
      />
    );
  }

  if (isErrorProductCategories) {
    return (
      <ErrorContainer
        errorOperation="Product Categories"
        onRetry={() => getProductCategories()}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ProductsApp</Text>
        <Button
          mode="outlined"
          icon="filter"
          onPress={openFilterModal}
          style={styles.filterButton}
          contentStyle={styles.filterButtonContent}
        >
          <Text>Filter</Text>
        </Button>
        <Menu
          visible={sortMenuVisible}
          onDismiss={closeSortMenu}
          anchor={
            <Button
              mode="outlined"
              icon="sort"
              onPress={openSortMenu}
              style={styles.sortButton}
              contentStyle={styles.sortButtonContent}
            >
              <Text>Sort</Text>
            </Button>
          }
        >
          <Menu.Item
            onPress={() => handleSortCriteria('price')}
            title={
              <View style={styles.menuItem}>
                <Text>Sort by Price</Text>
                {sortCriteria === 'price' && (
                  <Icon name="check" size={20} color="#6200ee" />
                )}
              </View>
            }
          />
          <Menu.Item
            onPress={() => handleSortCriteria('rating')}
            title={
              <View style={styles.menuItem}>
                <Text>Sort by Rating</Text>
                {sortCriteria === 'rating' && (
                  <Icon name="check" size={20} color="#6200ee" />
                )}
              </View>
            }
          />
        </Menu>
      </View>
      <View style={styles.containerProducts}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleNavigateToProductDetail(item)}
            >
              <Product
                title={item.title}
                thumbnail={item.thumbnail}
                price={item.price}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          onEndReached={() => {
            if (
              hasNextPage &&
              !isFetchingNextPage &&
              !onEndReachedCalledDuringMomentum.current
            ) {
              onEndReachedCalledDuringMomentum.current = true;
              fetchNextPage();
            }
          }}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReachedThreshold={0.1}
          testID="product-list"
          ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No products available</Text>
            </View>
          )}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <View style={styles.loadingMoreContainer}>
                <ActivityIndicator size="small" color="#6200ee" />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
              </View>
            ) : null
          }
        />
        <CategoriesModal
          filterModalVisible={filterModalVisible}
          closeFilterModal={closeFilterModal}
          categoriesProducts={categoriesProducts}
          categorySelected={categorySelected}
          setCategorySelected={setCategorySelected}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
