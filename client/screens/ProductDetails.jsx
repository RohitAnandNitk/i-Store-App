import { View, Text, Image, StyleSheet , TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProductData } from './../Data/ProductData';
import Layout from '../Layouts/Layout'

const ProductDetails = ({route}) => {
  // console.log(route);
  const [pDetails, setpDetails] = useState({});
  const [qty, setQty] = useState(1);

  useEffect(()=>{
    //find product details
    const getProduct = ProductData.find((p) => {
        return p?._id === params?._id 
    })
    setpDetails(getProduct);
  },[])
  const {params} = route;

  //handle function for +/- quantity
  const handleAddQty = () =>{
     setQty((prev) => prev + 1);
  }
  const handleSubQty = () =>{
    if(qty === 1) return;
    setQty((prev) => prev - 1);
  }
  //handle add to cart
  const handleAddToCart = () =>{
      alert(`${qty} item added to your cart`);
  }

  return (
    <Layout> 
    <Image source={{ uri: pDetails?.imageUrl }} style={styles.image} />
  
    <View style={styles.container}>
      <Text style={styles.name}>{pDetails?.name}</Text>
      <Text style={styles.name}>Price: {pDetails?.price}</Text>
      <Text style={styles.description}>{pDetails?.description}</Text>
    </View>     
  
    <View style={styles.btnContainer}>
      {/* ADD TO CART Button */}
      <TouchableOpacity 
        style={styles.btnCart} 
        onPress={handleAddToCart}
        disabled={pDetails?.quantity <= 0}
      >
        {/* Removed unnecessary <View> wrapper */}
        <Text style={styles.btnText}>
          {pDetails?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"}
        </Text>
      </TouchableOpacity>
  
      {/* Quantity Selector */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleSubQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
  
        {/* Ensure quantity is inside a <Text> */}
        <Text style={styles.btnQtyText}>{qty}</Text>
  
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View> 
  </Layout>
  
  )
}

const styles = StyleSheet.create({
   image : {
       height:400,
       width: '100%'
   },
   container : {
      marginVertical : 15,
      marginHorizontal : 10,
   },
   name:{
       fontSize : 18,
       fontWeight : 'bold',
       textAlign : 'left',
   },
   description : {
     fontSize : 12,
     textTransform : 'capitalize',
   },
   btnContainer:{
     flexDirection : 'row',
     justifyContent : 'center',
     alignItems : 'center',
     marginHorizontal : 30,
     marginVertical : 10,
   },
   btnCart :{
       width : 150,
       borderRadius :5,
       backgroundColor :'#000000',
       justifyContent : 'center',
       height : 40,
   },
   btnText :{
     color : 'white',
     textAlign : 'center',
     fontWeight : 'bold',
   },
   btnQty :{
     backgroundColor : 'lightgray',
     width : 40,
   },
   btnQtyText:{
    textAlign : 'center',
    padding : 4,
     color : '#000000',
     fontSize : 18,
     fontWeight : 'bold',
   }
   
})

export default ProductDetails