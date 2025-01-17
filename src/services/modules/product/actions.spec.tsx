import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  useGetProductsData,
  useGetProductCategories,
  useGetProductId,
} from './actions';
import {
  getProductsData,
  getProductCategoriesData,
  getProductById,
} from './functions';

jest.mock('./functions');

jest.useFakeTimers();

const mockedGetProductsData = getProductsData as jest.Mock;
const mockedGetProductCategoriesData = getProductCategoriesData as jest.Mock;
const mockedGetProductById = getProductById as jest.Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

afterEach(() => {
  jest.runAllTimers();
});

const wrapper = ({ children }: { children: React.ReactElement }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetProductsData', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch products data successfully', async () => {
    const mockResponse = {
      products: [{ id: 1, name: 'Product 1' }],
      total: 1,
    };

    mockedGetProductsData.mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useGetProductsData({ limit: 10, category: 'electronics' }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result?.current?.data?.pages[0]).toEqual(mockResponse);
    });
  });

  it('should handle error when fetching products data', async () => {
    mockedGetProductsData.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(
      () => useGetProductsData({ limit: 10, category: 'electronics' }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result?.current?.error?.message).toBe('Failed to fetch');
    });
  });
});

describe('useGetProductCategories', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch product categories successfully', async () => {
    const mockResponse = [{ id: 1, name: 'Category 1' }];

    mockedGetProductCategoriesData.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useGetProductCategories(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  it('should handle error when fetching product categories', async () => {
    mockedGetProductCategoriesData.mockRejectedValue(
      new Error('Failed to fetch')
    );

    const { result } = renderHook(() => useGetProductCategories(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result?.current?.error?.message).toBe('Failed to fetch');
    });
  });
});

describe('useGetProductId', () => {
  afterEach(() => {
    queryClient.clear();
  });

  it('should fetch product by ID successfully', async () => {
    const mockResponse = { id: 1, name: 'Product 1' };

    mockedGetProductById.mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useGetProductId({ queryEnabled: true, productId: 1 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  it('should handle error when fetching product by ID', async () => {
    mockedGetProductById.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(
      () => useGetProductId({ queryEnabled: true, productId: 1 }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result?.current?.error?.message).toBe('Failed to fetch');
    });
  });

  it('should call queryFn with skip Items 0 on initial load', async () => {
    const mockResponse = {
      products: [
        { id: 1, title: 'Product 1', thumbnail: '', price: 10 },
        { id: 2, title: 'Product 2', thumbnail: '', price: 20 },
        { id: 3, title: 'Product 3', thumbnail: '', price: 30 },
      ],
      total: 3,
    };

    mockedGetProductsData.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(
      () =>
        useGetProductsData({
          limit: 3,
          category: null,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetProductsData).toHaveBeenCalledWith({
      skipItems: 0,
      limit: 3,
      category: null,
    });

    expect(result.current.data?.pages[0]).toEqual(mockResponse);
  });

  it('should return allPages.length when totalFetched < lastPage.total', async () => {
    const mockResponsePage1 = {
      products: [
        { id: 1, title: 'Product 1', thumbnail: '', price: 10 },
        { id: 2, title: 'Product 2', thumbnail: '', price: 20 },
      ],
      total: 5,
    };

    const mockResponsePage2 = {
      products: [
        { id: 3, title: 'Product 3', thumbnail: '', price: 30 },
        { id: 4, title: 'Product 4', thumbnail: '', price: 40 },
      ],
      total: 5,
    };

    mockedGetProductsData
      .mockResolvedValueOnce(mockResponsePage1)
      .mockResolvedValueOnce(mockResponsePage2);

    const { result } = renderHook(
      () =>
        useGetProductsData({
          limit: 2,
          category: null,
        }),
      { wrapper }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0]).toEqual(mockResponsePage1)
    );

    result.current.fetchNextPage();

    await waitFor(() =>
      expect(result.current.data?.pages[1]).toEqual(mockResponsePage2)
    );

    const totalFetched = result.current.data?.pages.flatMap(
      (page) => page.products
    ).length;

    expect(totalFetched).toBe(4);
    expect(mockedGetProductsData).toHaveBeenCalledTimes(2);
    expect(result.current.hasNextPage).toBe(true);
  });

  it('should return undefined when totalFetched >= lastPage.total', async () => {
    const mockResponsePage1 = {
      products: [
        { id: 1, title: 'Product 1', thumbnail: '', price: 10 },
        { id: 2, title: 'Product 2', thumbnail: '', price: 20 },
      ],
      total: 2,
    };

    mockedGetProductsData.mockResolvedValue(mockResponsePage1);

    const { result } = renderHook(
      () =>
        useGetProductsData({
          limit: 2,
          category: null,
        }),
      { wrapper }
    );

    await waitFor(() =>
      expect(result.current.data?.pages[0]).toEqual(mockResponsePage1)
    );

    expect(result.current.data?.pages.length).toBe(1);
    expect(result.current.hasNextPage).toBe(false);
  });
});
