import { useState,useEffect } from "react";
function Dashboard(){
    
    const [n, setN] = useState(0);
   
    const [about,setAbout]=useState({})
   
    useEffect(() => {
        setAbout({desc:"We are innovative multinational company providing ERPs worldwide."});
    });
    

    const handleClick=()=>{
       setN((n) => n + 1);
    }
    const div=()=>{
       return <div><strong>IsDB-BISEW</strong></div>
    }

    return(
        <>
          {n}
          <br/>
          <strong>{about.desc}</strong><br />          
          {div()}
          <input onClick={handleClick} type="button" value="Load Data" />
        </> 
    );
}

export default Dashboard;