import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "../UI/Card";

function ManageRegi() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`http://localhost/My_School_Project/School_Management_Project/api/academystudent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      });

      const text = await res.text();
      console.log("Raw Response:", text);

      // Make sure it's valid JSON
      const data = JSON.parse(text);
      setStudents(data.academy_students);
    } catch (err) {
      console.error("Error in fetchStudents:", err.message);
    }
  };

  const deleteStudents = async (id) => {
    try {
      const res = await fetch(`http://localhost/My_School_Project/School_Management_Project/api/academystudent/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ id })
      });

      if (!res.ok) throw new Error("Failed to delete student");

      const data = await res.json();
      console.log("Delete response:", data);
    } catch (err) {
      console.error("Error deleting student:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete?")) {
      await deleteStudents(id);
      fetchStudents(); // Refresh the list
    }
  };

  return (
    <Card title="Student Details">
      <NavLink className="btn btn-primary mb-3" to="/create-regi">Create Student</NavLink>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Mother's Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <img
                  src={`http://localhost/My_School_Project/School_Management_Project/img/${student.photo}`}
                  width="80"
                  alt={`${student.name}'s photo`}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.fathers_name}</td>
              <td>{student.mothers_name}</td>
              <td>
                <div className="btn-group">
                  <button
                    onClick={() => navigate('/student-view', { state: student })}
                    className="btn btn-success"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate('/student-edit', { state: student })}
                    className="btn btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default ManageRegi;
