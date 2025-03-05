import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Layout from '../../Layouts/Layout'
import Icon from 'react-native-vector-icons/FontAwesome';

const Dashboard = () => {
  return (
    <Layout>
        <View style = {styles.main}>
            <Text style = { styles.heading}>Dashboard</Text>
            <View style = { styles.btnContainer}>

                <TouchableOpacity style = { styles.btn}>
                    <Icon name='shopping-bag'style = { styles.icon} ></Icon>
                    <Text style = { styles.btnText}>Manage Products</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.btn}>
                    <Icon name='bars'style = { styles.icon} ></Icon>
                    <Text style = { styles.btnText}>Manage Orders</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.btn}>
                    <Icon name='tags'style = { styles.icon} ></Icon>
                    <Text style = { styles.btnText}>Manage Categories</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.btn}>
                    <Icon name='users'style = { styles.icon} ></Icon>
                    <Text style = { styles.btnText}>Manage Users</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { styles.btn}>
                    <Icon name='question-circle'style = { styles.icon} ></Icon>
                    <Text style = { styles.btnText}>Manage FAQs</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Layout>
  )
}
const styles = StyleSheet.create({
    main: {
        backgroundColor : "lightgray",
        height : '100%'
    },
    heading : {
        backgroundColor : 'black',
        color : 'white',
        textAlign : 'center',
        padding : 10,
        fontSize : 20,
        margin : 10,
        borderRadius : 10,
    },
    btnContainer : {
        margin : 10,
    },
    btn : {
        flexDirection: 'row',
        alignItems : 'center',
        backgroundColor : 'white',
        padding : 10,
        borderRadius : 10,
        elevation : 10,
        marginBottom : 12,
    },
    btnText : {
        paddingLeft : 10,
        fontSize : 18,
    },
    icon : {
        fontSize : 22,
        marginLeft : 10,
    }
})

export default Dashboard