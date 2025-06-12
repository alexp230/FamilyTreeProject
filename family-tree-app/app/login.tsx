import { Image, Text, View, StyleSheet, TextInput, Button } from "react-native"
import React, { useState } from "react";
import { router } from "expo-router";

import { usersDB } from "@/constants/databases";
import { appendToFile } from "@/utils/DBmethods";


export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials = async () => {

    if (userName == "Alex" && password == "abc")
    {
      try 
      {
        appendToFile(usersDB, `${userName},${password}`);
        router.replace("/main");
      } 
      catch (error) 
      {
        console.error("Failed to write to file:", error);
        alert("Something went wrong while saving login.");
      }
    }
    else
      alert("Failure");

    setUserName("");
    setPassword("");
  };

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/Tree.jpg')} style={styles.image} />

      <Text style={styles.text}>Login</Text>

      <TextInput style={styles.input} placeholder="Enter Username:" value={userName} onChangeText={setUserName} />
      <TextInput style={styles.input} placeholder="Enter Password:" value={password} onChangeText={setPassword} secureTextEntry={true} />

      <Button title="Submit" onPress={submitCredentials} />

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 30,
    margin: 10,
  },

  image: {
    width: 200,
    height: 250,
    marginBottom: 20,
  },

  input: {
    height: 40,
    width: "20%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },

});

