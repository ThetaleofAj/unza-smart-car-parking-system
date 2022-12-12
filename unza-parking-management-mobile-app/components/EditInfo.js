import React from "react";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import { View ,FlatList,Text,StyleSheet,TextInput,Button, Alert, TouchableOpacity,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Divider,Title} from 'react-native-paper';

export default function EditInfo({navigation}){
   const [data,setData] = useState({})
   const route = useRoute();

   const edit =(props)=>{
      fetch(`http://192.168.8.100:8000/api/editUserDetail/${route.params.userId}/`,{
         method:'PUT',
         headers:{
            'content-type': 'application/json'
         },
         body:JSON.stringify({
            'id':route.params.userId,
            'name':props.name,
            'idNumber':props.idNumber,
            'status':props.status,
            'nrcNumber':props.nrcNumber,
            'cellNumber':props.cellNumber
         })
      }).then(data=>data.json())
      .then((result)=>{
         console.log(result)
      })
   }
   useEffect(()=>{
      fetch(`http://192.168.8.100:8000/api/userDetail/${route.params.userId}/`,{
        method: 'GET'
      }).then(res=>res.json())
      .then((result)=>{
        setData(result)
        console.log(result)
     }).catch((error)=>{
      console.log(error)
     })
    },[])


   return(
      <SafeAreaView>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <TouchableOpacity style={{padding:10}} onPress={() => navigation.goBack()}>
             <AntDesign name="arrowleft" size={28} color="black" />
             </TouchableOpacity>
             </View>
             <Divider/>
             <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center' ,marginTop:20}}>
        <Text style={{fontWeight:'bold',fontSize:22,alignSelf:'center'}}>Edit personal details</Text>
        <Formik initialValues={{name:data.name,idNumber:data.idNumber,status:data.status,nrcNumber:data.nrcNumber,cellNumber:data.cellNumber}}
onSubmit={values=>edit(values)} enableReinitialize
 >
   {({handleChange,handleBlur,handleSubmit,values,})=>(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <TextInput 
         onChangeText={handleChange('name')}
         onBlur={handleBlur('name')}
         value={values.name}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='name'
         multiline
         />
          <TextInput 
         onChangeText={handleChange('idNumber')}
         onBlur={handleBlur('idNumber')}
         value={values.idNumber}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='ID Number'
         multiline
         />
          <TextInput 
         onChangeText={handleChange('status')}
         onBlur={handleBlur('status')}
         value={values.status}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='status'
         multiline
         />
           <TextInput 
         onChangeText={handleChange('nrcNumber')}
         onBlur={handleBlur('nrcNumber')}
         value={values.nrcNumber}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='NRC Number'
         multiline
         />
           <TextInput 
         onChangeText={handleChange('cellNumber')}
         onBlur={handleBlur('cellNumber')}
         value={values.cellNumber}
         keyboardType="numeric"
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='Phone Number'
         multiline
         />
         <TouchableOpacity onPress={handleSubmit} style={{
             backgroundColor: 'green',
             width:350,
             margin: 15,
             borderRadius:8,
             height: 55,
             alignItems:'center',
             alignContent:'center',
             justifyContent:'center'
         }}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Edit</Text>
         </TouchableOpacity>
      </View>
   )}
</Formik> 

        </View>
        </ScrollView>
      </SafeAreaView>
   )
}