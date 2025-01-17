import { AxiosResponse } from 'axios';
import { api } from '../../client';
import { ProductCategory, ProductObject, ProductsResponse } from './types';

export const getProductsData = async ({
  skipItems,
  limit,
  category,
}: {
  skipItems: number;
  limit: number;
  category?: string | null;
}): Promise<ProductsResponse> => {
  const categoryQuery = category ? `&category=${category}` : '';
  // console.log('categoryQuery ', categoryQuery);
  return api
    .get(`products/?skip=${skipItems}&limit=${limit}${categoryQuery}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getProductCategoriesData = async (): Promise<
  ProductCategory[]
> => {
  return api
    .get(`products/categories`)
    .then((response: AxiosResponse<ProductCategory[]>) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const getProductById = async (
  productId: number
): Promise<ProductObject> => {
  return api
    .get(`products/${productId}`)
    .then((response: AxiosResponse<ProductObject>) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
};
