// import logo from './logo.svg';
// import './App.css';
// import Dashboard from './Components/Dashboard';
// import { useEffect, useState } from "react";

// function App() {
//   const [data,setData] = useState([])


//   useEffect(()=>{
//     const getData =()=>{
//       fetch('http://155.0.76.107:8000/api/')
//       .then(res=>res.json())
//       .then((result)=>{
//         setData(result)
//       })
  
//     }
//     getData()

//     // setInterval(() => {
//     //   fetch("https://andyson4.pythonanywhere.com/api/home")
//     //   .then(res => res.json())
//     //   .then(
//     //     (result) => {
//     //      // console.log('console')
//     //       setData(result)
//     //       setInfo(result[result.length -1])
//     //     },
//     //     (error) => {
//     //     }
//     //   )
//     //   }, 30000);

//   },[])
 
  
//   return (
//   <div>
//   <h1>HARDWARE LAB </h1>
//   {
//     data.map(film=>(
//       <div key={film.id}>
//         <img src={film.image} height='300' width='400'></img><p>{film.timeStamp}</p>
//       </div>
//     ))
//   }
//   </div>

//   );
// }

// export default App;
