import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Home from './Home';
import { useHome } from './useHome';
import { api } from '../../services/client';

jest.mock('./useHome');
const mockedUseHome = useHome as jest.Mock;

jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn(),
  displayNotification: jest.fn(),
  createChannel: jest.fn(),
}));

jest.mock('../../services/client/api');
const mockedApi = api as jest.Mocked<typeof api>;

mockedApi.get.mockResolvedValue({});

const mockResponsePage1 = {
  products: [
    { id: 1, title: 'Product 1', thumbnail: '', price: 10 },
    { id: 2, title: 'Product 2', thumbnail: '', price: 20 },
  ],
  total: 5,
};

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  const actualPaper = jest.requireActual('react-native-paper');

  return {
    ...actualPaper,
    PaperProvider: ({ children }: any) => <View>{children}</View>,
    ActivityIndicator: () => <View />,
    Text: ({ children }: { children: string }) => <Text>{children}</Text>,
    Button: jest.fn().mockImplementation(({ children, ...props }) => (
      <TouchableOpacity {...props}>
        <Text>{children}</Text>
      </TouchableOpacity>
    )),
    Menu: ({ visible, onDismiss, anchor, children }: any) => (
      <View>
        {anchor}
        {visible && <View>{children}</View>}
      </View>
    ),
    MenuItem: ({ title, onPress }: { title: string; onPress: () => void }) => (
      <Text onPress={onPress}>{title}</Text>
    ),
    Portal: ({ children }: any) => <View>{children}</View>,
    Modal: ({ visible, children }: any) =>
      visible ? <View>{children}</View> : null,
  };
});

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<PaperProvider theme={DefaultTheme}>{ui}</PaperProvider>);
};

describe('Home Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseHome.mockReturnValue({
      products: [],
      isError: false,
      isLoading: false,
      fetchNextPage: jest.fn(),
      isFetchingNextPage: false,
      hasNextPage: true,
      sortMenuVisible: false,
      openSortMenu: jest.fn(),
      closeSortMenu: jest.fn(),
      categorySelected: null,
      setCategorySelected: jest.fn(),
      categoriesProducts: [],
      handleNavigateToProductDetail: mockNavigate,
      filterModalVisible: false,
      openFilterModal: jest.fn(),
      closeFilterModal: jest.fn(),
      sortCriteria: null,
      onEndReachedCalledDuringMomentum: { current: false },
      handleSortCriteria: jest.fn(),
    });
  });

  it('renders loading state', async () => {
    mockedUseHome.mockReturnValue({
      ...mockedUseHome(),
      isLoadingGetProductsData: true,
      isErrorGetProductsData: false,
      products: [],
    });

    const { getByText, toJSON, getByTestId } = renderWithProvider(<Home />);

    expect(getByTestId('loading-container')).toBeDefined();
    expect(getByText('Loading Products')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders error state', async () => {
    mockedUseHome.mockReturnValue({
      ...mockedUseHome(),
      isLoadingGetProductsData: false,
      isErrorGetProductsData: true,
      products: mockResponsePage1,
    });

    const { getByText, toJSON } = renderWithProvider(<Home />);

    await waitFor(() => {
      expect(getByText('Something Went Wrong')).toBeDefined();
      expect(
        getByText('Please check your connection and try again')
      ).toBeDefined();
      expect(getByText('Products')).toBeDefined();
      expect(getByText('Retry')).toBeDefined();
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders empty list message when no products are available', async () => {
    const { getByText, toJSON } = renderWithProvider(<Home />);

    await waitFor(() => {
      expect(getByText('No products available')).toBeDefined();
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('renders products correctly', async () => {
    mockedUseHome.mockReturnValue({
      ...mockedUseHome(),
      products: [
        {
          id: 1,
          title: 'Product 1',
          thumbnail: 'https://example.com/1.jpg',
          price: 19.99,
        },
        {
          id: 2,
          title: 'Product 2',
          thumbnail: 'https://example.com/2.jpg',
          price: 29.99,
        },
      ],
    });

    const { getByText, toJSON } = renderWithProvider(<Home />);

    await waitFor(() => {
      expect(getByText('Product 1')).toBeDefined();
      expect(getByText('$19.99')).toBeDefined();
      expect(getByText('Product 2')).toBeDefined();
      expect(getByText('$29.99')).toBeDefined();

      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('navigates to product detail on product press', () => {
    mockedUseHome.mockReturnValue({
      ...mockedUseHome(),
      products: [
        {
          id: 1,
          title: 'Product 1',
          thumbnail: 'https://example.com/1.jpg',
          price: 19.99,
        },
      ],
    });

    const { getByText } = renderWithProvider(<Home />);
    const product = getByText('Product 1');

    fireEvent.press(product);

    expect(mockNavigate).toHaveBeenCalledWith({
      id: 1,
      title: 'Product 1',
      thumbnail: 'https://example.com/1.jpg',
      price: 19.99,
    });
  });
});
