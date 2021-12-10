import { StyleSheet } from "react-native";
import Constants from "expo-constants";

const screensStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 24,
  },
  padding: {
    padding: 16,
  },
  margin: {
    marginBottom: 16,
  },
});

export default screensStyles;
