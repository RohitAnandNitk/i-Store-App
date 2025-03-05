import { View, Text , StyleSheet} from 'react-native'
import React from 'react'
import Layout from '../Layouts/Layout'

const Notification = () => {
  return (
    <Layout>
        <View style = {styles.container} >
        <Text>Oops ! You don't have any notification yet.</Text>
        </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
    container : {
        justifyContent : 'center',
        alignItems : 'center',
        height : '100%',
    }
})

export default Notification