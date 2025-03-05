import { View, Text , StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ProductCard = ({product}) => {
  const navigation = useNavigation();

  // more details function
  const handleProductDetails = (id) => {
    console.log('productId :', id);
      navigation.navigate('product-details', {_id : id});
  }

  // add to cart handle
  const handleAddToCart = (id) => {
       alert("Item added to Cart");
  } 
  return (
    <View style={{flexDirection:'row'}}>
      <View style= {styles.card}>
        <Image source = {{uri : product?.imageUrl}} style = {styles.cardImage}/>
        <Text style = {styles.cardTitle}>{product?.name}</Text>
        <Text>{product?.price}</Text>
        <Text style = {styles.cardDes}>{product?.description.substring(0,20)}...</Text>
        <View style = {styles.btnContainer}>
          <TouchableOpacity style = {styles.btn1} onPress={()=> handleProductDetails(product?._id)}>
              <Text style = {styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.btn2} onPress={() => handleAddToCart(product?._id)}>
              <Text style = {styles.btnText}>Add to Cart</Text>
          </TouchableOpacity>
       </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
   card : {
        borderWidth : 1,
        borderBlockColor : 'lightgray',
        marginVertical : 5,
        marginHorizontal : 8,
        width : 180,
       padding : 10,
       backgroundColor : '#ffffff',
       justifyContent : 'center',

    },
    cardImage : {
      height : 120,
      width : '100%',
      marginBottom : 8,

    },
    cardTitle : {
        fontSize : 10,
        fontWeight : 'bold',
        marginBottom : 5,
    },
    cardDes :{
       fontSize : 10,
       textAlign : 'left',
    },
    btnContainer :{
      marginTop : 5,
      flexDirection :'row',
      justifyContent : 'space-between',
      alignItems : 'center',
    },
    btn1 : {
      backgroundColor :'#000000',
      height : 20,
      width : 70,
      borderRadius : 5,
      justifyContent : 'center',     
    },
    btn2 : {
      backgroundColor :'orange',
      height : 20,
      width : 75,
      borderRadius : 5,
      justifyContent : 'center',     
    },
    btnText  : {
      color : '#ffffff',
      textAlign : 'center',
      fontSize : 10,
      fontWeight : 'bold',
    }

})
export default ProductCard