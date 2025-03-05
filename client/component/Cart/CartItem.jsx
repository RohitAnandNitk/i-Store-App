import { View, Text , StyleSheet, Image} from 'react-native'
import React from 'react'

const CartItem = ({item}) => {
  return (
    <View style = {styles.container}>
      <Image source = {{uri : item?.imageUrl}} style = {styles.image}/>
      <Text>{item?.name}</Text>
      <Text>{item?.quantity} X {item?.price }</Text>
      <Text>{item?.price * item?.quantity}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : { 
    margin : 10,
    backgroundColor : '#ffffff',
    borderRadius : 10,
    flexDirection : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
  },
  image : {
     width : 50,
     height : 50,
     resizeMode : 'contain'
  }
})

export default CartItem