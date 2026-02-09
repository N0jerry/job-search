import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AllPlace from "screens/AllPlace";
import AddPlace from "screens/AddPlace";
import IconButton from "components/UI/IconButton";
import { Colors } from "constants/colors";
import Map from "screens/Map";
import { RootStackParamList } from "type";
import { useEffect, useState } from "react";
import { init } from "util/database";
import AppLoading from "expo-app-loading";
import PlaceDetails from "screens/PlaceDetails";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!dbInitialized) {
    return <AppLoading />
  }
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name="AllPlace"
            component={AllPlace}
            options={({ navigation }) => ({
              title: "常去地点",
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation?.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: "添加地点",
            }}
          />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{
            title: 'losding...'
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
