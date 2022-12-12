import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState ,useContext} from "react";
import { View ,FlatList,Text,StyleSheet,TextInput,Button, Alert, TouchableOpacity,ScrollView} from "react-native";
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { Divider,Title} from 'react-native-paper';
import { AuthContext } from "./Context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}){
   const {logOut} = useContext(AuthContext);
   const [data,setData] = useState()

   
   useEffect(()=>{
      async function getData(){
         const user = await AsyncStorage.getItem('user')
         fetch(`http://192.168.8.100:8000/api/user/${user}/`,{
           method: 'GET'
         }).then(res=>res.json())
        .then((result)=>{
           setData(result.id)
           console.log(result.id)
        }).catch((error)=>{
         console.log(error)
        })
      }

      getData()
    },[])

    const onPress =()=>{
      Alert.alert('Woah!','Leaving so soon?',[
         {
            text: 'NO',
            style: 'cancel',
         },
         {
            text: 'YES',
            onPress: 
               ()=>{
                  logOut()
               } 
         }
      ])
   }
   return(
   <SafeAreaView>
      <View style={{paddingBottom:20,paddingLeft:10}}>
      <Ionicons name="person-circle" size={50} color="green" />
            </View>
            <Divider/>
            <View style={{paddingTop:20,paddingBottom:10,paddingLeft:10}}>
               <Text style={{fontSize:20,color:'black',fontWeight:'bold'}}>Account</Text>
               <TouchableOpacity onPress={()=>navigation.navigate('EditInfo',{
                  userId:data
               })}>
               <View style={{paddingTop:20,flexDirection:'row',justifyContent:'space-between',paddingBottom:20}}>
               <Ionicons name="person-circle-outline" size={25} color='black' />
               <Text style={{paddingRight:80,fontSize:18}}>Personal Information</Text>
               <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
               </View>
               </TouchableOpacity>
            </View>
            <Divider/>
            <TouchableOpacity style={{ backgroundColor: 'green', width:'93%', margin: 15, borderRadius:8, height: 60,alignContent:'center',alignItems:'center',justifyContent:'center'}}
             onPress={()=>{onPress()}}>
            <Text style={{textAlign:'center', fontSize:20, color: 'white'}}>
               Log out
               </Text>
            </TouchableOpacity>
   </SafeAreaView>
   )
}