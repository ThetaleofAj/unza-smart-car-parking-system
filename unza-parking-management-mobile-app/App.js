import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView,TextInput,TouchableOpacity,Dimensions,Alert,ActivityIndicator} from 'react-native';
import { useEffect, useState,useReducer,useMemo } from "react";
import { ProgressChart,LineChart} from 'react-native-chart-kit';
import RNSpeedometer from 'react-native-speedometer';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import CircularProgress from 'react-native-circular-progress-indicator';
import TabNavigator from './components/TabNavigator';
import AddVehicle from './components/AddVehicle';
import EditVehicle from './components/EditVehicle';
import EditInfo from './components/EditInfo';
import { AuthContext } from './components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Authentication from './components/Authentication';




const Stack = createNativeStackNavigator();
export default function App() {

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState,dispatch] = useReducer(loginReducer,initialLoginState)

  const authContext = useMemo(()=>({
    logIn:async(props)=>{
     const response = 
      fetch('http://192.168.8.100:8000/rest-auth/login/',{
         method: 'POST',
         body: JSON.stringify({
            'username': props.email,
            'password':props.password
         }),
         headers:{
           'Content-Type': 'application/json'
         },
      }) 
      .then(data=>data.json())
      .then(async(res)=>{
        console.log(res)
        await AsyncStorage.setItem('key',(res.key))
        await AsyncStorage.setItem('user',(props.email))
        dispatch({type:'LOGIN',id:props.email,token:res.key}) 
        }).catch((error)=>{
        Alert.alert('Oops','Username or Password might be wrong')
      })
  
    },
    register:async(props)=>{
      const response = 
      fetch(`http://192.168.8.100:8000/rest-auth/registration/`,{
         method: 'POST',
         body: JSON.stringify({
            'username': props.email,
            'email': props.email,
            'password1':props.password,
            'password2':props.password1
         }),
         headers:{
           'Content-Type': 'application/json'
         },
      }) 
      .then(data=>data.json())
      .catch((error)=>{
        console.log(error)
      })
      .then(async(res)=>{
        console.log(res)
        fetch(`http://192.168.8.100:8000/api/user/${props.email}/`,{
          method: 'GET'
        }).then(res=>res.json())
        .then((res)=>{
          fetch(`http://192.168.8.100:8000/api/editUserDetail/${res.id}/`,{
            method:'PUT',
            headers:{
               'content-type': 'application/json'
            },
            body:JSON.stringify({
               'id':res.id,
               'name':props.name,
               'idNumber':props.idNumber,
               'status':props.status,
               'nrcNumber':props.nrcNumber,
               'cellNumber':props.cellNumber
            })
         }).then(data=>data.json())
         .then(async(result)=>{
          console.log('account fully created')
          await AsyncStorage.setItem('user'(props.email))
         })
        })
        await AsyncStorage.setItem('key',(res.key))
        dispatch({type:'LOGIN',id:props.email,token:res.key}) 
        }).catch((error)=>{
        Alert.alert('Oops','Password is too weak')
        console.log(error)
      })
  

    },
    logOut:async()=>{
      await AsyncStorage.removeItem('key')
      await AsyncStorage.removeItem('user')
      dispatch({type:'LOGOUT'})
    }
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
    //const token = await SecureStore.getItemAsync('tok')
     const token = await AsyncStorage.getItem('key')
     //  const token = await getInStorage('key')
     // const token = '673y4jfnfd'
    dispatch({type:'RETRIEVE_TOKEN',token:token})
    },1000)

  },[])

  if(loginState.isLoading){
    return(
      <ActivityIndicator size="large" color="green" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}/>
    )
  }

  return ( 
    <AuthContext.Provider value={authContext}>
        <NavigationContainer>
      {loginState.userToken !== null ? (
         <Stack.Navigator screenOptions={{headerShown:false}}>
         <Stack.Screen name='Navigator' component={TabNavigator}/>
         <Stack.Screen name='Vehicles' component={AddVehicle}/>
         <Stack.Screen name='EditVehicle' component={EditVehicle}/>
         <Stack.Screen name='EditInfo' component={EditInfo}/>
       </Stack.Navigator>
      ):( 
        <Authentication/>
      )}
      </NavigationContainer>
    </AuthContext.Provider>
   );

  }



  {/* //  <NavigationContainer>
  //    <Stack.Navigator>
  //    <Stack.Screen name="Login" component={Login} />
  //     <Stack.Screen name="Dashboard" component={Dashboard} />
  //     </Stack.Navigator>
  //  </NavigationContainer> */}
