import React,{ useEffect, useState } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import { Table, TableBody, TableCell } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment'


function Logs(){
  const [data,setData] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  useEffect(()=>{
    setIsLoading(true)
    fetch('https://andyson2.pythonanywhere.com/api/gateEntries/',{
       method:'GET'
    })
    .then(res=>res.json())
    .then((result)=>{
       console.log(result)
       setData(result)
       setIsLoading(false)
    })
 },[])

 if(isLoading){
  return(
    <div style={{alignItems:'center',justifyContent:'center',display:'flex',paddingTop:200}}>
      <CircularProgress color="success" />
    </div>
  )
}

   return(
      <div className="home">
         <TableContainer component={Paper}>
  <Table aria-label='a dense table' size='small'>
    <TableHead>
      <TableRow>
        <TableCell>Plate Number</TableCell>
        <TableCell>Entry Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row)=>(
        <TableRow key={row.id}>
           <TableCell component='th' scope='row'>
           {row.numberPlate}
          </TableCell>
          <TableCell >{moment(row.timeStamp).format('LLLL')}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
      </div>

   )

}
export default Logs;