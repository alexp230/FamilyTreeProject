import { Image, Text, View, StyleSheet, TextInput, Button } from "react-native"
import React, { useState } from "react";
import { router } from "expo-router";

import Spacer from "@/components/spacer";


export default function SignUp() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitCredentials = async () => {
    setFirstName(firstName.trim());
    setLastName(lastName.trim());
    setEmail(email.trim());
    setUserName(userName.trim());
    setPassword(password.trim());

      
  };

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/Tree.jpg')} style={styles.image} />

      <Text style={styles.text}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Enter FirstName:" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Enter LastName:" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Enter Email:" value={email} onChangeText={setEmail} />
      <Spacer size={50}/>
      <TextInput style={styles.input} placeholder="Enter Username:" value={userName} onChangeText={setUserName} />
      <TextInput style={styles.input} placeholder="Enter Password:" value={password} onChangeText={setPassword} secureTextEntry={true} />
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

