import React from 'react';
import { Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import { ProductCategory } from '../../services/modules/product/types';

interface CategoriesModalProps {
  filterModalVisible: boolean;
  closeFilterModal: () => void;
  categoriesProducts: ProductCategory[] | undefined;
  categorySelected: string | null;
  setCategorySelected: (
    value: string | null | ((prevState: string | null) => string | null)
  ) => void;
}

const CategoriesModal = ({
  filterModalVisible,
  closeFilterModal,
  categoriesProducts,
  categorySelected,
  setCategorySelected,
}: CategoriesModalProps) => {
  return (
    <Modal
      visible={filterModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={closeFilterModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Category</Text>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 5 }}
            style={styles.categoryList}
          >
            {categoriesProducts?.map((category) => (
              <TouchableOpacity
                key={category.slug}
                style={[
                  styles.categoryItem,
                  categorySelected === category.slug && styles.selectedCategory,
                ]}
                onPress={() => {
                  setCategorySelected(
                    categorySelected === category.slug ? null : category.slug
                  );
                  closeFilterModal();
                }}
              >
                <Text style={styles.categoryText}>{category.name}</Text>
                {categorySelected === category.slug && (
                  <MaterialCommunityIcons
                    name="check"
                    size={20}
                    color="#6200ee"
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFilterModal}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CategoriesModal;
