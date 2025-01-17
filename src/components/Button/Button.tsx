import React from 'react';
import { Button as ButtonReactNativePaper, Text } from 'react-native-paper';
import styles from './styles';

interface PaginationButtonProps {
  onPress: () => void;
  disabled?: boolean;
  title: string;
  color?: string;
  width?: number;
  height?: number;
  titleColor?: string;
}

const Button: React.FC<PaginationButtonProps> = ({
  onPress,
  disabled,
  title,
  width,
  titleColor,
  height,
  color,
}) => {
  return (
    <ButtonReactNativePaper
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: color ? color : undefined,
          width: width ? width : undefined,
          height: height ? height : undefined,
        },
      ]}
    >
      <Text
        style={[
          styles.titleButton,
          { color: titleColor ? titleColor : '#000000' },
        ]}
      >
        {title}
      </Text>
    </ButtonReactNativePaper>
  );
};

export default Button;
