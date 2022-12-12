import React,{ useEffect, useState } from "react"
import { Button,Table,TableCell,TableContainer,TableBody,TextField } from "@material-ui/core";
import { Link} from "react-router-dom";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@mui/material/CircularProgress';


function Users(){
   const [data,setData] = useState([]);
   const [isLoading,setIsLoading] = useState(false);
   const [searchItem,setSearchItem] = useState();
  
   useEffect(()=>{
      setIsLoading(true)
      fetch('https://andyson2.pythonanywhere.com/api/unapprovedUserList/True/',{
         method:'GET'
      })
      .then(res=>res.json())
      .then((result)=>{
         console.log(result)
         setData(result)
         setIsLoading(false)
      })
   },[])

   const search =()=>{
    fetch(`https://andyson2.pythonanywhere.com/api/unapprovedUserList/True/?search=${searchItem}`)
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
      <div className="home">
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
           <TableCell>Name</TableCell>
           <TableCell>Email</TableCell>
           <TableCell>ID Number</TableCell>
           <TableCell>Status</TableCell>
           <TableCell>***</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
         {data.map((row) => (
           <TableRow key={row.id}>
             <TableCell component="th" scope="row">
               {row.name}
             </TableCell>
             <TableCell >{row.email}</TableCell>
             <TableCell >{row.idNumber}</TableCell>
             <TableCell >{row.status}</TableCell>
             <TableCell >
             <Button variant='contained'
            color='primary' style={{backgroundColor:'green'}} >
               <Link to={`/userDetail/${row.id}`} style={{color:'white'}}>View</Link>
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

export default Users;