// function ManageInvoice(){
//     return(
//         <>  
//        <>
//   <meta charSet="UTF-8" />
//   <title>View Invoice</title>
//   <style
//     dangerouslySetInnerHTML={{
//       __html:
//         "\n        body {\n            font-family: Arial, sans-serif;\n            margin: 20px;\n            background: #f9f9f9;\n        }\n        .btn {\n            padding: 6px 12px;\n            border: none;\n            border-radius: 4px;\n            color: white;\n            cursor: pointer;\n        }\n        .btn-green {\n            background-color: #28a745;\n        }\n        .btn-blue {\n            background-color: #007bff;\n        }\n        .btn-light-blue {\n            background-color: #5bc0de;\n        }\n        .btn-red {\n            background-color: #dc3545;\n        }\n        .btn:disabled {\n            background-color: #ccc;\n            cursor: not-allowed;\n        }\n        .table-container {\n            margin-top: 20px;\n        }\n        table {\n            width: 100%;\n            border-collapse: collapse;\n            background-color: white;\n        }\n        th, td {\n            padding: 10px;\n            border-bottom: 1px solid #ccc;\n            text-align: center;\n        }\n        th {\n            background-color: #f1f1f1;\n        }\n        .pagination {\n            margin-top: 20px;\n            display: flex;\n            gap: 4px;\n            align-items: center;\n        }\n        .pagination button {\n            padding: 5px 10px;\n        }\n        .pagination input {\n            width: 40px;\n            text-align: center;\n            padding: 5px;\n        }\n    "
//     }}
//   />
//   <h2>View Invoice</h2>
//   <button className="btn btn-green">Create Invoice</button>
//   <div className="table-container">
//     <table>
//       <thead>
//         <tr>
//           <th>Id</th>
//           <th>Student</th>
//           <th>Issue Date</th>
//           <th>Due Date</th>
//           <th>Total</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>8</td>
//           <td>Abdul Hamid</td>
//           <td>2025-04-15</td>
//           <td>2025-04-15</td>
//           <td>3000</td>
//           <td>
//             <button className="btn btn-light-blue">Details</button>
//             <button className="btn btn-blue">Edit</button>
//             <button className="btn btn-red">Delete</button>
//           </td>
//         </tr>
//         {/* Repeat rows as needed */}
//       </tbody>
//     </table>
//   </div>
//   <div className="pagination">
//     <button className="btn" disabled="">
//       First
//     </button>
//     <button className="btn" disabled="">
//       Prev
//     </button>
//     <button className="btn btn-blue">1</button>
//     <button className="btn">Next</button>
//     <button className="btn">Last</button>
//     <input type="text" placeholder={1} />
//     <button className="btn btn-blue">Go</button>
//   </div>
// </>

//         </>
//     );
// }
// export default ManageInvoice;


import { useState,useEffect } from "react";
import Card from "../UI/Card";

function ManageInvoice(){
  
    const[invoice,setInvoice]=useState([]);

    useEffect(()=>{  
      fetchProducts();      
    });

    const fetchProducts = async () => {
        try {
          const res = await fetch(`http://hamid.intelsofts.com/School_Project/api/invoice`,{
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
          setInvoice(data.invoices);

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
            {/* <th>Name</th> */}
            <th>Student</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Total</th>
            {/* <th>Father`s Name</th> */}
           
            {/* <th>Mother`s Name</th>? */}
            <th>Action</th>
            </tr>
            {invoice.map(student => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    {/* <td><img src={`http://hamid.intelsofts.com/School_Project/img/${student.photo}`} width="100" /></td> */}
                    <td>{student.name}</td>
                    <td>{student.issue_date}</td>
                    <td>{student.due_date}</td>
                    <td>{student.total}</td>
                    {/* <td>{student.fathers_name}</td> */}
                    {/* <td>{product.barcode}</td> */}
                   
                    {/* <td>{student.mothers_name}</td> */}
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

export default ManageInvoice;