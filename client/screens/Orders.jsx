import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Layout from '../Layouts/Layout'
import { OrderData } from '../Data/OrderData'
import OrderItem from '../component/Form/OrderItem'

const Orders = () => {
  return (
    <Layout>
        <View style = {styles.container}>
            <Text style = {styles.headingText}>My Orders</Text>
            <ScrollView>
               {OrderData.map(order =>(
                 <OrderItem key = {order._id} order= {order}/>
               ))}
            </ScrollView>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create(
  {
    container : {
      marginTop : 10,
    },
    headingText : {
      textAlign : 'center',
      color : 'gray',
      fontWeight : 'bold',
    }
      
  }
)
export default Orders