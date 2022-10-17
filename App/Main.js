import { View, StyleSheet } from 'react-native';
import Header from './Header';

function Main() {
  return (
    <View style={styles.wrapper}>
      <Header />
    </View>
  );
}

export default Main;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#483D8B',
  },
});
