import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { UserContext } from "./data/UserContext";
import Navigation from "./Navigation";
import Login from "./screens/Login";
import screensStyles from "./screens/ScreensStyles";

export default function Root() {
  const [loading, setLoading] = useState(true);
  const { checkUser, userid } = useContext(UserContext);

  useEffect(() => {
    const launch = async () => {
      await checkUser();
      setLoading(false);
    };
    launch();
  }, []);

  if (loading)
    return (
      <View style={[screensStyles.container, screensStyles.center]}>
        <ActivityIndicator color="#0000BB" />
      </View>
    );

  return userid.length > 0 ? <Navigation /> : <Login />;
}
