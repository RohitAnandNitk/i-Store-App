import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Create Stack Navigator
const Stack = createNativeStackNavigator();

export default function Main() {
  const [isAuth, setIsAuth] = useState(null);

  const getUserLocalData = async () => {
    let token = await AsyncStorage.getItem("@token");
    console.log("token : ", token);
    setIsAuth(token);
  };

  useEffect(() => {
    getUserLocalData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuth ? "home" : "login"}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="mobile" component={About} />
        <Stack.Screen name="product-details" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="checkout" component={Checkout} />
        <Stack.Screen name="payment" component={Payment} />

        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="orders" component={Orders} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="edit-profile" component={EditProfile} />
        <Stack.Screen name="dashboard" component={Dashboard} />

        {!isAuth && (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
