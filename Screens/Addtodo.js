import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from "react-native";
import Todo from "../Components/Todo";
import * as Notifications from "expo-notifications";
import Button1 from "../Components/Button1";
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});
const Addtodo = () => {
  //__________________TODO HANDLIMG________________________
  const [todos, settodos] = useState([
    { key: Math.random(), message: "Get Fruits" },
  ]);
  const [text, settext] = useState("");
  const AddTodoToList = () => {
    settodos((prev) => [...prev, { key: Math.random() * 100, message: text }]);
    settext("");
    console.log(todos);
  };
  const DeleteTodo = (id) => {
    const newList = todos.filter((e) => e.key !== id);
    settodos(newList);
  };
  const RenderTodo = (item) => {
    return <Todo text={item.message} onPress={DeleteTodo} id={item.key} />;
  };
  //__________________Notification________________________
  const [token, setToken] = useState("");

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder that your todo list is pending",
        body: "Please complete your todo tasks",
        data: { userName: "Max" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  //__________UseEffect for push Notifications_______________
  useEffect(() => {
    //Function get grab permissions
    async function PushNotificationSetupHandler() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== "granted") {
        //Not granted by default so request permission
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        //Notify user that he has not granted permission
        Alert.alert(
          "Permission Required",
          "Push notifications need appropriate permissions."
        );
        //Prevent rest of function execution
        return;
      }

      //Yey! We have permission so get the token
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);
      setToken(pushTokenData.data);

      //Additional configs for Android
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    //Call the function
    PushNotificationSetupHandler();
  }, []);

  useEffect(() => {
    //___________UseEffect for self Notification_______________
    //To listen to notifications occuring on device
    const s1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log("NOTIFICATION RECEIVED");
      console.log(notification);
    });

    //To listen to when user taps on notifications
    const s2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED");
        console.log(response);
      }
    );
    //When app closing
    return () => {
      s1.remove();
      s2.remove();
    };
  }, []);

  //Send Push Notifications
  const sendPushNotifications = () => {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "hello",
        body: "world",
      }),
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputwrapper}>
        <Text style={styles.inputtxt}>Enter your Todo Here</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => settext(value)}
          value={text}
        ></TextInput>

        <Button1 onPress={AddTodoToList}>Add Todo</Button1>
        <Button1 onPress={scheduleNotificationHandler}>
          Add Notification
        </Button1>
      </View>
      {/* <Button
          onPress={sendPushNotifications}
          title="Add Push Notification"
        ></Button> */}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.key}
        renderItem={(itemdata) => RenderTodo(itemdata.item)}
      />
    </View>
  );
};

export default Addtodo;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  inputwrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderRadius: 5,
    borderColor: "red",
    padding: 6,
    margin: 8,
  },
  inputtxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    margin: 8,
    padding: 8,
    borderBottomWidth: 4,
    borderBottomColor: "red",
  },
  btn: {
    margin: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
});
