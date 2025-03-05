import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const InputBox = ({value,setValue ,autoComplete, placeholder, autoCorrect, secureTextEntry}) => {
  return (
    <View style = {styles.form}>
      <TextInput style = {styles.input}
      autoComplete={autoComplete} 
      value={value}
      placeholder={placeholder}
      autoCorrect ={autoCorrect}
      secureTextEntry ={secureTextEntry}
      onChange={(text)=> setValue(text)}
      />
    </View>
  )
}


const styles = StyleSheet.create({
    form :{
         justifyContent : 'center',
         alignItems : 'center',
         marginVertical : 10,
    },
    input : {
        width : '80%',
        backgroundColor : '#ffffff',
        height : 40,
        borderRadius : 10,
        borderWidth : 1,
        borderColor :'black',
    }
})

export default InputBox