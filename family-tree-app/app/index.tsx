import { View, Button, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

import Spacer from "@/components/spacer";

export default function Index() {
  return (
    <View style={styles.container}>

        <Text style={styles.text}>Welcome to the Family Tree App!</Text>

        <Link href="/login" asChild>
            <Button title="Login" />        
        </Link>

        <Spacer/>

        <Link href="/signup" asChild>
            <Button title="Sign Up" />        
        </Link>

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
    fontSize: 50,
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
    margin: 20,
  },

  link: {
    margin: 10,
  }

});