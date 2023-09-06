import { View, Button, StyleSheet } from "react-native";
import TextC from "./TextC";

const Todo = ({ text, onPress, id }) => {

  return (
    <View style={styles.container}>
      <TextC>{text}</TextC>
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

});
