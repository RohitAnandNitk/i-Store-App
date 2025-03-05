import { View, Text , StyleSheet , TextInput, TouchableOpacity} from 'react-native'
import { React} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react'


const Header = () => {
    const [searchText, setSearchText] = useState("");

    // handle search funciton
    const handleSearch = () => {
        console.log(searchText);
        setSearchText("");
    }
  return (
    <View style= {{height : 90 , backgroundColor : "black"}}>
       <View style= {styles.container}>
            <TextInput style ={styles.inputBox} value={searchText} onChangeText={(text)=> setSearchText(text)}/>
            <TouchableOpacity style ={styles.searchButton} onPress={handleSearch}>
                <Icon name="search" style = { styles.icons}></Icon>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container : {
        display : 'flex',
        flex : 1,
        flexDirection : 'row',
        alignItems: 'center',
        paddingHorizontal : 15, 
    },
    inputBox :{
        borderWidth : 0.3,
        width : '100%',
        position : "absolute",
        left : 15,
        height : 40,
        color : "black",
        backgroundColor : "white",
        paddingLeft : 16,
        fontSize : 16,
        borderRadius : 5
    },
    searchButton : {
        position : 'absolute',
        left : '95%',
    },
    icons : {
        color : 'black',
        fontSize : 18,
    }
  }
)

export default Header