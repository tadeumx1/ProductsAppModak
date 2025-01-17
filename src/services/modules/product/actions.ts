import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getProductsData,
  getProductCategoriesData,
  getProductById,
} from './functions';

interface useGetProductsData {
  limit: number;
  category: string | null;
}
interface UseGetProductId {
  queryEnabled: boolean;
  productId: number;
}

export const GET_PRODUCTS_INFINITE_ACTION = 'getProductsInfiniteAction';
export const GET_PRODUCT_CATEGORIES_ACTION = 'getProductCategoriesAction';
export const GET_PRODUCT_ID = 'getProductId';

export const useGetProductsData = ({ limit, category }: useGetProductsData) =>
  useInfiniteQuery({
    initialPageParam: 0,
    queryKey: [GET_PRODUCTS_INFINITE_ACTION],
    queryFn: ({ pageParam = 0 }) => {
      const skip = pageParam * limit;

      return getProductsData({
        skipItems: skip,
        limit,
        category,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page.products).length;
      return totalFetched < lastPage.total ? allPages.length : undefined;
    },
  });

export const useGetProductCategories = () =>
  useQuery({
    queryKey: [GET_PRODUCT_CATEGORIES_ACTION],
    queryFn: getProductCategoriesData,
    staleTime: 1000 * 60 * 5,
  });

export const useGetProductId = ({ queryEnabled, productId }: UseGetProductId) =>
  useQuery({
    queryKey: [GET_PRODUCT_ID, productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 5,
    enabled: queryEnabled,
  });
