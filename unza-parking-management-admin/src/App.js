import './App.css';
import Dashboard from './Components/Dashboard';
import Logs from './Components/Logs';
import Users from './Components/Users';
import { BrowserRouter,Route,Routes,NavLink } from 'react-router-dom';
import Login from './Components/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Requests from './Components/Requests';
import UserDetail from './Components/UserDetail';
import Vehicles from './Components/Vehicles';
import {Button} from '@material-ui/core';


function setToken(userToken){
  localStorage.setItem('token',JSON.stringify(userToken))

}

function getToken(){
  const tokenString = localStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log(userToken)
  return userToken

}

function App() { 
  const token = getToken();


 

const logout =()=>{
  localStorage.removeItem('token')
  window.location.reload()

}

  if(!token){
    return <Login setToken={setToken}/>
  }
 
  
  return (
    <div>
    <BrowserRouter>
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>UNZA-PM</span>
        </div>
        <div className='topRight'>
          <Button onClick={()=>logout()}>
            <AccountCircleIcon/>
          </Button>
        </div>
      </div>
    </div>
    <div className='container'>
      <div className='sidebar'>
        <div className='sidebarWrapper'>
          <div className='sidebarMenu'>

           <NavLink to='/' style={{textDecoration:'none',color:'black',fontSize:'21px',display:'flex',padding:'8px',borderRadius:'8px',marginBottom:'5px'}} className='MyLinks'>
              Dashboard
            </NavLink>
          
            <NavLink to='/logs' style={{textDecoration:'none',color:'black',fontSize:'21px',display:'flex', padding:'8px',borderRadius:'8px',marginBottom:'5px'}} className='MyLinks' >
             Logs
            </NavLink>

            <NavLink to='/users' style={{textDecoration:'none',color:'black',fontSize:'21px',display:'flex',padding:'8px',borderRadius:'8px',marginBottom:'5px'}} className='MyLinks'>
             Users
            </NavLink>

            <NavLink to='/requests' style={{textDecoration:'none',color:'black',fontSize:'21px',display:'flex',padding:'8px',borderRadius:'8px',marginBottom:'5px'}} className='MyLinks'>
             Requests
            </NavLink>

            <NavLink to='/vehicles' style={{textDecoration:'none',color:'black',fontSize:'21px',display:'flex',padding:'8px',borderRadius:'8px',marginBottom:'5px'}} className='MyLinks'>
             Vehicles
            </NavLink>

          </div>
        </div>
      </div>
      <div className='home'>
      <Routes> 
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/logs' element={<Logs/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/requests' element={<Requests/>}/>
        <Route path='/userDetail/:userId' element={<UserDetail/>}/>
        <Route path='/vehicles' element={<Vehicles/>}/>
      </Routes>
      </div> 
    </div>
    </BrowserRouter>
    </div>

  );
}

export default App;
