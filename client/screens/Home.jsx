import { View, Text , StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Layout from '../Layouts/Layout'
import Categories from '../category/Categories'
import Banner from '../component/Banner/Banner'
import Products from '../component/Product/Products'
import Header from './../Layouts/Header';


const Home = () => {
  return (
    <Layout>
      <Header/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 170 }} >
        <Categories/>
        <Banner/>
        <Products/>
      </ScrollView>
    </Layout>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
