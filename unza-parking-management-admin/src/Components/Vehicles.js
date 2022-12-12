import React, { useEffect, useState } from "react"
import {Paper,TextField} from '@material-ui/core';
import { Link } from "react-router-dom";
import { Button, Table,TableCell,TableContainer,TableBody } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from '@mui/material/CircularProgress';


function Vehicles(){
   const [data,setData] = useState([]);
   const [isLoading,setIsLoading] = useState(false);
   const [searchItem,setSearchItem] = useState();

   useEffect(()=>{
      setIsLoading(true)
      fetch('https://andyson2.pythonanywhere.com/api/vehicles/',{
         method: 'GET',
      })
      .then(res=>res.json())
      .then((result)=>{
         console.log(result)
         setData(result)
         setIsLoading(false)
      })
   },[])


   const search =()=>{
      fetch(`https://andyson2.pythonanywhere.com/api/vehicles/?search=${searchItem}`)
      .then(res=>res.json())
      .then(
         (result)=>{
            setData(result)
            console.log(result)
         },
      )
   }

   if(isLoading){
      return(
        <div style={{alignItems:'center',justifyContent:'center',display:'flex',paddingTop:200}}>
          <CircularProgress color="success" />
        </div>
      )
    }

   return(
      <div>
         <div style={{
            'padding': '20px',
            'width':'80%',
            'display':'flex'
         }}>
         <TextField fullWidth label="Search" id="fullWidth" onChange={e=>setSearchItem(e.target.value)} onKeyDown={search}/>
         </div>
     
          <TableContainer component={Paper}>
     <Table aria-label="simple table" stickyHeader>
       <TableHead>
         <TableRow>
           <TableCell>Plate Number</TableCell>
           <TableCell>Status</TableCell>
           <TableCell>Model</TableCell>
           <TableCell>Color</TableCell>
           <TableCell>Owner</TableCell>
           <TableCell>***</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.numberPlate}
             </TableCell>
             <TableCell >{row.status}</TableCell>
             <TableCell >{row.model}</TableCell>
             <TableCell >{row.color}</TableCell>
             <TableCell >{row.owner}</TableCell>
             <TableCell >
             <Button variant='contained'
            color='primary' style={{backgroundColor:'green'}} >
               <Link to={`/userDetail/${row.owner}`} style={{color:'white'}}>View</Link>
            </Button>
             </TableCell>
           </TableRow>
         ))}
       </TableBody>
     </Table>
   </TableContainer>
      </div>
   )
}
export default Vehicles;