import { View, Text , TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute ,useNavigation } from '@react-navigation/native';


const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style = {styles.container}>
      
      <TouchableOpacity style = {styles.menuCaontainer}
       onPress={()=> navigation.navigate('home')}>
       <Icon name='home' style = {[styles.icon, route.name === 'home' && styles.active]} ></Icon>
       <Text style = {[styles.iconText , route.name === 'home' && styles.active ]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.menuCaontainer}
       onPress={()=> navigation.navigate('Cart')}>
       <Icon name='shopping-cart' style = {[styles.icon, route.name === 'Cart' && styles.active]} ></Icon>
       <Text style = {[styles.iconText , route.name === 'Cart' && styles.active ]}>Cart</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.menuCaontainer}
      onPress={()=> navigation.navigate('notification')}>
       <Icon name='bell' style = {[styles.icon, route.name === 'notification' && styles.active]} ></Icon>
       <Text style = {[styles.iconText , route.name === 'notification' && styles.active ]}>Notification</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.menuCaontainer}
      onPress={()=> navigation.navigate('orders')}>
       <Icon name='list-alt' style = {[styles.icon, route.name === 'orders' && styles.active]} ></Icon>
       <Text style = {[styles.iconText , route.name === 'orders' && styles.active ]}>Orders</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style = {styles.menuCaontainer}
      onPress={()=> navigation.navigate('profile')}>
       <Icon name='user' style = {[styles.icon, route.name === 'profile' && styles.active]} ></Icon>
       <Text style = {[styles.iconText , route.name === 'profile' && styles.active ]}>User</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
      flexDirection : 'row',
      justifyContent : 'space-between',
      paddingHorizontal : 10
  },
  menuCaontainer : {
    alignItems : 'center',
    justifyContent : 'center'
  },
  icon : {
    fontSize : 30,
  },
  iconText : {
    fontSize : 15,
    color : '#000000'
  },
  active :{
    color : 'blue',
  }
})

export default Footer