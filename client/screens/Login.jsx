import { View, Text, TextInput, TouchableOpacity , StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import InputBox from '../component/Form/InputBox'
import { useNavigation } from '@react-navigation/native';
import Register from './Register';

// redux hooks
import { useDispatch, useSelector } from 'react-redux'; 
import { login } from '../Redux/features/UserAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
   
  //hooks
  const dispatch = useDispatch();
  //global state
  const {loading, error, message} = useSelector(state => state.user);
 
  
  //handle login
  const handleLogin = () =>{
    if(!email || !password){
      return alert("Please Enter Email and Password");
    }
    dispatch(login(email, password));
  }

  // life cycle
  useEffect(() =>{
    console.log("message :" , message);
    
    if(error){
      alert(error);
      dispatch({type: 'clearError'})
    } 
    if(message){
      alert(message);
      dispatch({type:'clearMessage'})
      navigation.navigate("home")
    } 
  },[error,message, dispatch])

  return (
    <View style = {styles.container}>

      <Text style = {styles.heading}>Welcome To {" "}
                  <Text style = {styles.appName} >i-Store</Text></Text>

      <InputBox 
       placeholder={"Enter Your Email"} 
       autoComplete={'email'}
       value = {email} 
       setValue={setEmail}/>

      <InputBox 
       placeholder={"Password"} 
       secureTextEntry={true} 
       value={password}
       setValue={setPassword}/>

       <View style = {styles.loginBtnContainer}>
        <TouchableOpacity style = {styles.loginBtn} onPress={handleLogin}>
            <Text style = {styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
       <Text>Not yet registered?{"  "} <Text
        style = {styles.link}
        onPress={()=> navigation.navigate('register')}>Register Now</Text></Text>  
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        // alignItems : 'center',
        justifyContent : 'center',
        height : 700,
    },
    heading :{
      textAlign : "center",
      margin : 20,
      fontSize : 30,
      fontWeight : 'bold',
      color : 'gray',
    },
    appName :{
        color : 'black',
    },
    loginBtnContainer : {
      justifyContent : 'center',
      alignItems : 'center',
    },
    loginBtn : {
      width : '80%', 
      backgroundColor : 'black',
      justifyContent : 'center',
   
      borderRadius : 10,
      height : 40,
   
      marginVertical : 10,
    },
    loginBtnText :{
        color : 'white',
        fontSize : 20,
        fontWeight:'bold',
        textAlign : 'center',
    },
    link : {
      color : 'blue',
    }
})

export default Login