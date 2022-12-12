import React from "react";
import { useEffect, useState , useContext} from "react";
import { Formik } from 'formik';
import { View ,FlatList,Text,StyleSheet,TextInput,Button, Alert, TouchableOpacity,ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabRouter, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Divider,Title} from 'react-native-paper';
import { AuthContext } from "./Context";


export default function Authentication(){
   const {logIn} = useContext(AuthContext);
   const {register} = useContext(AuthContext);
   const [authenticationState,setAuthenticationState] = useState(true);
   const styles = StyleSheet.create({
      input: {
       margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      emailInput:{
         margin: 15,
         height: 55,
         borderWidth:1,
         width:'90%',
         borderRadius:8,
         fontSize:20,
         borderColor:'grey',
      },
      continueButton:{
         backgroundColor: 'green',
         width:'90%',
         margin: 15,
         borderRadius:8,
         height: 55,
         alignItems:'center',
         alignContent:'center',
         justifyContent:'center'
      },
      continueButtonDisabled:{
         backgroundColor: '#D3D3D3',
         width:'90%',
         margin: 15,
         borderRadius:8,
         height: 55,
         alignItems:'center',
         alignContent:'center',
         justifyContent:'center'
      },
      continueText:{
       textAlign:'center',
       fontSize:20,
       color: 'white',
      
      },
      loginText :{
         fontSize:20,
         paddingBottom:15,
         fontWeight:'bold',
      },
     
      otpBox:{
        backgroundColor:'#f5f4f2',
         fontWeight:'600',
         alignSelf:'center',
         padding:10,
         fontSize:25,
         height:60,
         width:'15%',
         borderRadius:5,
         borderWidth:0.5,
         borderColor:'grey',
         alignContent:'center',
         textAlign:'center',
      },
        codeFiledRoot: { marginTop: 20, width: 280, marginLeft: 'auto',marginRight: 'auto', },
   
       focusCell: {
         borderBottomColor: '#FF2400',
         borderBottomWidth: 2,
       },
     //  root: {padding: 20, minHeight: 300},
       verficationTitle:{
       paddingLeft:10,
       paddingRight:10,
       fontSize:18,
       },
       email:{
          fontSize:15,
         
       },
    });
   return(<>
   <ScrollView>
 {authenticationState ? (
  <View style={{ flex: 1, alignItems: 'center', paddingTop:100}}>
  <View style={{alignItems:'center',marginBottom:30}}>
  <Text>*unza logo*</Text>
  <Text>THE UNIVERSITY OF ZAMBIA PARKING MANAGEMENT APP</Text>
  </View>
  <Text style={{fontSize:16,color:'#59515E'}}>Please enter your email address and password</Text>
  <Formik
 initialValues={{ email: '' ,password: '' }}
 onSubmit={values => logIn(values)}
>
 {({ handleChange, handleBlur, handleSubmit, values,errors,isValid,touched }) => (
   <>
     <TextInput
       onChangeText={
        handleChange('email')  }
       onBlur={handleBlur('email')}
       value={values.email}
       style={styles.emailInput}
       placeholder='Email'
     />
      <TextInput
       secureTextEntry={true}
       onChangeText={
        handleChange('password')  }
       onBlur={handleBlur('password')}
       value={values.password}
       style={styles.emailInput}
       placeholder='Password'
     />
   <TouchableOpacity
           onPress={handleSubmit}
           style={!isValid ? styles.continueButtonDisabled : styles.continueButton}
           disabled={!isValid}
           >
              <Text style={styles.continueText}>Continue</Text>
           </TouchableOpacity>
   </>
 )}
</Formik>
  <TouchableOpacity onPress={()=>setAuthenticationState(false)}><Text>Don't have an account yet? Register</Text></TouchableOpacity>
  </View>
 ):(
  <View style={{ flex: 1, alignItems: 'center', paddingTop:100}}>
  <View style={{alignItems:'center',marginBottom:30}}>
  <Text>*unza logo*</Text>
  <Text>THE UNIVERSITY OF ZAMBIA PARKING MANAGEMENT APP</Text>
  </View>
  <Text style={{fontSize:16,color:'#59515E'}}>Please complete the registration form below</Text>
  <Formik
 initialValues={{ email: '' , name: '', idNumber: '',status: '',nrcNumber: '',cellNumber: '', password: '',password1:'', }}
 onSubmit={values => register(values)}
>
 {({ handleChange, handleBlur, handleSubmit, values,errors,isValid,touched }) => (
   <>
     <TextInput
       onChangeText={
        handleChange('email')  }
       onBlur={handleBlur('email')}
       value={values.email}
       style={styles.emailInput}
       placeholder='Email'
     />
      <TextInput
       onChangeText={
        handleChange('name')  }
       onBlur={handleBlur('name')}
       value={values.name}
       style={styles.emailInput}
       placeholder='Name'
     />
      <TextInput
       onChangeText={
        handleChange('idNumber')  }
       onBlur={handleBlur('idNumber')}
       value={values.idNumber}
       style={styles.emailInput}
       placeholder='ID Number'
     />
      <TextInput
       onChangeText={
        handleChange('status')  }
       onBlur={handleBlur('status')}
       value={values.status}
       style={styles.emailInput}
       placeholder='Status'
     />
      <TextInput
       onChangeText={
        handleChange('nrcNumber')  }
       onBlur={handleBlur('nrcNumber')}
       value={values.nrcNumber}
       style={styles.emailInput}
       placeholder='NRC Number'
     />
      <TextInput
       onChangeText={
        handleChange('cellNumber')  }
       onBlur={handleBlur('cellNumber')}
       value={values.cellNumber}
       style={styles.emailInput}
       placeholder='Phone Number'
     />
      <TextInput
       secureTextEntry={true}
       onChangeText={
        handleChange('password')  }
       onBlur={handleBlur('password')}
       value={values.password}
       style={styles.emailInput}
       placeholder='Password'
     />
       <TextInput
       secureTextEntry={true}
       onChangeText={
        handleChange('password1')  }
       onBlur={handleBlur('password1')}
       value={values.password1}
       style={styles.emailInput}
       placeholder='Confrim Password'
     />
   <TouchableOpacity
           onPress={handleSubmit}
           style={!isValid ? styles.continueButtonDisabled : styles.continueButton}
           disabled={!isValid}
           >
              <Text style={styles.continueText}>Continue</Text>
           </TouchableOpacity>
   </>
 )}
</Formik>
  <TouchableOpacity style={{paddingBottom:20}} onPress={()=>setAuthenticationState(true)}><Text>Already have an account? Sign in</Text></TouchableOpacity>
  </View>
 )}
       </ScrollView>
      </>
   )
}