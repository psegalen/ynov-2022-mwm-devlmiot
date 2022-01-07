import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { UserContext } from "./data/UserContext";
import Navigation from "./Navigation";
import Login from "./screens/Login";
import screensStyles from "./screens/ScreensStyles";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } =
        await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("You will not have push notifications!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    console.warn(
      "This is a simulator, Push Notifications are not available!"
    );
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  return token;
};

export default function Root() {
  const [loading, setLoading] = useState(true);
  const { checkUser, userid, modifyUser } = useContext(UserContext);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const launch = async () => {
      await checkUser();
      setLoading(false);
    };
    launch();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        (notification) => {
          console.log(
            "NotificationReceived (app is in Foreground)",
            notification
          );
        }
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          console.log(
            "NotificationResponseReceived (a notification has been pressed)",
            response
          );
        }
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(
        responseListener.current
      );
    };
  }, []);

  useEffect(() => {
    if (userid) {
      registerForPushNotificationsAsync().then((token) =>
        token ? modifyUser({ token }) : undefined
      );
    }
  }, [userid]);

  if (loading)
    return (
      <View style={[screensStyles.container, screensStyles.center]}>
        <ActivityIndicator color="#0000BB" />
      </View>
    );

  return userid.length > 0 ? <Navigation /> : <Login />;
}
