import { Image, Text, View, StyleSheet, TextInput, Button, Alert } from "react-native"
import React, { useState } from "react";
import { router } from "expo-router";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials = async () => {
    const Email = email.trim();
    const Password = password;

    const response = await fetch("http://10.0.2.2:8000/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({email: Email, password: Password,}),}); // Android emulator
      if (response.ok)
      {
        const data = await response.json();
        Alert.alert("Backend Response", JSON.stringify(data)); // show JSON in alert
        router.replace("/main");
      }
      else
      {
        Alert.alert("Error", "Failed to connect to backend");
      }

  }

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/Tree.jpg')} style={styles.image} />

      <Text style={styles.text}>Login</Text>

      <TextInput style={styles.input} placeholder="Enter Username:" value={email} onChangeText={setEmail} />
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
    width: "50%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 15,
  },

});

