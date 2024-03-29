// import { StatusBar } from 'expo-status-bar';
// import { Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import RestaurantScreen from "./screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} options={{presentation: 'modal', headerShown:false}} />
          <Stack.Screen name="PreparingOrderScreen" component={PreparingOrderScreen} options={{presentation: 'fullScreenModal', headerShown: false}}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
