import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from '@material-ui/core';


function Dashboard(){
  const [studentLot,setStudentlot] = useState()
  const [staffLot,setStaffLot] = useState()
  const [visitorLot,setVisitorLot] = useState()
  const [isLoading,setIsLoading] = useState(false)

  const visiNum = (visitorLot / 100) * 100 
  const stuffNum = (staffLot / 100) * 100
  const studNum = (studentLot / 100) * 100
  const visitors = visiNum * 3.6
  const staff = stuffNum * 3.6
  const student = studNum * 3.6
  



const openGate=()=>{
  fetch(`https://andyson2.pythonanywhere.com/api/gateControl/1/`,{
     method:'PUT',
     headers: {
        'content-type': 'application/json'
     },
     body: JSON.stringify({
        'id':1,
        'state':'1'
     })
  }).then(data=>data.json())
  .then((result)=>{
     console.log(result)
  })
}

const closeGate=()=>{
  fetch(`https://andyson2.pythonanywhere.com/api/gateControl/1/`,{
     method:'PUT',
     headers: {
        'content-type': 'application/json'
     },
     body: JSON.stringify({
        'id':1,
        'state':'2'
     })
  }).then(data=>data.json())
  .then((result)=>{
     console.log(result)
  })
}

const setStudent =()=>{
  fetch(`https://andyson2.pythonanywhere.com/api/carPark/1/`,{
    method:'PUT',
    headers: {
       'content-type': 'application/json'
    },
    body: JSON.stringify({
       'id':1,
       'carpark':'1'
    })
 }).then(data=>data.json())
 .then((result)=>{
    console.log(result)
 })
}

const setStaff =()=>{
  fetch(`https://andyson2.pythonanywhere.com/api/carPark/1/`,{
    method:'PUT',
    headers: {
       'content-type': 'application/json'
    },
    body: JSON.stringify({
       'id':1,
       'carpark':'2'
    })
 }).then(data=>data.json())
 .then((result)=>{
    console.log(result)
 })
}

const setVisitor =()=>{
  fetch(`https://andyson2.pythonanywhere.com/api/carPark/1/`,{
    method:'PUT',
    headers: {
       'content-type': 'application/json'
    },
    body: JSON.stringify({
       'id':1,
       'carpark':'3'
    })
 }).then(data=>data.json())
 .then((result)=>{
    console.log(result)
 })
}

useEffect(()=>{
  setIsLoading(true)
  function getStudentData(){
    fetch('https://andyson2.pythonanywhere.com/api/setPark/1/',{
      method: 'GET',
   })
   .then(res=>res.json())
   .then((result)=>{
      console.log(result)
      setStudentlot(result.slots)
   })
  }

  function getStaffData(){
    fetch('https://andyson2.pythonanywhere.com/api/setPark/2/',{
      method: 'GET',
   })
   .then(res=>res.json())
   .then((result)=>{
      console.log(result)
      setStaffLot(result.slots)
   })
  }

  function getVisitorData(){
    fetch('https://andyson2.pythonanywhere.com/api/setPark/3/',{
      method: 'GET',
   })
   .then(res=>res.json())
   .then((result)=>{
      console.log(result)
      setVisitorLot(result.slots)
      setIsLoading(false)
   })
  }
  getStaffData()
  getStudentData()
  getVisitorData()
},[])

if(isLoading){
  return(
    <div style={{alignItems:'center',justifyContent:'center',display:'flex',paddingTop:200}}>
      <CircularProgress color="success" />
    </div>
  )
}






return(
  <div>
   <div className='featured'>
        <div className='featuredItem'>
          <span className='featuredTitle'>Staff</span>
          <div className='featuredMoneyContainer'>
          <div style={{
            display: 'flex',
            padding: '50px 0',
            borderRadius: '8px',
            background: '#fff',
            rowGap: '10px',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className="circular-progress" style={{
               position: "relative",
               height: "250px",
               width: '250px',
             borderRadius: "50%",
             background: `conic-gradient(green ${staff}deg, #ededed 0deg)`,
             display: "flex",
             alignItems: "center",
             justifyContent: "center"

            }}>
                <span className="progress-value">{stuffNum}%</span>
            </div>
        </div>
          </div>
          <Button color="primary" variant='contained' onClick={()=>setStaff()}>Staff</Button>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Students</span>
          <div className='featuredMoneyContainer'>
          <div style={{
            display: 'flex',
            padding: '50px 0',
            borderRadius: '8px',
            background: '#fff',
            rowGap: '30px',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className="circular-progress" style={{
               position: "relative",
               height: "250px",
               width: '250px',
             borderRadius: "50%",
             background: `conic-gradient(green ${student}deg, #ededed 0deg)`,
             display: "flex",
             alignItems: "center",
             justifyContent: "center"

            }}>
                <span className="progress-value">{studNum}%</span>
            </div>
        </div>
          </div>
          <Button color="primary" variant='contained' onClick={()=>setStudent()}>Student</Button>
        </div>
        <div className='featuredItem'>
          <span className='featuredTitle'>Guests</span>
          <div className='featuredMoneyContainer'>
          <div style={{
            display: 'flex',
            padding: '50px 0',
            borderRadius: '8px',
            background: '#fff',
            rowGap: '30px',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div className="circular-progress" style={{
               position: "relative",
               height: "250px",
               width: '250px',
             borderRadius: "50%",
             background: `conic-gradient(green ${visitors}deg, #ededed 0deg)`,
             display: "flex",
             alignItems: "center",
             justifyContent: "center"

            }}>
                <span className="progress-value">{visiNum}%</span>
            </div>
        </div>
        <Button color="primary" variant='contained' onClick={()=>setVisitor()}>Guest</Button>
          </div>
        </div>
      </div>
      {/* <TableContainer component={Paper} style={{width:900,marginLeft:120}} >
  <Table aria-label='a dense table' size='small' style={{width:800,marginLeft:100}} >
    <TableHead>
      <TableRow>
        <TableCell>Plate number</TableCell>
        <TableCell>ID number</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Entry Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {info.map((row)=>(
        <TableRow key={row.id}>
          <TableCell component='th' scope='row'>
            {row.name}
          </TableCell>
          <TableCell >{row['id#']}</TableCell>
          <TableCell >{row.status}</TableCell>
          <TableCell >{row['in-time']}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer> */}
<div style={{display:'flex', justifyContent:'space-between',marginTop:30,marginBottom:30,}}>
  <Button style={{height:'100px',width:'300px',fontSize:'20px',marginLeft:50,backgroundColor:'green'}} color="primary" variant='contained' onClick={()=>openGate()}>Open Gate</Button>
  <Button style={{height:'100px',width:'300px',fontSize:'20px',marginRight:50,backgroundColor:'red'}} variant='contained' color="primary" onClick={()=>closeGate()} >Close Gate</Button>
</div>
</div>
)
}
export default Dashboard;