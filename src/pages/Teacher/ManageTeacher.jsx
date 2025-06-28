import { useState,useEffect } from "react";
import Card from "../UI/Card";

function ManageTeacher(){
    const[teacher,setTeacher]=useState([]);
    useEffect(()=>{
       fetchTeachers();
    }
    );
    const fetchTeachers=async ()=>{
        try{
            const res=await fetch('http://hamid.intelsofts.com/School_Project/api/academyteacher',{
                method:"GET",
                headers:{"Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            const result=await res.json();    
             setTeacher(result.academy_teachers);
        }catch(err){
              console.error('Error:',err.message);
        }
    };
    return(
        <>
        <Card title="Teachers Information">
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Contact_No</th>
                <th>Position</th>
                <th>Action</th>
            </tr>
       
        {teacher.map(tutor=>(
            <tr key={tutor.id}>
                <td>{tutor.id}</td>
                <td>{tutor.name}</td>
                <td>{tutor.contact_no}</td>
                <td>{tutor.position}</td>
                <td className="btn-group">
                    <a className="btn btn-success text-success">View</a>
                    <a className="btn btn-primary text-primary">Edit</a>
                    <a className="btn btn-danger text-danger">Delete</a>
                </td>

            </tr>

        ))}
         </table>
         </Card>
        </>
    );
}
export default ManageTeacher;