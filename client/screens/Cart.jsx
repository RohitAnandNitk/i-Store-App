import { View, Text, StyleSheet, ScrollView , TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { CartData } from "../Data/CartData";
import PriceTable from "../component/Cart/PriceTable";
import Layout from "./../Layouts/Layout";
import CartItem from "../component/Cart/CartItem";
import { useNavigation } from "@react-navigation/native";


const Cart = () => {
  const [myCart, setMyCart] = useState(CartData);
  const navigation = useNavigation();  
 

  return (
    <Layout>
      <Text style={styles.heading}>
        {myCart.length > 0 ? "Your Shopping Cart" : "Your Cart is Empty"}
      </Text>

      {myCart.length > 0 && ( 
        <>
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} showsHorizontalScrollIndicator ={false}>
          {myCart?.map(item=>(
            <CartItem item={item}/>
          ))}
          <View >
            <PriceTable title={"Price"} price={999} />
            <PriceTable title={"Tax"} price={1} />
            <PriceTable title={"Shipping"} price={2} />
            <View style={styles.grandTotal}>
              <PriceTable title={"Grand Total"} price={1002} />
            </View>
          </View>

          <TouchableOpacity style = {styles.checkoutbtn} onPress={()=>navigation.navigate('checkout')}>
               <Text style = {styles.checkoutbtnText}>CHECKOUT</Text>
          </TouchableOpacity>
        </ScrollView>
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    padding: 25,
    justifyContent: "center",
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 1,
  },
  checkoutbtn : {
    marginTop : 20,
    justifyContent : 'center',
    alignItems : 'center',
    height : 40,
    borderRadius : 20,
    marginHorizontal : 20,
    backgroundColor : 'black',
    width : '90%',
  },
  checkoutbtnText : {
    color : 'white',
    textAlign : 'center',
    alignItems : 'center',

  }
});

export default Cart;
