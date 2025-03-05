import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "./node_modules/@react-navigation/native-stack/src/navigators/createNativeStackNavigator";
import Home from "./screens/Home";
import About from "./screens/About";
import ProductDetails from "./screens/ProductDetails";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import Payment from "./screens/Payment";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Orders from "./screens/Orders";
import Register from "./screens/Register";
import Notification from "./screens/Notification";
import EditProfile from "./screens/EditProfile";
import Dashboard from "./screens/Admin/Dashboard";

// routes
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen name="mobile" component={About}></Stack.Screen>
        <Stack.Screen
          name="product-details"
          component={ProductDetails}
        ></Stack.Screen>
        <Stack.Screen name="Cart" component={Cart}></Stack.Screen>
        <Stack.Screen name="checkout" component={Checkout}></Stack.Screen>
        <Stack.Screen name="payment" component={Payment}></Stack.Screen>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        ></Stack.Screen>

        <Stack.Screen name="profile" component={Profile}></Stack.Screen>
        <Stack.Screen name="orders" component={Orders}></Stack.Screen>
        <Stack.Screen
          name="notification"
          component={Notification}
        ></Stack.Screen>
        <Stack.Screen
          name="edit-profile"
          component={EditProfile}
        ></Stack.Screen>

        <Stack.Screen name="dashboard" component={Dashboard}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
