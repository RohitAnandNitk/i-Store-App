import { View, Text ,Image, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import Layout from '../Layouts/Layout'
import { useNavigation } from '@react-navigation/native'
import { userData } from '../Data/UserData'
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile = () => {
  const navigation = useNavigation();
  // handle logout
  const handleLogout = () => {
      alert("Logout Successfully");
      navigation.navigate('login');
  }
  return (
    <Layout>
        <View style = { styles.container}>
            <Image source={{uri : userData?.profileImage}} style = {styles.profileImage} />
            
            <View  style = {{justifyContent : 'center', alignContent : 'center'}}>
              <Text style = {{ fontSize : 20, paddingTop : 10}}>Hi {userData?.name} 👋</Text>  
              <Text style = {styles.userInfo}>E-Mail : {userData?.email}</Text>
              <Text style = {styles.userInfo}>Phone : {userData?.phone}</Text>
            </View>  
            <View style = {styles.btnContainer}>
               <Text style = {styles.heading}>Account Setting</Text>
               
               <TouchableOpacity style  ={styles.othersBtn}
                onPress={() => navigation.navigate('edit-profile', {id:userData._id})}>
                     <Icon name='edit' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>Edit Profile</Text>
               </TouchableOpacity>
               
               <TouchableOpacity style  ={styles.othersBtn}>
                     <Icon name='lock' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>Change Password</Text>
               </TouchableOpacity>
               
               <TouchableOpacity style  ={styles.othersBtn}>
                     <Icon name='map-marker' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>Manage Address</Text>
               </TouchableOpacity>
               
               <TouchableOpacity style  ={styles.othersBtn}>
                     <Icon name='info-circle' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>About</Text>
               </TouchableOpacity>
               
               <TouchableOpacity style  ={styles.othersBtn}
               onPress={() => navigation.navigate('login')}>
                     <Icon name='sign-out' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>Logout</Text>
               </TouchableOpacity>

               <TouchableOpacity style  ={styles.othersBtn}
               onPress={() => navigation.navigate('dashboard')}>
                     <Icon name='user' style = {styles.icon} ></Icon>
                      <Text style = {styles.othersBtnText}>Admin Dashboard</Text>
               </TouchableOpacity>
            </View>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container :{
      marginVertical : 20,
      justifyContent : 'center',
      alignItems : 'center',
    },
    profileImage :{
         height : 100,
         width: '100%',
         resizeMode : 'contain',
    },
    userInfo :{
        padding : 2,
        fontSize : 15,
    },
    btnContainer : {
      padding : 10,
      backgroundColor : "#ffffff",
      margin : 10,
      marginVertical : 20,
      elevation : 5,
      borderRadius : 10,
      paddingBottom : 30,
      width : '100%'
    },
    heading : {
      fontSize : 20,
      fontWeight : 'bold',
      textAlign : 'center',
      borderBottomWidth : 1,
      borderColor : 'lightgray',
    },
    othersBtn : {
       flexDirection : 'row',
       alignItems : 'center',
       marginVertical : 8,
       padding : 5,
    },
    othersBtnText : {
       fontSize : 15,
       marginRight : 10,
    },
    icon : {
       fontSize : 15,
       marginRight : 10,
    }
})

export default Profile