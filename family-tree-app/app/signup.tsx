import { Image, Text, View, StyleSheet, TextInput, Button } from "react-native"
import React, { useState } from "react";
import { router } from "expo-router";

import { usersDB } from "@/constants/databases";
import { appendToFile, readFromFile, writeToFile } from "@/utils/DBmethods";
// import Spacer from "@/components/spacer";


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

    const data = await readFromFile(usersDB);
    const lines = data.split('\n').filter(line => line.trim() !== '');

    for (const line of lines) {
      const [fn, ln, e, un, pw] = line.split(',').map(field => field.trim());

      if (e === email)
      {
        alert("Email is already in use.");
        return;
      }
      if (un === userName)
      {
        alert("Username is already in use.");
        return;
      }
      
    };

    await appendToFile(usersDB, `${firstName},${lastName},${email},${userName},${password}`);

    setFirstName("");
    setLastName("");
    setEmail("");
    setUserName("");
    setPassword("");

    alert("Account has been created!");

    router.replace("/");    
  };

  return (
    <View style={styles.container}>

      <Image source={require('../assets/images/Tree.jpg')} style={styles.image} />

      <Text style={styles.text}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Enter FirstName:" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Enter LastName:" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Enter Email:" value={email} onChangeText={setEmail} />
      {/* <Spacer size={50}/> */}
      <TextInput style={styles.input} placeholder="Enter Username:" value={userName} onChangeText={setUserName} />
      <TextInput style={styles.input} placeholder="Enter Password:" value={password} onChangeText={setPassword} secureTextEntry={true} />
      {/* <Spacer size={30}/> */}
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

