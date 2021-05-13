import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions
} from 'react-native';
import { TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {

const [text, onChangeText] = useState("");
const [number, onChangeNumber] = useState("");
const [message, setMessage] = useState("")
const [valid, setValid] = useState(true)

useEffect(() => {
    // console.log(text);
    // console.log(number);
    console.log(valid);
  }, []);

  useEffect(() => {
    // console.log(text);
    console.log(message);
    console.log(valid);
  }, [message]);

  const checkValidation = () => {

    if( /[A-Z]/.test(text) )
    {
        setValid(false);
        setMessage("username must contains lowercase letters only")
    }

    if( ! /^[0-9]+$/.test(number) )
    {
        setValid(false);
        setMessage("password must contains alpha-numeric values")
    }

    if( ! /^[a-z]+$/.test(number) )
    {
        setValid(false);
        setMessage("password must contains alpha-numeric values")
    }

    if( number.size < 8 )
    {
        setValid(false);
        setMessage("password should contains atleast 8 charachters")
    }

    if( ! /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(number) )
    {
        setValid(false);
        setMessage("password must contains a special charachter")
    }

  }

    return (
        <View style={styles.container}>
                <View style={styles.container2} >
                 <Text style={{marginBottom: -10}}>Enter Username</Text>
                <TextInput
                   style={styles.input}
                   onChangeText={onChangeText}
                   placeholder="username"
                   value={text}
                 />
                 <Text style={{marginBottom: -10}}>Enter Password</Text>
                 <TextInput
                   style={styles.input}
                   onChangeText={onChangeNumber}
                   value={number}
                   placeholder="password"
                 />

                <TouchableOpacity onPress={() => {
                    setMessage("");
                    setValid(true);
                    checkValidation();
                }}>
                 <View style={styles.button}> 
                    <Text style={{
                        color: "white"
                    }}>SUBMIT</Text>
                 </View>
                </TouchableOpacity>
                </View>
        </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ece2e1"
      },
      container2: {
        width: windowWidth/1.2,
        height: windowHeight/2.8,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffee93",
        borderRadius: 25
      },
      input: {
        width : windowWidth/1.8,         
        height: windowHeight/20,
        margin: 18,
        borderRadius:8,
        borderWidth: 1,
        textAlign: "center"
      },
      button: {
        backgroundColor: "green",
        width : windowWidth/2.5,         
        height: windowHeight/20,
        margin: 18,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
      }
  });
  
  export default LoginScreen;