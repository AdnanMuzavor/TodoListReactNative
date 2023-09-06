import { StyleSheet, Text, View } from "react-native";

const TextC = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default TextC;
const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: "red",
    color: "yellow",
    borderWidth: 5,
    borderRadius: 8,
    borderColor: "yellow",
  },
  text: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "yellow",
  },
});
