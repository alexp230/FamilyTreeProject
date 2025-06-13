import { View } from 'react-native';

export default function Spacer({ size = 10, horizontal = false }) {
  return (
    <View style={horizontal ? { width: size } : { height: size }} />
  );
}
