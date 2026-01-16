import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

export async function clearStorageAndReload() {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared!');
    await Updates.reloadAsync();
  } catch (error) {
    console.error('Failed to clear AsyncStorage', error);
  }
}
