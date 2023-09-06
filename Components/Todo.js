import { View, Button, Text, StyleSheet } from "react-native";

const Todo = ({ text, onPress, id }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{text}</Text>
      <Button title="Delete" onPress={() => onPress(id)}></Button>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderWidth: 4,
    borderColor: "red",
    backgroundColor: "yellow",
    borderRadius: 4,
  },
  txt: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
  },
});
