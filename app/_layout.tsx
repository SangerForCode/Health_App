import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      '/': undefined;
      '/input': undefined;
      '/history': undefined;
    }
  }
}

export default function RootLayout() {
  return (
    <>
      <StatusBar 
        style={Platform.select({
          ios: 'dark',
          android: 'light'
        })} 
        backgroundColor="transparent"
        translucent
      />
      <Slot />
    </>
  );
}