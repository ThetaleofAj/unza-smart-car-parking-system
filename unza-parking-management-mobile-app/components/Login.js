import React from "react";
import { StyleSheet, Text, View,ScrollView,TextInput,Alert,TouchableOpacity } from 'react-native';
import { useState } from "react";

export default function Login({navigation}){
   const [username, setUsername] = useState('')
   const [password,setPassword] = useState('')
   
   const usernameHandler=(enteredUsername)=>{
      setUsername(enteredUsername)
   }

   const passwordHandler=(enteredPassword)=>{
      setPassword(enteredPassword)
   }

   const LogMeIn=()=>{
      if(username === 'admin' && password === 'admin'){
         navigation.navigate('Dashboard')
      }else{
         Alert.alert('Error','Login credentials are wrong!')
      }
   }

   return(
      <View style={styles.container}>
         <TextInput placeholder="username" onChangeText={usernameHandler} style={{ margin: 15,
         height: 60,
         borderWidth:1,
         width:380,
         borderRadius:8,
         fontSize:20,}} >
         </TextInput>
         <TextInput placeholder="password" onChangeText={passwordHandler} style={{ margin: 15,
         height: 60,
         borderWidth:1,
         width:380,
         borderRadius:8,
         fontSize:20,}}>
         </TextInput>
         <TouchableOpacity onPress={LogMeIn}>
            <Text>Login</Text>
         </TouchableOpacity>

      </View>
   )
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
     paddingTop:20
   },
 });
 