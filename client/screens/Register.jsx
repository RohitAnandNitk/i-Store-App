import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React , {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import InputBox from '../component/Form/InputBox';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/features/UserAction';
import { useReduxStateHook } from '../Hooks/customHook';

const Register = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [answer , setAnswer] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country , setCountry] = useState('');
    const navigation = useNavigation();
  
    //handle login
    const handleRegister = () =>{

      console.log(name);
      console.log(email);
      console.log(password);
      console.log(address);
      console.log(city);
      console.log(country);
      console.log(answer);
      console.log(phone);

       if(!name || !phone || !email || !password || !address || !city ){
         return alert("Please Enter all fields");
       }

       const formData = {name , phone, email, password, address, city, answer , country : "India"};
      dispatch(register(formData));
      //  alert("Registered Successfully");
      //   navigation.navigate("home")
    }

    const loading = useReduxStateHook(navigation,"login");
    return (
      <View style = {styles.container}>
        <Text style = {styles.heading}>Welcome To {" "}
            <Text style = {styles.appName} >i-Store</Text></Text>
        
        <InputBox 
         placeholder={"Name"} 
         autoComplete={'name'}
         value = {name} 
         setValue={setName}/>
        

        <InputBox 
         placeholder={"Phone"} 
         autoComplete={'tel'}
         value = {phone} 
         setValue={setphone}/>

        <InputBox 
         placeholder={"Address"} 
         autoComplete={'address-line1'}
         value = {address} 
         setValue={setAddress}/>
        
        <InputBox 
         placeholder={"City"} 
         autoComplete={'country'}
         value = {city} 
         setValue={setCity}/>

        <InputBox 
         placeholder={"Country"} 
         autoComplete={'country'}
         value = {country} 
         setValue={setCountry}/>
        
        <InputBox 
         placeholder={"Email"} 
         autoComplete={'email'}
         value = {email} 
         setValue={setEmail}/>
  
        <InputBox 
         placeholder={"Password"} 
         secureTextEntry={true} 
         value={password}
         setValue={setPassword}/>
        
        <InputBox 
         placeholder={"DOB"} 
         value={answer}
         setValue={setAnswer}/>
  
         <View style = {styles.loginBtnContainer}>
          <TouchableOpacity style = {styles.loginBtn} onPress={handleRegister}>
              <Text style = {styles.loginBtnText}>Register</Text>
          </TouchableOpacity>
          
         <Text >Do you have an account?{"  "}<Text 
         style = {styles.link}
         onPress={()=> navigation.navigate('login')}>Login Now</Text></Text>  
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
export default Register