import { StyleSheet } from "react-native";

const screensStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    padding: 16,
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
});

export default screensStyles;
