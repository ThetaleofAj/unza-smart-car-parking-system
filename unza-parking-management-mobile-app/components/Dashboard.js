import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ScrollView ,TouchableOpacity,FlatList} from 'react-native';
import { useEffect, useState } from "react";
import { ProgressChart,LineChart} from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Divider,Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard({navigation}) {
  const [data,setData] = useState([]);
  const [info,setInfo] = useState({})
  const [isLoading,setIsLoading] = useState(true)
 
 

//   if(isLoading){
//     return(
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//     <Text>Loading...</Text>
//  </View>
//     )
    
//   }

useEffect(()=>{
  async function getData(){
    const user = await AsyncStorage.getItem('user')
    fetch(`http://192.168.8.100:8000/api/user/${user}/`,{
      method: 'GET'
    }).then(res=>res.json())
    .then((result)=>{
      console.log(result.carregister)
      setData(result.carregister)
      setInfo(result.id)
      console.log(result.id)
   }).catch((error)=>{
    console.log(error)
   })

  }
 getData()
},[])

  return (
    <SafeAreaView>
      <View style={{alignContent:'center',alignItems:'center',marginTop:10,marginBottom:20}}>
      <Text style={{fontSize:24,marginBottom:10,fontWeight:'bold'}}>Parking Lot Capacity</Text>
      <CircularProgress value={58} radius={120} valueSuffix={'%'} />
      </View>
      <Divider/>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
        <Text style={{paddingLeft:15,fontWeight:'bold',fontSize:24}}>My Vehicles</Text>
        <TouchableOpacity>
        <Text style={{paddingRight:10,fontSize:18,color:'green'}} onPress={()=>navigation.navigate('Vehicles',{
          userId: info
        })}>Add</Text>
        </TouchableOpacity>
      </View>
      <View>
      <FlatList
      horizontal
      data={data}
      keyExtractor={({id},index)=>id}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
        <TouchableOpacity onPress={()=>navigation.navigate('EditVehicle',{
          objId:item.id
        })}>
            <View style={{alignContent:'center',alignItems:'center',marginTop:25,borderWidth:1,marginLeft:20,marginRight:20,padding:5,borderRadius:10}}>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Plate Number</Text>
             <Text style={{fontSize:18}}>{item.numberPlate}</Text>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Vehicle Model</Text>
             <Text style={{fontSize:18}}>{item.model}</Text>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Vehicle color</Text>
             <Text style={{fontSize:18}}>{item.color}</Text>
            </View>
            </TouchableOpacity>
      )}
      />
      </View>
      {/* <View style={{flexDirection:'row'}}>
        {
          data.length != 0 ? (<>
            <TouchableOpacity onPress={()=>navigation.navigate('EditVehicle')}>
            <View style={{alignContent:'center',alignItems:'center',marginTop:25,borderWidth:1,marginLeft:20,marginRight:20,padding:5,borderRadius:10}}>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Plate Number</Text>
             <Text style={{fontSize:18}}>abp8432</Text>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Vehicle Model</Text>
             <Text style={{fontSize:18}}>Toyota Corolla</Text>
             <Text style={{fontWeight:'bold',fontSize:20,color:'green'}}>Vehicle color</Text>
             <Text style={{fontSize:18}}>Grey</Text>
            </View>
            </TouchableOpacity>
            </>
          ):(<Text style={{paddingLeft:15,paddingTop:10}}>You have no registered vehicles!</Text>)
        }
   
      </View> */}
    
    </SafeAreaView>
  );
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



