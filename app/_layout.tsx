import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

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
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false,
            statusBarStyle: Platform.OS === 'ios' ? 'dark' : 'light',
            statusBarTranslucent: true
          }} 
        />
      </Stack>
    </>
  );
}