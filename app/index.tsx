import { SafeAreaView, View, Platform, StatusBar } from 'react-native';
import BPInputScreen from './BPInputScreen';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ 
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: '#f7f9fc' // Match your gradient's start color
    }}>
      <BPInputScreen />
    </SafeAreaView>
  );
}