import {
  getProductsData,
  getProductCategoriesData,
  getProductById,
} from './functions';
import { api } from '../../client';
import { ProductCategory, ProductObject, ProductsResponse } from './types';

jest.mock('../../client/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('functions.ts services', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockProduct: ProductObject = {
    id: 1,
    title: 'Product 1',
    description: 'A sample product',
    category: 'electronics',
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    tags: ['tag1', 'tag2'],
    brand: 'Brand A',
    sku: 'SKU123',
    weight: 1.5,
    dimensions: {
      width: 10,
      height: 5,
      depth: 3,
    },
    warrantyInformation: '1 year warranty',
    shippingInformation: 'Ships within 3 days',
    availabilityStatus: 'In stock',
    reviews: [
      {
        rating: 5,
        comment: 'Great product!',
        date: '2023-01-01',
        reviewerName: 'John Doe',
        reviewerEmail: 'john.doe@example.com',
      },
    ],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
      barcode: '123456789',
      qrCode: 'qrcode123',
    },
    images: ['image1.jpg', 'image2.jpg'],
    thumbnail: 'thumbnail.jpg',
  };

  describe('getProductsData', () => {
    it('should fetch products data successfully', async () => {
      const mockResponse: ProductsResponse = {
        products: [mockProduct],
        total: 1,
        skip: 0,
        limit: 1,
      };

      mockedApi.get.mockResolvedValueOnce({ data: mockResponse });

      const response = await getProductsData({
        skipItems: 0,
        limit: 1,
        category: '',
      });

      expect(mockedApi.get).toHaveBeenCalledWith('products/?skip=0&limit=1');
      expect(response).toEqual(mockResponse);
    });

    it('should throw an error when fetching products data fails', async () => {
      mockedApi.get.mockRejectedValueOnce(
        new Error('Failed to fetch products')
      );

      await expect(
        getProductsData({ skipItems: 0, limit: 1, category: 'electronics' })
      ).rejects.toThrow('Failed to fetch products');
    });
  });

  describe('getProductCategoriesData', () => {
    it('should fetch product categories successfully', async () => {
      const mockCategories: ProductCategory[] = [
        { slug: 'electronics', name: 'Electronics', url: '/electronics' },
        { slug: 'furniture', name: 'Furniture', url: '/furniture' },
      ];

      mockedApi.get.mockResolvedValueOnce({ data: mockCategories });

      const response = await getProductCategoriesData();

      expect(mockedApi.get).toHaveBeenCalledWith('products/categories');
      expect(response).toEqual(mockCategories);
    });

    it('should throw an error when fetching product categories fails', async () => {
      mockedApi.get.mockRejectedValueOnce(
        new Error('Failed to fetch categories')
      );

      await expect(getProductCategoriesData()).rejects.toThrow(
        'Failed to fetch categories'
      );
    });
  });

  describe('getProductById', () => {
    it('should fetch product by ID successfully', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: mockProduct });

      const response = await getProductById(1);

      expect(mockedApi.get).toHaveBeenCalledWith('products/1');
      expect(response).toEqual(mockProduct);
    });

    it('should throw an error when fetching product by ID fails', async () => {
      mockedApi.get.mockRejectedValueOnce(new Error('Failed to fetch product'));

      await expect(getProductById(1)).rejects.toThrow(
        'Failed to fetch product'
      );
    });
  });
});
