// components/ImageButton.tsx
import React from 'react';
import { Pressable, ImageBackground, View, StyleSheet, ImageSourcePropType } from 'react-native';

type ImageButtonProps = {
  image: ImageSourcePropType;
  onPress: () => void;
};

export default function Person({ image, onPress }: ImageButtonProps) {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      {({ pressed }) => (
        <ImageBackground
          source={image}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          {pressed && <View style={styles.overlay} />}
        </ImageBackground>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  imageBackground: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 40,
    zIndex: 1,
  },
});
