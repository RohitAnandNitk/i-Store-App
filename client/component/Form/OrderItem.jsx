import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

const OrderItem = ({order}) => {
  return (
    <View style = {styles.container}>
        <View style = {styles.orderInfo}>
            <Text>Order ID : {order._id}</Text>
            <Text>Date : {order.date}</Text>
        </View>
        <Text>Product :{order.productInfo.name}</Text>
        <Text>Price :{order.productInfo.price}</Text>
        <Text>Quantity :{order.productInfo.qty}</Text>
        <Text>Total Amount :{order.totalAmount}</Text>
        <Text style ={styles.status}>Order Status : {order.status}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#ffffff',
        margin : 10,
        padding : 10,
        borderRadius : 10,
    },
    orderInfo : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderBottomWidth : 1,
        borderColor : 'lightGray',
        paddingBottom : 5,
    },
    status : {
        borderTopWidth: 1,
        fontWeight : 'bold',
        borderColor : 'gray',
        padding : 5,
    }
})
export default OrderItem