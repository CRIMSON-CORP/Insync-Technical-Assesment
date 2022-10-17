import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Main from './App/Main';
import fonts from './assets/font';
import { LoadingScreen } from './components';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadAsync({ ...fonts.poppins });
      setTimeout(() => setFontsLoaded(true), 1000);
    })();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar translucent />
      {fontsLoaded ? <Main /> : <LoadingScreen />}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
