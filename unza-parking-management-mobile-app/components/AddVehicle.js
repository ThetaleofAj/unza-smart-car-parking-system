import React from "react";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import { useRoute } from '@react-navigation/native';
import { View ,FlatList,Text,StyleSheet,TextInput,Button, Alert, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from '@expo/vector-icons';
import { Divider,Title} from 'react-native-paper';


export default function AddVehicle({navigation}){
   const route = useRoute();

   const submit =(props)=>{
      fetch('http://192.168.8.100:8000/api/addVehicle/',{
         method: 'POST',
         headers:{
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            'owner':route.params.userId,
            'numberPlate':props.plateNumber,
            'model':props.vehicleModel,
            'color':props.vehicleColor
         })
      }).then(data=>data.json())
      .then((result)=>{
         console.log(result)
      })
   }

 
   return(
<SafeAreaView>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <TouchableOpacity style={{padding:10}} onPress={() => navigation.goBack()}>
             <AntDesign name="arrowleft" size={28} color="black" />
             </TouchableOpacity>
             </View>
             <Divider/>
   <View style={{marginTop:10}}>
   <Text style={{fontWeight:'bold',fontSize:22,alignSelf:'center'}}>Register a new vehicle</Text>
<Formik initialValues={{plateNumber:'',vehicleModel:'',vehicleColor:''}}
onSubmit={values=>submit(values)}
 >
   {({handleChange,handleBlur,handleSubmit,values,})=>(
      <View style={{alignItems: 'center', justifyContent: 'center' }}>
         <TextInput 
         onChangeText={handleChange('plateNumber')}
         onBlur={handleBlur('plateNumber')}
         value={values.plateNumber}
         style={{  margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',}}
         placeholder='Plate Number'
         multiline
         />
          <TextInput 
         onChangeText={handleChange('vehicleModel')}
         onBlur={handleBlur('vehicleModel')}
         value={values.vehicleModel}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='Vehicle Model'
         multiline
         />
          <TextInput 
         onChangeText={handleChange('vehicleColor')}
         onBlur={handleBlur('vehicleColor')}
         value={values.vehicleColor}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
         placeholder='Vehicle Color'
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
            <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Submit</Text>
         </TouchableOpacity>
      </View>
   )}

</Formik>   
</View>
</SafeAreaView>
   )
}