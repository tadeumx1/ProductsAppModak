import { ProductObject } from './services/modules/product/types';

export type RootParamListStack<> = {
  Home: { categoryName: string | null };
  ProductDetail: { product: ProductObject };
};
