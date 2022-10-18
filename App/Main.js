import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import TodoApp from './TodoApp';

function Main() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header />
      <TodoApp />
    </SafeAreaView>
  );
}

export default Main;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#483D8B',
    padding: 20,
  },
});
