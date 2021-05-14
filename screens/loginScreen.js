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
let valid = true;
const windowHeight = Dimensions.get('window').height;

const LoginScreen = (props) => {

const [text, onChangeText] = useState("");
const [number, onChangeNumber] = useState("");
const [message, setMessage] = useState("")
const [message2, setMessage2] = useState("")
// const [valid, setValid] = useState(true)

// useEffect(() => {
//     // console.log(text);
//     // console.log(number);
//     console.log(valid);
//   }, []);

//   useEffect(() => {
//     // console.log(text);
//     console.log(message);
//     console.log(valid);
//   }, []);

  const checkValidation = () => {

    if( /[A-Z]/.test(text) )
    {
        // setValid(false)
        valid = false;
        setMessage2("username should contains lowercase letters only")
    }

    if( /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(text) )
    {
      // setValid(false)
      valid = false;
      setMessage2("username should not contain any special charachter")
    }

    if( text.length < 5 )
    {
        // setValid(false)
        valid = false;
        setMessage2("username should contains atleast 5 charachters")
    }

    
    if( ! /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(number) )
    {
      // setValid(false)
      valid = false;
      setMessage("password must contains a special charachter")
    }
    
    if( number.length < 8 )
    {
        // setValid(false)
        valid = false;
        setMessage("password should contains atleast 8 charachters")
    }

    if(valid === true)
     {
       props.navigation.push("Dashboard" , {username : text})
     }
     else
     {
       console.log("error")
     }
  }

    return (
        <View style={styles.container}>
                <View style={styles.container2} >
                 <Text style={{marginBottom: -10}}>Enter Username</Text>

                <TextInput
                   style={styles.input}
                   onChangeText={(val) => {
                    onChangeText(val);
                   }}
                   placeholder="username"
                   value={text}
                 />

                 {message2.length > 0 ? <Text style={{marginBottom: 25 , color: "red"}}>{message2}</Text> : <View />}
                  

                 <Text style={{}}>Enter Password</Text>
                 <TextInput
                   style={styles.input}
                   onChangeText={(val) => {
                    onChangeNumber(val)
                   }}
                   value={number}
                   secureTextEntry={true}
                   placeholder="password"
                 />
                 <Text style={{color: "red"}}>{message}</Text>

                <TouchableOpacity onPress={() => {
                    setMessage("");
                    setMessage2("");
                    // setValid(true)
                    valid = true;
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
        backgroundColor: "#fffbdf"
      },
      container2: {
        width: windowWidth/1.2,
        height: windowHeight/2.2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4eee8",
        borderRadius: 25
      },
      input: {
        width : windowWidth/1.8,         
        height: windowHeight/20,
        margin: 18,
        borderRadius:8,
        borderWidth: 1,
        textAlign: "center",
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