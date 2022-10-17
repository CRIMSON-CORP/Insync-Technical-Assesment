import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import fonts from './assets/font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState();

  useEffect(() => {
    (async () => {
      await loadAsync({ ...fonts.poppins });
      setFontsLoaded(true);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

