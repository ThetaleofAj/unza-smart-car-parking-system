import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function TabNavigator(){
   return(
      <Tab.Navigator 
      screenOptions={({ route }) => ({
         lazy:true,
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;

             if (route.name === 'Dashboard') {
                iconName = focused ? 'green':'grey'
               return <AntDesign name='home' size={25} color={iconName} />
             }else if(route.name === 'Profile'){
              iconName = focused ? 'green':'grey'
              return <FontAwesome5 name="user" size={24} color={iconName} />
             }
             // You can return any component that you like here!
           },
           tabBarActiveTintColor: 'black',
           tabBarInactiveTintColor: 'grey',
         })
      }
      >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{headerTitle: 'UNZA PARKING MANAGEMENT',headerTitleStyle:{color:'green'}}} />
      <Tab.Screen name="Profile" component={Profile} options={{headerTitle: 'UNZA PARKING MANAGEMENT',headerTitleStyle:{color:'green'}}} />
    </Tab.Navigator>
   )
}