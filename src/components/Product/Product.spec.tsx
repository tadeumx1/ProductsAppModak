import React from 'react';
import { render } from '@testing-library/react-native';
import Product from './Product';

jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const { Image } = require('react-native');

  const FastImage = ({ source, style }: any) => (
    <Image
      source={{ uri: source.uri }}
      style={style}
      testID="image-thumbnail-container"
    />
  );

  FastImage.priority = {
    normal: 'normal',
  };

  FastImage.resizeMode = {
    contain: 'contain',
  };

  return FastImage;
});

describe('Product Component', () => {
  const productProps = {
    title: 'Test Product',
    price: 19.99,
    thumbnail: 'https://example.com/image.jpg',
  };

  it('render the product title', () => {
    const { getByText, toJSON } = render(<Product {...productProps} />);

    expect(getByText('Test Product')).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('render the product price in correct format', () => {
    const { getByText, toJSON } = render(<Product {...productProps} />);

    expect(getByText('$19.99')).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('render the product thumbnail image', () => {
    const { getByTestId, toJSON } = render(<Product {...productProps} />);

    const image = getByTestId('image-thumbnail-container');

    expect(image.props.source.uri).toBe(productProps.thumbnail);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should apply correct styles to the components', () => {
    const { getByText, toJSON } = render(<Product {...productProps} />);
    const title = getByText('Test Product');
    const price = getByText('$19.99');

    expect(title.props.style).toEqual(expect.any(Object));
    expect(price.props.style).toEqual(expect.any(Object));

    expect(toJSON()).toMatchSnapshot();
  });
});
