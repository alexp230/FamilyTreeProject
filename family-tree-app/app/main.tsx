import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function main() {

    const handlePress = () => {
        router.replace("/")
    }

  return (
    <View style={styles.container}>

        <View style={styles.topBar}>
            <Image source={require('../assets/images/Tree.jpg')} style={styles.image} resizeMode='contain'/>
        
            <Text style={styles.heading1}>Family Tree</Text>

            <Button title="SignOut" onPress={handlePress} />
        </View>

    </View>

  )
}

const styles = StyleSheet.create({

    container: {
    flex: 1,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'lightgrey',
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },

  image: {
    width: 100,
    height: 50,
  },

  heading1: {
    fontSize: 30,
    fontWeight: "bold",
  }

})