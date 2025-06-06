import { View, Text , StatusBar, StyleSheet} from 'react-native'
import React from 'react'

import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <>
       <StatusBar/>
      <View style = {{flex : 1}} >{children}</View>
      <View style = {styles.footer}>
        <Footer/>
      </View>
    </>
  )
}


const styles = StyleSheet.create({
  footer : {
    display : 'flex',
    width : '100%',
    flex : 1,
    justifyContent : 'flex-end',
    zIndex :100,
    borderTopWidth :1,
    position : 'absolute',
    bottom : 0,
    padding : 10,
    backgroundColor : 'white',
    
  }
})
export default Layout