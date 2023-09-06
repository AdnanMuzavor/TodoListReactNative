import { Pressable, StyleSheet } from "react-native";

const Button1 = ({ children, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button1;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
    color: "red",
    borderWidth: 5,
    borderColor: "red",
    borderRadius: 5,
    backgroundColor: "yellow",
  },
  text: {
    color: "red",
    textAlign: "center",
  },
});
