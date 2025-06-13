import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { usersDB } from '@/constants/databases';
import { readFromFile } from '@/utils/DBmethods';

export default function main() {
  const { fn } = useLocalSearchParams();
  
  const [content, setContent] = useState("");  
  const readFile = async () => {
    try 
    {
      const data = await readFromFile(usersDB);
      setContent(data);
    } 
    catch (e) 
    {
      console.error("Failed to read file:", e);
    }
  };

  useEffect(() => {
    readFile();
  }, []);

    const handlePress = () => {
        router.replace("/")
    }

  return (
    <View style={styles.container}>

      <View style={styles.topBar}>
        <Image source={require('../assets/images/Tree.jpg')} style={styles.image} resizeMode='contain'/>

        <Text style={styles.heading1}>{fn}'s Tree</Text>

        <Button title="SignOut" onPress={handlePress} />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>File Contents:</Text>

        <Text style={styles.content}>{content}</Text>
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
  },

  label: {
    fontSize: 20, marginBottom: 10,
  },

  content: {
    fontSize: 16, color: 'gray', marginBottom: 20,
  },

})