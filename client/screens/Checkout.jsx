import { View, Text ,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../Layouts/Layout'

const Checkout = ({navigation}) => {
    //handleCOD
    const handleCOD = () =>{
      alert("Your Order had been Placed");
    }
    //handle online payment
    const handleOnlinePayment = () => {
         alert("You are redirecting to payment Page");
         navigation.navigate('payment');
    }

  return (
    <Layout>
        <View style = {styles.container}>
        <Text style = {styles.heading}>PAYMENT METHODS</Text>
        <Text style = {styles.price}>Total Amount : ₹9000</Text>

        <View style = {styles.payment}>
            <Text style = {styles.selectPaymentHeading}>Select Payment Method</Text>
            <TouchableOpacity style={styles.paymentBtn} onPress = {handleCOD}>
                <Text style = {styles.paymentBtnText}>Cash On Delivery</Text>                       
            </TouchableOpacity>
            <TouchableOpacity style = {styles.paymentBtn} onPress = {handleOnlinePayment}>
                <Text style = {styles.paymentBtnText}>Online(Credit/Debit Card)</Text>   
            </TouchableOpacity>
        </View>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container : {
         alignItems: 'center',
         justifyContent : 'center',
         height : '90%',
    },
    heading:{
        fontSize : 30,
        fontWeight : 'bold',
        marginVertical : 20,
    },
    price :{
        fontSize : 20,
        color : 'gray',
        marginBottom : 20,
    },
    payment : {
        backgroundColor :'white',
        borderRadius : 20,
        padding : 30,
        width : '90%',
    },
    selectPaymentHeading :{
        color : 'black',
        fontSize : 20,
        marginBottom : 10,
        textAlign : 'center',
    },
    paymentBtn :{
       backgroundColor : "black",
       width : '100%',
       height : 40,
       marginVertical : 10,
       justifyContent : 'center',
       borderRadius : 20,
    },
    paymentBtnText :{
        fontWeight : 'bold',
        fontSize : 15,
        color : 'white',
        textAlign : 'center',
    }
})
export default Checkout