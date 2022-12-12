import React from "react";
import {Button, Grid,Paper,TextField} from '@material-ui/core';
import {useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';


async function loginUser(credentials){
   return fetch('https://andyson2.pythonanywhere.com/rest-auth/login/',{
      method: 'POST',
      headers: {
         'content-type':'application/json'
      },
      body: JSON.stringify(credentials)
   })
   .then(data => data.json())
}

function Login({setToken}){
   const [username,setUsername] = useState();
   const [password,setPassword] = useState();
   const paperStyle = {padding:20,height:'70vh',width:280,margin:"20px auto"}
   const buttonStyle = {marginTop:10,backgroundColor:'green'}
   const [isLoading,setIsLoading] = useState(false)


   const handleSubmit = async e => {
      e.preventDefault();
      setIsLoading(true)
      const token = await loginUser({
         username,
         password
      });
      setToken(token.key)
      setIsLoading(false)
      window.location.reload()
   }


   
   return(
      <div style={{ backgroundImage: "url(/img/img3.jpg)" , height: '100vh'}}>
      <Grid>
         <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
            <h1 style={{'color':'green'}}>THE UNIVERSITY OF ZAMBIA PARKING MANAGEMENT</h1>
            <h3>Sign In</h3>
            {
               isLoading ? (<>
                  <CircularProgress color="success" />
               </>):(<></>)
            }
            </Grid>
            <TextField label='Username' placeholder="Enter username" fullWidth required onChange={e => setUsername(e.target.value)}/>
            <TextField label='Password' placeholder="Enter password" type='password' fullWidth required onChange={e => setPassword(e.target.value)}/>
            {
               isLoading ? (
                  <Button type="submit" color='primary' fullWidth variant='contained' style={buttonStyle} disabled={true}>Sign In</Button>
               ):(
                  <Button type="submit" color='primary' fullWidth variant='contained' style={buttonStyle} onClick={handleSubmit}>Sign In</Button>
               )
            }
         </Paper> 
      </Grid>
      </div>
   )


}

export default Login;