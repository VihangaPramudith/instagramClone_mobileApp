import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: rootReducer
});


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDtpSxob6pDVessdeBVZw9LjJYXS6EoEs",
  authDomain: "instagramclone-ae4f9.firebaseapp.com",
  projectId: "instagramclone-ae4f9",
  storageBucket: "instagramclone-ae4f9.appspot.com",
  messagingSenderId: "388702203990",
  appId: "1:388702203990:web:67ea872fbb5acedca8cbf7",
  measurementId: "G-3KFST5WPFB",
};

let myApp = initializeApp(firebaseConfig);

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import MainScreen from "./components/Main";

const Stack = createStackNavigator();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View>
          <Text style={{ flex: 1, justifyContent: "center" }}>Loading</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}

export default App;
