import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const screensStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  padding: {
    padding: 16,
  },
  margin: {
    marginBottom: 16,
  },
});

export default screensStyles;
