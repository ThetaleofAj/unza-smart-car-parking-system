import React from "react";
import { useEffect, useState } from "react";
import { Formik } from 'formik';
import { View ,FlatList,Text,StyleSheet,TextInput,Button, Alert, TouchableOpacity,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Divider,Title} from 'react-native-paper';

export default function EditVehicle({navigation}){
   const [data,setData] = useState({})
   const route = useRoute();

   const edit =(props)=>{
      fetch(`http://192.168.8.100:8000/api/vehicleDetail/${route.params.objId}`,{
         method:'PUT',
         headers:{
            'content-type': 'application/json'
         },
         body:JSON.stringify({
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

   const deleteVehicle =()=>{
      Alert.alert('Delete','Are you sure you want to delete this vehicle?',[
         {
            text: 'NO',
            style: 'cancel',
         },
         {
            text: 'YES',
            onPress: ()=>{
               fetch(`http://192.168.8.100:8000/api/vehicleDetail/${route.params.objId}/`,{
                  method: 'DELETE',
                         })
                         .then(data=>data.json())
                         .then((res)=>{
                            navigation.goBack()
                            }).catch((error)=>{
                              navigation.goBack()
                              console.log(error)
                         })
            }
         }
      ])
     
   }



   useEffect(()=>{
      fetch(`http://192.168.8.100:8000/api/vehicleDetail/${route.params.objId}`,{
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
        <Text style={{fontWeight:'bold',fontSize:22,alignSelf:'center'}}>Edit vehicle details</Text>
        <Formik initialValues={{plateNumber:data.numberPlate,vehicleModel:data.model,vehicleColor:data.color}}
onSubmit={values=>edit(values)} enableReinitialize
 >
   {({handleChange,handleBlur,handleSubmit,values,})=>(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <TextInput 
         onChangeText={handleChange('plateNumber')}
         onBlur={handleBlur('plateNumber')}
         value={values.plateNumber}
         style={{
            margin: 15,
            height: 60,
            borderWidth:1,
            width:350,
            borderRadius:8,
            fontSize:20,
            borderColor:'grey',
         }}
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
         placeholder='Vehicle Number'
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
            <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Edit</Text>
         </TouchableOpacity>
      </View>
   )}
</Formik> 
<TouchableOpacity style={{
             backgroundColor: 'red',
             width:350,
             margin: 15,
             borderRadius:8,
             height: 55,
             alignItems:'center',
             alignContent:'center',
             justifyContent:'center'
         }} onPress={deleteVehicle}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Delete</Text>
         </TouchableOpacity>

        </View>
        </ScrollView>
      </SafeAreaView>
   )
}