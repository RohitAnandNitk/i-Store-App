import { View, Text } from 'react-native'
import React from 'react'
import ProductCard from './ProductCard'
import { ProductData } from '../../Data/ProductData'

const Products = () => {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {ProductData?.map( product => (
            <ProductCard key ={product._id} product = {product} />
        ))}
    </View>
  )
}

export default Products