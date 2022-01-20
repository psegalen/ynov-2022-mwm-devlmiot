import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  card: {
    padding: 48,
    marginHorizontal: 48,
    marginTop: 48,
  },
  cardKeyboardOpen: {
    padding: 16,
    marginHorizontal: 48,
    marginTop: 0,
  },
  cardRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0000BB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },
  greetings: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
});

export default profileStyles;
