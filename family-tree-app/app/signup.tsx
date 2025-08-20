import { Image, Text, View, StyleSheet, TextInput, Button, Alert } from "react-native"
import React, { useState, useEffect } from "react";
import { router } from "expo-router";

import Spacer from "@/components/spacer";


export default function SignUp() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

      const submitCredentials = async () => {
        const Email = email.trim();
        const Password = password;
        const ConfirmPassword = confirmPassword;

        if (!Email || !Password || !ConfirmPassword) 
        {
          Alert.alert("Validation Error", "All fields are required!");
          return;
        }

        if (Password !== ConfirmPassword)
        {
          Alert.alert("Validation Error", "Passwords do not match!");
          return;
        }

        const response = await fetch("http://10.0.2.2:8000/signup", {method: "POST", headers: {"Content-Type": "application/json",},
          body: JSON.stringify({email: Email, password: Password,}),}); // Android emulator
        if (response.ok)
        {
          const data = await response.json();
          Alert.alert("Backend Response", JSON.stringify(data)); // show JSON in alert
          router.replace("/login");
        }
        else
        {
          Alert.alert("Error", "Failed to connect to backend");
        }

        // // Proceed with further processing, e.g., saving to database  
      };

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/Tree.jpg')} style={styles.image} />

      <Text style={styles.text}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Enter Email:" value={email} onChangeText={setEmail} />
      <Spacer size={50}/>
      <TextInput style={styles.input} placeholder="Enter Password:" value={password} onChangeText={setPassword} secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Confirm Password:" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
      <Spacer size={30}/>
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
    width: 100,
    height: 125,
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

