import React, { useEffect, useState } from "react"
import {Button, Grid} from '@material-ui/core';
import {useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

function UserDetail(){
   const [data,setData] = useState([]);
   const [vehicles,setVehicles] = useState([]);
   const [isLoading,setIsLoading] = useState(false);
   let params = useParams();



   const approveUser=()=>{
      fetch(`https://andyson2.pythonanywhere.com/api/approveUser/${params.userId}/`,{
         method:'PUT',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            'is_approved': true,
         })
      }).then(data=>data.json())
      .then((result)=>{
         console.log(result)
      })
   }

   const blockUser=()=>{
      fetch(`https://andyson2.pythonanywhere.com/api/approveUser/${params.userId}/`,{
         method:'PUT',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify({
            'is_approved': false,
         })
      }).then(data=>data.json())
      .then((result)=>{
         console.log(result)
      })
   }

   useEffect(()=>{
      setIsLoading(true)
      function getData(){
      fetch(`https://andyson2.pythonanywhere.com/api/userDetail/${params.userId}/`,{
            method: 'GET',
         })
         .then(res=>res.json())
         .then((result)=>{
            console.log(result)
            setData(result)
            setVehicles(result.carregister)
            setIsLoading(false)
         })
      }
      getData()
   },[params.userId])

   if(isLoading){
      return(
        <div style={{alignItems:'center',justifyContent:'center',display:'flex',paddingTop:200}}>
          <CircularProgress color="success" />
        </div>
      )
    }

   return(
      <div className="home">
         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <h1>Name</h1>
        <p>{data.name}</p>
        </Grid>
        <Grid item xs={6}>
         <h1>Email</h1>
          <p>{data.email}</p>
        </Grid>
        <Grid item xs={6}>
         <h1>ID Number</h1>
          <p>{data.idNumber}</p>
        </Grid>
        <Grid item xs={6}>
         <h1>Status</h1>
          <p>{data.status}</p>
        </Grid>
        <Grid item xs={6}>
         <h1>NRC Number</h1>
          <p>{data.nrcNumber}</p>
        </Grid>
        <Grid item xs={6}>
         <h1>Phone Number</h1>
          <p>{data.cellNumber}</p>
        </Grid>  
      </Grid>
      <div>
<h1>Vechicles</h1>
{
   vehicles.length === 0 ? (<p>User has not registered any vehicles</p>):(<div style={{display: 'flex'}}>
      {vehicles.map((row)=>(
         <div style={{padding:10}}>
         <h2>{row.numberPlate}</h2>
         </div>
      ))}
   </div>)
}

      </div> 
      <div style={{paddingTop:10}}>
      {
      data.is_approved ? (<>
        <Button variant="contained" onClick={()=>blockUser()} style={{backgroundColor:'red',color:'white'}}>Block User</Button>
          </>
         ):(
            <Button variant="contained" onClick={()=>approveUser()} style={{backgroundColor:'green',color:'white'}}>Approve</Button>
         )
      }
      </div>
      </div>
   
   )

}
export default UserDetail;