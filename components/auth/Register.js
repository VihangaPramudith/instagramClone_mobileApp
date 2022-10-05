import React, { Component } from "react";
import { Button, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 


export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { email: "", password: "", name: "" };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password, name } = this.state;
    const auth = getAuth();
    const firestore = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setDoc(doc(firestore, "users", auth.currentUser.uid), {
          name,
          email
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name: name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email: email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password: password })}
        />
        <Button onPress={() => this.onSignUp()} title="Sign Up" />
      </View>
    );
  }
}

export default Register;