import { useState,useEffect } from "react";
import Card from "../UI/Card";

function ManageAdmit(){
  
    const[students,setStudents]=useState([]);

    useEffect(()=>{  
      fetchProducts();      
    });

    const fetchProducts = async () => {
        try {
          const res = await fetch(`http://hamid.intelsofts.com/School_Project/api/academyadmission`,{
            method:"GET",
            headers:{
               "Content-Type":"application/json",
               "Accept":"application/json"
            }
          });

          if (!res.ok) {
            throw new Error('Failed to fetch users');
          }

          const data = await res.json();
          setStudents(data.academy_admissions);

        } catch (err) {
          console.error('Error:', err.message);
        }
    };
 
   
    return(
        <>
        <Card title="Student Details">
        <table className="table">
        <tr>
            <th>Id</th>
            {/* <th>Photo</th> */}
            <th>Student</th>
            <th>Batch</th>
           
            <th>Section</th>
               
            <th>Created_at</th>
               
            <th>Roll</th>
            <th>Class</th>
            
            <th>Action</th>
            </tr>
            {students.map(student => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    {/* <td><img src={`http://hamid.intelsofts.com/School_Project/img/${student.photo}`} width="100" /></td> */}
                    <td>{student.academy_student_id}</td>
                  
                    <td>{student.academy_batch_id}</td>
                    <td>{student.academy_section_id}</td>
                    {/* <td>{product.barcode}</td> */}
                   
                    <td>{student.created_at}</td>

                    <td>{student.roll}</td>
                    <td>{student.academy_class_id}</td>
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
    )
}

export default ManageAdmit;