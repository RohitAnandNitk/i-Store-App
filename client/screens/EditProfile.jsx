import { View, Text, StyleSheet, Image, ScrollView , Pressable , TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import Layout from '../Layouts/Layout'
import { userData } from '../Data/UserData'
import InputBox from '../component/Form/InputBox'
import { useNavigation } from '@react-navigation/native'

const EditProfile = () => {
    //sate
    const [name, setName] = useState(userData.name);
    const [profileImage, setProfileImage] = useState(userData.profileImage);
    const [phone, setPhone] = useState(userData.phone.toString());
    const [address, setAddress] = useState(userData.address);
    const [city, setCity] = useState(userData.city);
    const [email, setEmail] = useState(userData.email);
    const [password, setPassword] = useState(userData.password);

    const navigation = useNavigation();
    // update profile handle
    const handleProfileUpdate = () =>{
        if(!name || !phone || !email || !password || !address || !city){
            return alert("Please Enter all fields");
          }
        alert("Profile has been updated!");
        navigation.navigate('profile');
    }

  return (
    <Layout>
        <View style={styles.container}>
            <ScrollView>
                <View style = {styles.imageContainer} >
                    <Image style = {styles.image} source = {{uri : profileImage}} />
                    <Pressable onPress = {() => alert("profile image changed")}>
                        <Text style = {{color : 'red'}}>Change Profile Image</Text>
                    </Pressable>
                </View>
                <InputBox 
                value = {name}
                setValue={setName}
                placeholder={"Enter new Name"}
                autoComplete={'name'}/>

                <InputBox 
                value = {phone}
                setValue={setPhone}
                placeholder={"Enter new Phone"}
                autoComplete={'tel'}/>

                <InputBox 
                value = {email}
                setValue={setEmail}
                placeholder={"Enter new email"}
                autoComplete={'email'}/>

                <InputBox 
                value = {password}
                setValue={setPassword}
                placeholder={"Enter new password"}
                autoComplete={'password'}
                secureTextEntry={true}/>

                <InputBox 
                value = {city}
                setValue={setCity}
                placeholder={"Enter new city"}
                autoComplete={'country'}/>

                <InputBox 
                value = {address}
                setValue={setAddress}
                placeholder={"Enter new address"}
                autoComplete={'address-line1'}/>

            </ScrollView>
            <TouchableOpacity style = {styles.btn}
            onPress={handleProfileUpdate}>
                <Text style = {styles.btnText}>UPDATE PROFILE</Text>
            </TouchableOpacity>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container : {
        marginVertical : 20,
    },
    imageContainer : {
        justifyContent :'center',
        alignItems : 'center',
    },
    image :{
        height : 100,
        width : '100%',
        resizeMode : 'contain',
    },
    btn : {
        backgroundColor : 'black',
        borderRadius : 20,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center',
        marginHorizontal : 30, 
    },
    btnText :{
        color : 'white',
        fontSize : 20,
        fontWeight : 'bold',
        textAlign: 'center',
    }
})

export default EditProfile