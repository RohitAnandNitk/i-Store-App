import { View, Text , TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { categoriesData } from '../Data/Categories'
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native'

const Categories = () => {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal = {true} showsHorizontalScrollIndicator  = {false} >
      <View style = {styles.container}>
        {categoriesData?.map((item) => (
          <View key={item._id} >
            <TouchableOpacity 
             style = {styles.catContainer} 
             onPress={ () => navigation.navigate(item.path)}
            >
                  <Icon name={item.icon} style = { styles.catIcon}></Icon>   
                <Text style = { styles.catTitle}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container : {
      backgroundColor : '#ffffff',
      padding : 5,
      flexDirection: 'row'
  },
  catContainer : {
     padding : 7,
     justifyContent : 'center',
     alignItems : 'center'
  },
  catIcon : {
     fontSize : 30,
     verticalAlign : 'top'
  },
  catTitle : {
    fontSize : 15,
  }
})

export default Categories